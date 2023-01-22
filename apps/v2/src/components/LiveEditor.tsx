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
      const $languageId = divRef.current.querySelector('.language-id');
      const $code = divRef.current.querySelector('pre .code-container code');
      const language = $languageId && getLang($languageId.textContent);

      if ($code && language) {
        const codeLines: Array<string> = [];

        $code.childNodes.forEach((child) => {
          const content = child.textContent;
          if (content) {
            codeLines.push(content);
          }
        });

        setState({
          mode: 'ready',
          code: codeLines.join('\r\n'),
          language,
        });
      } else {
        setState({ mode: 'error' });
      }
    }
  }, [state]);

  return state.mode === 'ready' ? (
    <React.Suspense fallback={null}>
      <Sandbox lang={state.language} code={state.code} />
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

  return lowerText && /(j|t)sx?/.test(lowerText)
    ? (lowerText as SupportedLang)
    : undefined;
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
    }
  | {
      mode: 'error';
    };
