import { EditorSelection } from '@codemirror/state';
import {
  SandpackCodeViewer as OriginalViewer,
  useSandpack,
  type CodeViewerProps,
} from '@codesandbox/sandpack-react';
import * as React from 'react';
import './sandbox-code-viewer.css';

type ViewerRef = React.ElementRef<typeof OriginalViewer>;

export interface SandboxCodeViewerProps extends CodeViewerProps {
  highlightedLines?: Record<string, Array<number>>;
}

export const SandboxCodeViewer = ({ highlightedLines, ...props }: SandboxCodeViewerProps) => {
  const viewerRef = React.useRef<ViewerRef>(null);

  const { sandpack } = useSandpack();

  const activeFile = sandpack.activeFile;

  const highlighted = React.useMemo(
    () => highlightedLines && highlightedLines[activeFile],
    [activeFile]
  );

  React.useEffect(() => {
    const codeMirror = viewerRef.current?.getCodemirror();

    if (codeMirror && highlighted && highlighted[0] != null) {
      let highlightIndex = highlighted[0];

      // get the next consecutive line so entire block is visible
      for (let index = 1; index < highlighted.length; index++) {
        const element = highlighted[index];
        if (element === highlightIndex + 1) {
          highlightIndex = element;
        } else {
          break;
        }
      }

      // codemirror index starts from 1, and I want another
      // line at bottom
      const line = codeMirror.state.doc.line(highlightIndex + 2);

      codeMirror.update([
        codeMirror.state.update({
          selection: EditorSelection.single(line.from) as any,
          scrollIntoView: true,
        }),
      ]);
    }
  }, [activeFile]);

  const viewerDecorators = React.useMemo(
    () =>
      highlighted &&
      highlighted.map((line) => ({
        line: line + 1,
        className: 'highlight',
      })),
    [highlighted]
  );

  return <OriginalViewer decorators={viewerDecorators} ref={viewerRef} {...props} />;
};
