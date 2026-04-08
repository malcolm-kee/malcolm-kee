/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { transformFromAstSync } from '@babel/core';
import { parse as babelParse, ParseResult } from '@babel/parser';
import * as t from '@babel/types';
import BabelPluginReactCompiler, {
  CompilerDiagnostic,
  CompilerError,
  CompilerErrorDetail,
  CompilerPipelineValue,
  Effect,
  ErrorCategory,
  parseConfigPragmaForTests,
  parsePluginOptions,
  PluginOptions,
  printFunctionWithOutlined,
  printReactiveFunctionWithOutlined,
  ValueKind,
  type Hook,
  type LoggerEvent,
} from 'babel-plugin-react-compiler';
import JSON5 from 'json5';
import type {
  CompilerOutput,
  CompilerTransformOutput,
  PrintedCompilerPipelineValue,
} from '../components/Editor/Output';

function parseInput(input: string): ParseResult<t.File> {
  return babelParse(input, {
    plugins: ['typescript', 'jsx'],
    sourceType: 'module',
  }) as ParseResult<t.File>;
}

function invokeCompiler(source: string, options: PluginOptions): CompilerTransformOutput {
  const ast = parseInput(source);
  let result = transformFromAstSync(ast, source, {
    filename: '_playgroundFile.js',
    highlightCode: false,
    plugins: [[BabelPluginReactCompiler, options]],
    ast: true,
    retainLines: true,
    sourceType: 'module',
    configFile: false,
    sourceMaps: true,
    babelrc: false,
  });
  if (result?.ast == null || result?.code == null || result?.map == null) {
    throw new Error('Expected successful compilation');
  }
  return {
    code: result.code,
    sourceMaps: result.map,
  };
}

const COMMON_HOOKS: Array<[string, Hook]> = [
  [
    'useFragment',
    {
      valueKind: ValueKind.Frozen,
      effectKind: Effect.Freeze,
      noAlias: true,
      transitiveMixedData: true,
    },
  ],
  [
    'usePaginationFragment',
    {
      valueKind: ValueKind.Frozen,
      effectKind: Effect.Freeze,
      noAlias: true,
      transitiveMixedData: true,
    },
  ],
  [
    'useRefetchableFragment',
    {
      valueKind: ValueKind.Frozen,
      effectKind: Effect.Freeze,
      noAlias: true,
      transitiveMixedData: true,
    },
  ],
  [
    'useLazyLoadQuery',
    {
      valueKind: ValueKind.Frozen,
      effectKind: Effect.Freeze,
      noAlias: true,
      transitiveMixedData: true,
    },
  ],
  [
    'usePreloadedQuery',
    {
      valueKind: ValueKind.Frozen,
      effectKind: Effect.Freeze,
      noAlias: true,
      transitiveMixedData: true,
    },
  ],
];

export function parseConfigOverrides(configOverrides: string): any {
  const trimmed = configOverrides.trim();
  if (!trimmed) {
    return {};
  }
  return JSON5.parse(trimmed);
}

function parseOptions(
  source: string,
  mode: 'compiler' | 'linter',
  configOverrides: string
): PluginOptions {
  // Extract the first line to quickly check for custom test directives
  const pragma = source.substring(0, source.indexOf('\n'));

  const parsedPragmaOptions = parseConfigPragmaForTests(pragma, {
    compilationMode: 'infer',
    environment:
      mode === 'linter'
        ? {
            // enabled in compiler
            validateRefAccessDuringRender: false,
            // enabled in linter
            validateNoSetStateInRender: true,
            validateNoSetStateInEffects: true,
            validateNoJSXInTryStatements: true,
            validateNoImpureFunctionsInRender: true,
            validateStaticComponents: true,
            validateNoFreezingKnownMutableFunctions: true,
            validateNoVoidUseMemo: true,
          }
        : {
            /* use defaults for compiler mode */
          },
  });

  // Parse config overrides from config editor
  const configOverrideOptions = parseConfigOverrides(configOverrides);

  const opts: PluginOptions = parsePluginOptions({
    ...parsedPragmaOptions,
    ...configOverrideOptions,
    environment: {
      ...parsedPragmaOptions.environment,
      ...configOverrideOptions.environment,
      customHooks: new Map([...COMMON_HOOKS]),
    },
  });

  return opts;
}

export function compile(
  source: string,
  mode: 'compiler' | 'linter',
  configOverrides: string
): [CompilerOutput, PluginOptions | null] {
  const firstNewline = source.indexOf('\n');
  const firstLine = firstNewline === -1 ? source : source.substring(0, firstNewline);
  if (firstLine.length > 0) {
    source = '\n' + source;
  }
  const results = new Map<string, Array<PrintedCompilerPipelineValue>>();
  const error = new CompilerError();
  const otherErrors: Array<CompilerErrorDetail | CompilerDiagnostic> = [];
  const upsert: (result: PrintedCompilerPipelineValue) => void = (result) => {
    const entry = results.get(result.name);
    if (Array.isArray(entry)) {
      entry.push(result);
    } else {
      results.set(result.name, [result]);
    }
  };
  let transformOutput: CompilerTransformOutput | undefined = undefined;

  let baseOpts: PluginOptions | null = null;
  try {
    baseOpts = parseOptions(source, mode, configOverrides);
  } catch (err) {
    error.details.push(
      new CompilerErrorDetail({
        category: ErrorCategory.Config,
        reason: `Unexpected failure when transforming configs! \n${err}`,
        loc: null,
        suggestions: null,
      })
    );
  }
  if (baseOpts) {
    try {
      const logIR = (result: CompilerPipelineValue): void => {
        switch (result.kind) {
          case 'ast': {
            break;
          }
          case 'hir': {
            upsert({
              kind: 'hir',
              fnName: result.value.id,
              name: result.name,
              value: printFunctionWithOutlined(result.value),
            });
            break;
          }
          case 'reactive': {
            upsert({
              kind: 'reactive',
              fnName: result.value.id,
              name: result.name,
              value: printReactiveFunctionWithOutlined(result.value),
            });
            break;
          }
          case 'debug': {
            upsert({
              kind: 'debug',
              fnName: null,
              name: result.name,
              value: result.value,
            });
            break;
          }
          default: {
            result satisfies never;
            throw new Error(`Unhandled result ${result}`);
          }
        }
      };
      // Add logger options to the parsed options
      const opts = {
        ...baseOpts,
        logger: {
          debugLogIRs: logIR,
          logEvent: (_filename: string | null, event: LoggerEvent): void => {
            if (event.kind === 'CompileError') {
              otherErrors.push(event.detail);
            }
          },
        },
      };
      transformOutput = invokeCompiler(source, opts);
    } catch (err) {
      /**
       * error might be an invariant violation or other runtime error
       * (i.e. object shape that is not CompilerError)
       */
      if (err instanceof CompilerError && err.details.length > 0) {
        error.merge(err);
      } else {
        /**
         * Handle unexpected failures by logging (to get a stack trace)
         * and reporting
         */
        error.details.push(
          new CompilerErrorDetail({
            category: ErrorCategory.Invariant,
            reason: `Unexpected failure when transforming input! \n${err}`,
            loc: null,
            suggestions: null,
          })
        );
      }
    }
  }
  // Only include logger errors if there weren't other errors
  if (!error.hasErrors() && otherErrors.length !== 0) {
    otherErrors.forEach((e) => error.details.push(e));
  }
  if (error.hasErrors() || !transformOutput) {
    return [{ kind: 'err', results, error }, baseOpts];
  }
  return [{ kind: 'ok', results, transformOutput, errors: error.details }, baseOpts];
}
