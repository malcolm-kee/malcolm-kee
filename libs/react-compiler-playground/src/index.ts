import { formatCode as originalFormatCode } from './lib/formatCode';
import * as prettier from 'prettier/standalone';

export const formatCode = (code: string): Promise<string> => originalFormatCode(code, prettier);

export { ReactCompilerPlayground } from './ReactCompilerPlayground';
export {
  MonacoComponentsProvider,
  type MonacoComponents,
} from './components/MonacoComponentsContext';
