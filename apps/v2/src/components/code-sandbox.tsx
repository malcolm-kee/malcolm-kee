import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  type SandpackTheme,
} from '@codesandbox/sandpack-react';
import { nightOwl, githubLight as oriGithubLight } from '@codesandbox/sandpack-themes';
import { clsx } from 'clsx';
import * as React from 'react';
import { useThemeValue } from '~/hooks/use-theme';
import { type SupportedLang } from './code-sandbox-helpers';
import styles from './code-sandbox.module.css';
import { SandboxCodeViewer } from './sandbox-code-viewer';
import { SandBoxConsole } from './sandbox-console';

const MonacoEditor = React.lazy(() => import('./sandbox-monaco-editor'));

const githubLight: typeof oriGithubLight = {
  ...oriGithubLight,
  syntax: {
    ...oriGithubLight.syntax,
    property: '#6F42C1', // make it consistent with shiki
  },
};

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
        size: '14px',
        lineHeight: '1.7142857',
      },
    };
  }, [siteTheme]);

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
      <div className="@container/sandbox">
        <div
          className={clsx(
            hasUi && '@6xl/sandbox:grid @6xl/sandbox:grid-cols-2 @6xl/sandbox:gap-px'
          )}
        >
          <div
            className={
              !hasUi
                ? 'hidden'
                : clsx(styles.editorPreview, '@6xl/sandbox:col-start-2 @6xl/sandbox:*:h-full')
            }
          >
            <SandpackPreview style={previewStyle} />
          </div>
          <div
            className={clsx(
              'border-t border-gray-100 focus-within:ring-2 focus-within:ring-primary-300 focus-within:ring-opacity-70 not-prose',
              hasUi &&
                '@6xl/sandbox:col-start-1 @6xl/sandbox:row-start-1 @6xl/sandbox:row-span-2 @6xl/sandbox:*:h-full',
              styles.editorWrapper
            )}
            style={codeViewerStyle}
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
                          // because we inject two additional lines (html>body) with getVanillaHtml
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
              <SandpackCodeEditor style={editorStyle} showTabs={hasUi} />
            )}
          </div>
          <div
            className={clsx(
              '@6xl/sandbox:col-start-2 @6xl/sandbox:row-start-2 @6xl/sandbox:*:h-full @6xl/sandbox:*:max-h-none',
              styles.sandboxConsole
            )}
          >
            <SandBoxConsole />
          </div>
        </div>
      </div>
    </SandpackProvider>
  );
}

const plusTwo = (n: number) => n + 2;

const editorStyle: React.CSSProperties = {
  height: 'calc(var(--editor-content-height, 100%) + 40px + 16px)', // toolbar (40px), editor y padding (16px)
};

const previewStyle: React.CSSProperties = {
  minHeight: 'var(--preview-min-height, auto)',
};

const codeViewerStyle: React.CSSProperties = {
  WebkitTextSizeAdjust: 'none',
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
