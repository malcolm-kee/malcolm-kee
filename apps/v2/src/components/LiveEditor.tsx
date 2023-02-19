import * as React from 'react';
import type { SupportedLang } from './Sandbox';

const Sandbox = React.lazy(() => import('./Sandbox'));

export type LiveEditorProps = {
  children: React.ReactNode;
};

export function LiveEditor(props: LiveEditorProps) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<LiveEditorState>({
    mode: 'initializing',
  });

  React.useEffect(() => {
    setState({ mode: 'mounted' });
  }, []);

  React.useEffect(() => {
    if (state.mode === 'mounted' && divRef.current) {
      // only get light theme elements, as dark theme has similar content
      const preElements = divRef.current.querySelectorAll('pre.github-light');

      const codeLines: Array<string> = [];
      const htmlCodeLines: Array<string> = [];

      let language: SupportedLang | undefined;

      preElements.forEach((preEl) => {
        const $languageId = preEl.querySelector('.language-id');
        const $code = preEl.querySelector('.code-container code');
        const currentLang = $languageId && getLang($languageId.textContent);

        if ($code && currentLang) {
          let hasImportedReact = false;

          language = currentLang;

          $code.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
              if (child.classList.contains('line')) {
                const content = child.textContent;
                if (content != null) {
                  codeLines.push(
                    whiteSpacePattern.test(content) ? '' : content
                  );
                  if (reactImportPattern.test(content)) {
                    hasImportedReact = true;
                  }
                }
              }
            }
          });

          if (
            (currentLang === 'jsx' || currentLang === 'tsx') &&
            !hasImportedReact
          ) {
            codeLines.unshift(`import * as React from 'react';`);
          }

          // add a new line at end if not there
          if (codeLines[codeLines.length - 1]) {
            codeLines.push('');
          }
        }

        if ($code && $languageId && isHtml($languageId.textContent)) {
          $code.childNodes.forEach((child) => {
            const content = child.textContent;

            if (content != null) {
              htmlCodeLines.push(
                whiteSpacePattern.test(content) ? '' : content
              );
            }
          });
        }
      });

      if (codeLines.length > 0 && language) {
        setState({
          mode: 'ready',
          code: codeLines.join('\r\n'),
          language,
          htmlCode: htmlCodeLines.join('\r\n') || undefined,
        });
      } else {
        setState({ mode: 'error' });
      }
    }
  }, [state]);

  return state.mode === 'ready' ? (
    <React.Suspense fallback={null}>
      <Sandbox
        lang={state.language}
        code={state.code}
        htmlEntry={state.language === 'html' ? undefined : state.htmlCode}
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

const getLang = (langText: string | null) => {
  const lowerText = langText && langText.toLowerCase();

  return lowerText && /(j|t)sx?|html/.test(lowerText)
    ? (lowerText as SupportedLang)
    : undefined;
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
      htmlCode: string | undefined;
    }
  | {
      mode: 'error';
    };

const reactImportPattern = /import (\* as)? React from 'react';/;
const whiteSpacePattern = /^\s+$/;
