import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  SandpackTheme,
} from '@codesandbox/sandpack-react';
import { githubLight, nightOwl } from '@codesandbox/sandpack-themes';
import { clsx } from 'clsx';
import * as React from 'react';
import { useThemeValue } from '~/hooks/use-theme';
import { editorLoadedEvent } from './editor-event';
import styles from './Sandbox.module.css';
import { SandBoxConsole } from './SandboxConsole';
import { SandboxCodeViewer } from './SandboxCodeViewer';

const MonacoEditor = React.lazy(() => import('./SandboxMonacoEditor'));

export interface SandboxProps {
  lang: SupportedLang;
  code: string;
  highlightedLines: Array<number>;
  htmlEntry?: {
    content: string;
    highlightedLines: Array<number>;
  };
  dependencies?: Record<string, string>;
  readOnly?: boolean;
}

export default function Sandbox(props: SandboxProps) {
  const entryFileName = entries[props.lang];

  const isReactProject = props.lang === 'jsx' || props.lang === 'tsx';

  const hasUi = props.lang === 'html' || isReactProject || !!props.htmlEntry;

  const siteTheme = useThemeValue();

  const codeTheme = React.useMemo<SandpackTheme>(() => {
    const defaultTheme = siteTheme === 'dark' ? nightOwl : githubLight;

    return {
      ...defaultTheme,
      font: {
        ...defaultTheme.font,
        size: '0.875em',
        lineHeight: '1.7142857',
      },
    };
  }, [siteTheme]);

  const [editorLoaded, setEditorLoaded] = React.useState(() =>
    props.lang === 'ts' || !window.MutationObserver ? true : false
  );

  const editorContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (editorContainerRef.current && !editorLoaded) {
      const observer = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
          if (mutation.type === 'childList') {
            if (mutation.addedNodes.length > 0) {
              for (const node of mutation.addedNodes) {
                if (node instanceof HTMLElement && node.classList.contains('cm-editor')) {
                  if (editorContainerRef.current) {
                    editorContainerRef.current.dispatchEvent(new CustomEvent(editorLoadedEvent));
                  }
                  setEditorLoaded(true);

                  observer.disconnect();

                  return;
                }
              }
            }
          }
        }
      });

      observer.observe(editorContainerRef.current, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <SandpackProvider
      template={templates[props.lang]}
      files={
        isReactProject
          ? {
              [entryFileName]: {
                code: props.code,
                active: true,
              },
              '/public/index.html': (props.htmlEntry && props.htmlEntry.content) || indexHtml,
            }
          : {
              [entryFileName]: {
                code: props.code,
                active: true,
              },
              ...(props.htmlEntry
                ? {
                    '/index.html': {
                      code: getVanillaHtml(
                        props.htmlEntry.content,
                        entryFileName.replace(/^\//, '')
                      ),
                    },
                  }
                : {}),
            }
      }
      customSetup={{
        entry: entryFileName,
        dependencies: props.dependencies,
      }}
      theme={codeTheme}
    >
      <div className={!hasUi ? 'hidden' : styles.editorPreview}>
        <SandpackPreview style={previewStyle} />
      </div>
      <div
        className={clsx(
          'border-t border-gray-100 focus-within:ring-2 focus-within:ring-primary-300 focus-within:ring-opacity-70 not-prose',
          styles.editorWrapper
        )}
        data-editorloaded={editorLoaded}
        ref={editorContainerRef}
      >
        {props.readOnly ? (
          <SandboxCodeViewer
            showTabs={hasUi}
            highlightedLines={{
              [entryFileName]: props.highlightedLines,
              ...(props.htmlEntry
                ? isReactProject
                  ? {
                      '/public/index.html': props.htmlEntry.highlightedLines,
                    }
                  : {
                      '/index.html': props.htmlEntry.highlightedLines.map(plusTwo),
                      // because we inject additional lines with getVanillaHtml
                    }
                : {}),
            }}
          />
        ) : props.lang === 'ts' ? (
          <MonacoEditor
            style={editorStyle}
            theme={siteTheme === 'dark' ? 'dark' : 'light'}
            lang={props.lang}
            showTabs={hasUi}
          />
        ) : (
          <SandpackCodeEditor style={editorStyle} showTabs={hasUi} showLineNumbers />
        )}
      </div>
      <SandBoxConsole />
    </SandpackProvider>
  );
}

const plusTwo = (n: number) => n + 2;

const editorStyle: React.CSSProperties = {
  height: 'calc(var(--editor-height, 100%) + 40px + 16px)', // toolbar (40px), editor y padding (16px)
};

const previewStyle: React.CSSProperties = {
  minHeight: 'var(--preview-min-height, auto)',
};

const indexHtml = /* html */ `<html>
  <body>
    <div id="root" />
  </body>
</html>`;

const getVanillaHtml = (htmlSnippet: string, entryFilePath: string) => /* html */ `<html>
  <body>
    ${htmlSnippet}
    <script src="${entryFilePath}"></script>
  </body>
</html>`;

const supportedLangs = ['js', 'jsx', 'ts', 'tsx', 'html'] as const;

export type SupportedLang = (typeof supportedLangs)[number];

const templates = {
  js: 'vanilla',
  jsx: 'react',
  ts: 'vanilla-ts',
  tsx: 'react-ts',
  html: 'vanilla',
} as const satisfies {
  [lang in SupportedLang]: string;
};

const entries = {
  js: '/src/index.js',
  jsx: '/src/index.jsx',
  ts: '/src/index.ts',
  tsx: '/src/index.tsx',
  html: '/index.html',
} satisfies {
  [lang in SupportedLang]: string;
};
