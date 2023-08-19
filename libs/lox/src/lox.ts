import { Interpreter } from './interpreter';
import { Parser } from './parser';
import { Scanner } from './scanner';
import { TokenType } from './token-type';

export const run = (source: string) => {
  let hasError = false;

  const report = (line: number, where: string, message: string) => {
    console.error(`[line ${line}] Error ${where}: ${message}`);
    hasError = true;
  };

  const scanner = new Scanner(source, (line, message) => {
    report(line, '', message);
  });

  const tokens = scanner.scanTokens();

  const parser = new Parser(tokens, (token, message) => {
    if (token.type === TokenType.EOF) {
      report(token.line, ' at end', message);
    } else {
      report(token.line, `at '${token.lexeme}'`, message);
    }
  });

  const expression = parser.parse();

  if (hasError || !expression) return;

  const interpreter = new Interpreter((error) => {
    report(error.token.line, `at '${error.token.lexeme}'`, error.message);
  });
  interpreter.interpret(expression);
};
