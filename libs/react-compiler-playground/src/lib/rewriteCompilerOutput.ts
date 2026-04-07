import { transformSync } from '@babel/core';
import type { NodePath, PluginObj } from '@babel/core';
import type { types as T } from '@babel/core';

/**
 * Babel plugin that rewrites compiler-generated variable names
 * to more readable alternatives:
 * - `_c` → `createCache`
 * - `$` → `cache`
 * - `Symbol.for("react.memo_cache_sentinel")` → `UNINITIALIZED` (hoisted to top-level const)
 */
function readableNamesPlugin({ types: t }: { types: typeof T }): PluginObj {
  let needsSentinelDecl = false;

  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value !== 'react/compiler-runtime') return;
        for (const spec of path.node.specifiers) {
          if (
            t.isImportSpecifier(spec) &&
            t.isIdentifier(spec.imported, { name: 'c' }) &&
            t.isIdentifier(spec.local, { name: '_c' })
          ) {
            path.scope.rename('_c', 'createCache');
          }
        }
      },

      VariableDeclarator(path) {
        if (
          t.isIdentifier(path.node.id, { name: '$' }) &&
          t.isCallExpression(path.node.init) &&
          t.isIdentifier(path.node.init.callee, { name: 'createCache' })
        ) {
          path.scope.rename('$', 'cache');
        }
      },

      CallExpression(path) {
        if (
          t.isMemberExpression(path.node.callee) &&
          t.isIdentifier(path.node.callee.object, { name: 'Symbol' }) &&
          t.isIdentifier(path.node.callee.property, { name: 'for' }) &&
          path.node.arguments.length === 1 &&
          t.isStringLiteral(path.node.arguments[0], {
            value: 'react.memo_cache_sentinel',
          })
        ) {
          needsSentinelDecl = true;
          path.replaceWith(t.identifier('UNINITIALIZED'));
        }
      },
    },

    post(state) {
      if (!needsSentinelDecl) return;
      const decl = t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier('UNINITIALIZED'),
          t.callExpression(t.memberExpression(t.identifier('Symbol'), t.identifier('for')), [
            t.stringLiteral('react.memo_cache_sentinel'),
          ])
        ),
      ]);
      // Append at the end of the module. References to UNINITIALIZED
      // live inside function bodies which only run at render time, well
      // after the module has finished initializing — so the TDZ isn't an
      // issue. Appending (rather than inserting between existing nodes)
      // also sidesteps the `retainLines` + loc-less-node jam where Babel
      // glues the fresh declaration onto a neighbouring comment's line.
      state.path.node.body.push(decl);
    },
  };
}

/**
 * Babel plugin that renames the compiler-generated `tN` props parameter
 * back to `props`. The compiler lowers `function Foo({ a, b })` to
 * `function Foo(t0) { const { a, b } = t0; }`; we leave the destructuring
 * in place (it may exist for a reason — e.g. the compiler's dependency
 * tracking) and just rename `t0` to `props` so the output reads naturally.
 *
 * Safety: only applies when the first param is literally named `tN` (the
 * compiler leaves user-chosen names like `props` alone), has exactly one
 * reference, and that reference is the init of a top-level ObjectPattern
 * declarator in the function body.
 */
function renamePropsParamPlugin({ types: t }: { types: typeof T }): PluginObj {
  const renameForFunction = (
    path: NodePath<T.FunctionDeclaration | T.FunctionExpression | T.ArrowFunctionExpression>
  ) => {
    const firstParamPath = path.get('params')[0] as NodePath | undefined;
    if (!firstParamPath || !firstParamPath.isIdentifier()) return;
    const oldName = firstParamPath.node.name;
    if (!/^t\d+$/.test(oldName)) return;

    const binding = path.scope.getBinding(oldName);
    if (!binding) return;
    if (binding.references !== 1) return;

    const refPath = binding.referencePaths[0];
    const declaratorPath = refPath.parentPath;
    if (!declaratorPath || !declaratorPath.isVariableDeclarator()) return;
    if (declaratorPath.node.init !== refPath.node) return;
    if (!t.isObjectPattern(declaratorPath.node.id)) return;

    const declarationPath = declaratorPath.parentPath;
    if (!declarationPath || !declarationPath.isVariableDeclaration()) return;

    // Declarator must be a direct top-level statement of the function body.
    const bodyPath = path.get('body');
    if (!bodyPath.isBlockStatement()) return;
    if (declarationPath.parentPath?.node !== bodyPath.node) return;

    path.scope.rename(oldName, 'props');
  };

  return {
    visitor: {
      FunctionDeclaration: renameForFunction,
      FunctionExpression: renameForFunction,
      ArrowFunctionExpression: renameForFunction,
    },
  };
}

/**
 * Babel plugin that removes unused imports, emulating bundler behavior.
 * Skips side-effect-only imports (e.g. `import 'foo'`).
 */
function removeUnusedImportsPlugin(): PluginObj {
  return {
    visitor: {
      Program: {
        exit(path) {
          path.get('body').forEach((stmt) => {
            if (!stmt.isImportDeclaration()) return;
            if (stmt.node.specifiers.length === 0) return;

            for (const spec of stmt.get('specifiers')) {
              const binding = stmt.scope.getBinding(spec.node.local.name);
              if (binding && !binding.referenced) {
                spec.remove();
              }
            }

            if (stmt.node.specifiers.length === 0) {
              stmt.remove();
            }
          });
        },
      },
    },
  };
}

export function rewriteCompilerOutput(code: string): string {
  const result = transformSync(code, {
    plugins: [readableNamesPlugin, renamePropsParamPlugin, removeUnusedImportsPlugin],
    parserOpts: {
      plugins: ['jsx', 'typescript'],
    },
    sourceType: 'module',
    configFile: false,
    babelrc: false,
    retainLines: true,
  });
  return result?.code ?? code;
}
