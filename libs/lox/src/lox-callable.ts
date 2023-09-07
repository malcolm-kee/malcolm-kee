import type { Interpreter } from './interpreter';

export interface LoxCallable {
  readonly arity: number;

  call(interpreter: Interpreter, args: Array<any>): any;
}

export const isLoxCallable = (value: any): value is LoxCallable =>
  !!value &&
  typeof value === 'object' &&
  typeof value.arity === 'number' &&
  typeof value.call === 'function';
