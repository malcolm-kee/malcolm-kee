import { SnackbarProvider } from 'notistack';
import type { CSSProperties } from 'react';
import { Editor, type EditorProps } from './components/Editor';
import { Header } from './components/Header';
import { Message } from './components/Message';
import { StoreProvider } from './components/StoreContext';

type ReactCompilerPlaygroundProps = {
  /**
   * Height of the playground. Accepts any CSS length value.
   * @default '100vh'
   */
  height?: string;
  withHeader?: boolean;
  /**
   * Persist state to URL or localStorage
   */
  persistState?: boolean;
  /**
   * Default content of the editor
   */
  defaultSource?: string;
};

export function ReactCompilerPlayground({
  height,
  withHeader,
  defaultSource,
  persistState,
  ...editorProps
}: ReactCompilerPlaygroundProps & EditorProps = {}) {
  const style = {
    '--rcp-height': height,
    '--rcp-header-height': withHeader ? '3.5rem' : '0px',
  } as CSSProperties;

  return (
    <StoreProvider defaultSource={defaultSource} persistState={persistState}>
      <SnackbarProvider preventDuplicate maxSnack={10} Components={SnackbarComponents}>
        <div className="react-compiler-playground font-sans overflow-y-hidden" style={style}>
          {withHeader && <Header />}
          <Editor {...editorProps} />
        </div>
      </SnackbarProvider>
    </StoreProvider>
  );
}

const SnackbarComponents = { message: Message };
