import { SnackbarProvider } from 'notistack';
import type { CSSProperties } from 'react';
import { Editor } from './components/Editor';
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
};

export function ReactCompilerPlayground({
  height,
  withHeader = true,
}: ReactCompilerPlaygroundProps = {}) {
  const style = {
    '--rcp-height': height,
    '--rcp-header-height': withHeader ? '3.5rem' : '0px',
  } as CSSProperties;

  return (
    <StoreProvider>
      <SnackbarProvider preventDuplicate maxSnack={10} Components={SnackbarComponents}>
        <div className="react-compiler-playground font-sans overflow-y-hidden" style={style}>
          {withHeader && <Header />}
          <Editor />
        </div>
      </SnackbarProvider>
    </StoreProvider>
  );
}

const SnackbarComponents = { message: Message };
