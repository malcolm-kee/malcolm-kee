import { includes } from '@mkee/helpers';
import * as React from 'react';
import { type SupportedLang, supportedLangs } from './code-sandbox-helpers';

const Sandbox = React.lazy(() => import('./code-sandbox'));

export type ReactLiveEditorProps = {
  children: React.ReactNode;
  readOnly?: boolean;
};

export function ReactLiveEditor(props: ReactLiveEditorProps) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<LiveEditorState>({
    mode: 'initializing',
  });

  React.useEffect(() => {
    setState({ mode: 'mounted' });
  }, []);

  React.useEffect(() => {
    if (state.mode === 'mounted' && divRef.current) {
      const preElements = divRef.current.querySelectorAll<HTMLPreElement>('pre.astro-code');
      const result = processPreElements(preElements);
      setState(result);
    }
  }, [state]);

  return state.mode === 'ready' ? (
    <React.Suspense fallback={null}>
      <Sandbox
        lang={state.language}
        code={state.code}
        highlightedLines={state.highlightedLines}
        htmlEntry={state.language === 'html' ? undefined : state.html}
        dependencies={state.dependencies}
        readOnly={props.readOnly}
      />
    </React.Suspense>
  ) : state.mode === 'mounted' ? (
    <div className="hidden" ref={divRef}>
      {props.children}
    </div>
  ) : state.mode === 'error' ? (
    <div>
      <p>Failed to load code editor.</p>
    </div>
  ) : null;
}

// TODO: handle twoslash code
function processPreElements(preElements: NodeListOf<HTMLPreElement>): LiveEditorState {
  const codeLines: Array<string> = [];
  const highlightedLines: Array<number> = [];
  const htmlCodeLines: Array<string> = [];
  const highlightedHtmlLines: Array<number> = [];
  const dependencies: Record<string, string> = {};

  let language: SupportedLang | undefined;

  preElements.forEach((preEl) => {
    const $code = preEl.querySelector('code');
    const currentLang = preEl.dataset.language;

    if ($code && currentLang && includes(supportedLangs, currentLang)) {
      language = reduceLang(language, currentLang);

      if (includes(['js', 'jsx', 'ts', 'tsx'], currentLang)) {
        const importString = $code.getAttribute('data-code-imports');

        if (importString) {
          importString.split(',').forEach((pkgNameImports) => {
            const [pkgName, version] = pkgNameImports.split('@');

            dependencies[pkgName] = version || 'latest';
          });
        }

        Array.from($code.childNodes)
          .filter(
            (node): node is HTMLElement =>
              node instanceof HTMLElement && node.classList.contains('line')
          )
          .forEach((child, childIndex) => {
            const content = child.textContent;
            if (content != null) {
              codeLines.push(whiteSpacePattern.test(content) ? '' : content);
              if (child.classList.contains('highlighted')) {
                highlightedLines.push(childIndex);
              }
            }
          });

        if ((currentLang === 'jsx' || currentLang === 'tsx') && !dependencies.react) {
          codeLines.unshift(`import * as React from 'react';`);
        }
      }

      // add a new line at end if not there
      if (codeLines[codeLines.length - 1]) {
        codeLines.push('');
      }
    }

    if ($code && currentLang && isHtml(currentLang)) {
      Array.from($code.childNodes)
        .filter(
          (node): node is HTMLElement =>
            node instanceof HTMLElement && node.classList.contains('line')
        )
        .forEach((child, childIndex) => {
          const content = child.textContent;

          if (content != null) {
            htmlCodeLines.push(whiteSpacePattern.test(content) ? '' : content);

            // TODO: change from 'highlight' to 'highlighted' to correctly parse this, currently it would cause
            // sandpack error to crash when switching from main file to html file and back to main file, no idea why
            if (child.classList.contains('highlight')) {
              highlightedHtmlLines.push(childIndex);
            }
          }
        });
    }
  });

  if (language === 'html' && codeLines.length === 0) {
    codeLines.push(...htmlCodeLines);
    highlightedLines.push(...highlightedHtmlLines);
  }

  if (codeLines.length > 0 && language) {
    return {
      mode: 'ready',
      code: codeLines.join('\r\n'),
      highlightedLines,
      language,
      html:
        htmlCodeLines.length > 0
          ? { content: htmlCodeLines.join('\r\n'), highlightedLines: highlightedHtmlLines }
          : undefined,
      dependencies,
    };
  } else {
    return { mode: 'error' };
  }
}

const reduceLang = (
  currentLang: SupportedLang | undefined,
  newLang: SupportedLang
): SupportedLang => {
  if (currentLang == null || currentLang === 'html') {
    return newLang;
  }

  if (currentLang === 'tsx' || newLang === 'tsx') {
    return 'tsx';
  }

  if (currentLang === 'ts') {
    return newLang === 'jsx' ? 'tsx' : 'ts';
  }

  if (currentLang === 'jsx') {
    return newLang === 'ts' ? 'tsx' : 'jsx';
  }

  return newLang === 'html' ? currentLang : newLang;
};

const isHtml = (langText: string | null) => {
  const lowerText = langText && langText.toLowerCase();

  return lowerText === 'html';
};

type LiveEditorState =
  | {
      mode: 'initializing';
    }
  | {
      mode: 'mounted';
    }
  | {
      mode: 'ready';
      code: string;
      language: SupportedLang;
      highlightedLines: Array<number>;
      html:
        | {
            content: string;
            highlightedLines: Array<number>;
          }
        | undefined;
      dependencies: Record<string, string>;
    }
  | {
      mode: 'error';
    };

const whiteSpacePattern = /^\s+$/;
