import {
  CodeViewerProps,
  SandpackCodeViewer as OriginalViewer,
  useSandpack,
} from '@codesandbox/sandpack-react';
import * as React from 'react';

export interface SandboxCodeViewerProps extends CodeViewerProps {
  highlightedLines?: Record<string, Array<number>>;
}

export const SandboxCodeViewer = ({ highlightedLines, ...props }: SandboxCodeViewerProps) => {
  const { sandpack } = useSandpack();

  const highlighted = highlightedLines && highlightedLines[sandpack.activeFile];

  return (
    <OriginalViewer
      decorators={
        highlighted &&
        highlighted.map((line) => ({
          line: line + 1,
          className: 'highlight',
        }))
      }
      {...props}
    />
  );
};
