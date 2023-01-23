import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  SandpackTheme,
} from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';
import * as React from 'react';

export interface SandboxProps {
  lang: SupportedLang;
  code: string;
}

export default function Sandbox(props: SandboxProps) {
  const entryFileName = entries[props.lang];

  return (
    <SandpackProvider
      template={templates[props.lang]}
      files={{
        [entryFileName]: {
          code: props.code,
          active: true,
        },
        '/public/index.html': indexHtml,
      }}
      customSetup={{
        entry: entryFileName,
      }}
      theme={theme}
    >
      <SandpackPreview />
      <div className='border-t border-gray-100'>
        <SandpackCodeEditor
          style={{
            height: 'var(--editor-height, 100%)',
          }}
          showTabs
          showLineNumbers
          />
      </div>
    </SandpackProvider>
  );
}

const theme: SandpackTheme = {
  ...githubLight,
  font: {
    ...githubLight.font,
    size: '0.875em',
    lineHeight: '1.7142857',
  },
};

const indexHtml = /* html */ `<html>
  <body>
    <div id="root" />
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
  js: '/index.js',
  jsx: '/index.jsx',
  ts: '/index.ts',
  tsx: '/index.tsx',
} satisfies {
  [lang in SupportedLang]: string;
};
