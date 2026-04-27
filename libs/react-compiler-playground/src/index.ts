import * as prettier from 'prettier/standalone';
import { formatCode as originalFormatCode } from './lib/formatCode';

export const formatCode = (code: string): Promise<string> => originalFormatCode(code, prettier);

export {
  MonacoComponentsProvider,
  type MonacoComponents,
} from './components/MonacoComponentsContext';
export { compile } from './lib/compilation';
export { ReactCompilerPlayground } from './ReactCompilerPlayground';
