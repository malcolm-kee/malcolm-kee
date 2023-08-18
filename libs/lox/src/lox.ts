import { Scanner } from './scanner';
import { Parser } from './parser';
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

  console.log(tokens);

  const parser = new Parser(tokens, (token, message) => {
    if (token.type === TokenType.EOF) {
      report(token.line, ' at end', message);
    } else {
      report(token.line, `at '${token.lexeme}'`, message);
    }
  });

  const expression = parser.parse();

  if (hasError) return;

  console.log(expression);
};
