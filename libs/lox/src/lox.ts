import { Scanner } from './scanner';

export const run = (source: string) => {
  const report = (line: number, where: string, message: string) => {
    console.error(`[line ${line}] Error ${where}: ${message}`);
  };

  const scanner = new Scanner(source, (line, message) => {
    report(line, '', message);
  });

  const tokens = scanner.scanTokens();

  console.log(tokens);
};
