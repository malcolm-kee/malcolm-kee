import { Environment } from './environment';
import { Interpreter } from './interpreter';
import { type LoxCallable } from './lox-callable';
import { Return } from './return';
import type { FunctionStmt } from './stmt';

export class LoxFunction implements LoxCallable {
  constructor(
    private readonly declaration: FunctionStmt,
    private readonly closure: Environment
  ) {}

  get arity() {
    return this.declaration.params.length;
  }

  call(interpreter: Interpreter, args: any[]) {
    const environment = new Environment(this.closure);
    for (let index = 0; index < this.declaration.params.length; index++) {
      const element = this.declaration.params[index];
      environment.define(element.lexeme, args[index]);
    }

    try {
      interpreter.executeBlock(this.declaration.body, environment);
    } catch (err) {
      if (err instanceof Return) {
        return err.value;
      }
      throw err;
    }

    return null;
  }

  toString() {
    return `<fn ${this.declaration.name.lexeme}>`;
  }
}
