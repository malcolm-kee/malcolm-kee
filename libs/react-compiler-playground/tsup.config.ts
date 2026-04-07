import { defineConfig, type Options } from 'tsup';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { createRequire } from 'module';

type Plugin = NonNullable<Options['esbuildPlugins']>[number];

const req = createRequire(import.meta.url);

// Resolve @types/react directory by finding the package.json first
const reactTypesDir = dirname(req.resolve('@types/react/package.json'));
const reactTypesPath = join(reactTypesDir, 'index.d.ts');

const rawDtsPlugin: Plugin = {
  name: 'raw-dts',
  setup(build) {
    build.onResolve({ filter: /@types\/react\/index\.d\.ts$/ }, () => ({
      path: reactTypesPath,
      namespace: 'raw-dts',
    }));
    build.onLoad({ filter: /.*/, namespace: 'raw-dts' }, (args) => ({
      contents: `export default ${JSON.stringify(readFileSync(args.path, 'utf-8'))}`,
      loader: 'js',
    }));
  },
};

const NODE_SHIMS: Record<string, string> = {
  fs: `export default {}; export function isatty() { return false; }; export function readFileSync() { return ""; }; export function existsSync() { return false; }; export function readdirSync() { return []; }; export function statSync() { return {}; };`,
  os: `export default {}; export function homedir() { return "/"; }; export function tmpdir() { return "/tmp"; }; export function platform() { return "browser"; };`,
  tty: `export default {}; export function isatty() { return false; };`,
  crypto: `const crypto = globalThis.crypto || {}; export function randomBytes(size) { const buf = new Uint8Array(size); if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(buf); return buf; } export default crypto;`,
  assert: `function assert(value, message) { if (!value) throw new Error(message || 'Assertion failed'); } assert.ok = assert; assert.strictEqual = function(a, b, msg) { if (a !== b) throw new Error(msg || 'Not strictly equal'); }; export default assert;`,
  buffer: `export var Buffer = { isBuffer: function() { return false; }, from: function(data) { return new Uint8Array(typeof data === 'string' ? 0 : data); }, alloc: function(size) { return new Uint8Array(size); } }; export default { Buffer: Buffer };`,
  util: `export function deprecate(fn) { return fn; } export function inherits(ctor, superCtor) { if (superCtor) { ctor.super_ = superCtor; ctor.prototype = Object.create(superCtor.prototype, { constructor: { value: ctor, enumerable: false, writable: true, configurable: true } }); } } export function inspect(obj) { return String(obj); } export default { deprecate, inherits, inspect };`,
};

const pathBrowserifyPath = req.resolve('path-browserify');

const nodeShimsPlugin: Plugin = {
  name: 'node-shims',
  setup(build) {
    // Redirect `path` to path-browserify (a real implementation)
    build.onResolve({ filter: /^path$/ }, () => ({
      path: pathBrowserifyPath,
    }));
    // Shim other Node builtins
    const filter = new RegExp(
      `^(${Object.keys(NODE_SHIMS).join('|')})$`
    );
    build.onResolve({ filter }, (args) => ({
      path: args.path,
      namespace: 'node-shim',
    }));
    build.onLoad({ filter: /.*/, namespace: 'node-shim' }, (args) => ({
      contents: NODE_SHIMS[args.path],
      loader: 'js',
    }));
  },
};

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: true,
  platform: 'browser',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    global: 'globalThis',
  },
  esbuildPlugins: [rawDtsPlugin, nodeShimsPlugin],
  banner: {
    js: [
      // Process shim for Node.js code running in browser
      `var process = globalThis.process || { env: { NODE_ENV: "production" }, platform: "browser", versions: { node: "" }, type: "renderer", cwd: function() { return "/"; }, nextTick: function(cb) { Promise.resolve().then(cb); }, exit: function() {}, exitCode: 0, argv: [], emitWarning: function() {}, stderr: { fd: 2, write: function() {} }, browser: true, getuid: function() { return 0; } };`,
      // require shim so esbuild's __require picks it up and .resolve works
      `if (typeof require === "undefined") { var require = function(name) { throw Object.assign(new Error('Dynamic require of "' + name + '" is not supported'), { code: "MODULE_NOT_FOUND" }); }; require.resolve = function(name) { throw Object.assign(new Error("Cannot resolve '" + name + "'"), { code: "MODULE_NOT_FOUND" }); }; }`,
    ].join('\n'),
  },
});
