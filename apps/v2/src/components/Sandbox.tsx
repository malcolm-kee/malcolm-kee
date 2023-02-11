import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  SandpackTheme,
} from '@codesandbox/sandpack-react';
import { githubLight, nightOwl } from '@codesandbox/sandpack-themes';
import * as React from 'react';
import { SandBoxConsole } from './SandboxConsole';
import { useThemeValue } from '~/hooks/use-theme';

const MonacoEditor = React.lazy(() => import('./SandboxMonacoEditor'));

export interface SandboxProps {
  lang: SupportedLang;
  code: string;
  htmlEntry?: string | undefined;
}

export default function Sandbox(props: SandboxProps) {
  const entryFileName = entries[props.lang];

  const isReactProject = props.lang === 'jsx' || props.lang === 'tsx';

  const hasUi = isReactProject || !!props.htmlEntry;

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
              '/public/index.html': props.htmlEntry || indexHtml,
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
                        props.htmlEntry,
                        entryFileName.replace(/^\//, '')
                      ),
                    },
                  }
                : {}),
            }
      }
      customSetup={{
        entry: entryFileName,
      }}
      theme={codeTheme}
    >
      <div className={!hasUi ? 'hidden' : ''}>
        <SandpackPreview />
      </div>
      <div className="border-t border-gray-100 focus-within:ring-2 focus-within:ring-primary-300 focus-within:ring-opacity-70">
        {props.lang === 'ts' ? (
          <MonacoEditor
            style={editorStyle}
            theme={siteTheme === 'dark' ? 'dark' : 'light'}
            lang={props.lang}
            showTabs={hasUi}
          />
        ) : (
          <SandpackCodeEditor
            style={editorStyle}
            showTabs={hasUi}
            showLineNumbers
          />
        )}
      </div>
      <SandBoxConsole />
    </SandpackProvider>
  );
}

const editorStyle: React.CSSProperties = {
  height: 'calc(var(--editor-height, 100%) + 40px + 16px)', // toolbar (40px), editor y padding (16px)
};

const indexHtml = /* html */ `<html>
  <body>
    <div id="root" />
  </body>
</html>`;

const getVanillaHtml = (
  htmlSnippet: string,
  entryFilePath: string
) => /* html */ `<html>
  <body>
    ${htmlSnippet}
    <script src="${entryFilePath}"></script>
  </body>
</html>`;

const supportedLangs = ['js', 'jsx', 'ts', 'tsx'] as const;

export type SupportedLang = (typeof supportedLangs)[number];

const templates = {
  js: 'vanilla',
  jsx: 'react',
  ts: 'vanilla-ts',
  tsx: 'react-ts',
} as const satisfies {
  [lang in SupportedLang]: string;
};

const entries = {
  js: '/src/index.js',
  jsx: '/src/index.jsx',
  ts: '/src/index.ts',
  tsx: '/src/index.tsx',
} satisfies {
  [lang in SupportedLang]: string;
};
