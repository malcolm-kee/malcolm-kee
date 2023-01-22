import { Sandpack } from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';

export interface SandboxProps {
  lang: SupportedLang;
  code: string;
}

export default function Sandbox(props: SandboxProps) {
  const entryFileName = entries[props.lang];

  return (
    <Sandpack
      template={templates[props.lang]}
      files={{
        [entryFileName]: {
          code: props.code,
          active: true,
        },
      }}
      customSetup={{
        entry: entryFileName,
      }}
      options={{
        editorHeight: '100%',
      }}
      theme={githubLight}
    />
  );
}

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
