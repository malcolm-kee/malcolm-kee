type WebpackModuleExports = Record<string, any>;

export type ChunkData = [
  chunkIds: Array<string>,
  moreModules: Record<string, WebpackModuleFactory>,
  runtime?: (webpackRequire: WebpackRequire) => void,
];

interface WebpackModule {
  exports: WebpackModuleExports;
}

declare global {
  interface Window {
    webpackChunkwebpack_raw: Array<ChunkData>;
  }
}

type WebpackHarmonyExport = Record<string, () => any>;

type WebpackEnsureChunkMechanism = (chunkId: string, promises: Array<Promise<unknown>>) => void;

type OnLoadCallback = (event: Event | { type: 'timeout'; target: HTMLScriptElement }) => void;

type LoadFunction = (url: string, done: OnLoadCallback, key: string, chunkId: string) => void;

export type WebpackRequire = ((moduleId: string) => WebpackModuleExports) & {
  /**
   * webpack/runtime/hasOwnProperty shorthand
   **/
  o: (obj: object, prop: string) => boolean;
  /**
   * define getter functions for harmony exports
   */
  d: (mExports: WebpackModuleExports, definition: WebpackHarmonyExport) => void;

  // webpack/runtime/make namespace object

  /**
   * define __esModule on exports
   **/
  r: (mExports: WebpackModuleExports) => void;

  // additions with dynamic import - start
  m: Record<string, WebpackModuleFactory>;

  f: Record<string, WebpackEnsureChunkMechanism>;

  /**
   * ensure a chunk is loaded, need to run before
   * __webpack_require__ the module in the chunk
   */
  e: (chunkId: string) => Promise<unknown>;

  /**
   * get javascript chunk filename
   */
  u: (chunkId: string) => string;

  /**
   * globals
   */
  g: Record<string, any>;

  /** load script via script tag */
  l: LoadFunction;

  /**
   * webpack publicPath
   */
  p: string;

  /** nonce attribute to attach to script tag */
  nc?: string;

  // additions with dynamic import - end
};

type WebpackModuleFactory = (
  _: unknown,
  mExports: WebpackModuleExports,
  webpackRequire: WebpackRequire
) => void;

/**
 * webpackBootstrap is run as IIFE
 */
export function webpackBootstrap() {
  var __webpack_modules__: Record<string, WebpackModuleFactory> = {
    /**
     * Example module, source code is
     *
     * ```js
     * export const myCode = 'my code';
     * ```
     */
    './src/my-code.js': (_, exports, webpack_require) => {
      webpack_require.r(exports);
      webpack_require.d(exports, {
        myCode: () => myCode,
      });

      const myCode = 'my code';
    },
  };

  var __webpack_module_cache__: Record<string, WebpackModule> = {};

  // We rename this from __webpack_require__ (remove last _) so typescript
  // can infer this properly
  function __webpack_require_(moduleId: string) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }

    // Create a new module (and put it into the cache)
    var module: WebpackModule = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  var __webpack_require__: WebpackRequire = Object.assign(__webpack_require_, {
    o: (obj: object, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop),
    d: (mExports: WebpackModuleExports, definition: WebpackHarmonyExport) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(mExports, key)) {
          Object.defineProperty(mExports, key, { enumerable: true, get: definition[key] });
        }
      }
    },
    // /* webpack/runtime/make namespace object */
    r: (mExports: WebpackModuleExports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(mExports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(mExports, '__esModule', { value: true });
    },
    m: __webpack_modules__,
    f: {},
    e: (chunkId: string) =>
      Promise.all(
        Object.keys(__webpack_require__.f).reduce((promises, key) => {
          __webpack_require__.f[key](chunkId, promises);
          return promises;
        }, [])
      ),
    u: (chunkId: string) => `${chunkId}.js`,
    g: (function (this: any) {
      if (typeof globalThis === 'object') return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if (typeof window === 'object') return window;
      }
    })(),

    l: (function () {
      var inProgress: {
        [url: string]: Array<OnLoadCallback>;
      } = {};

      var dataWebpackPrefix = 'webpack-raw:';

      var load: LoadFunction = (url, done, key) => {
        if (inProgress[url]) {
          inProgress[url].push(done);
          return;
        }
        var script: HTMLScriptElement | undefined;
        var needAttach = false;

        if (key !== undefined) {
          // find if there is existing script tag for this URL
          // use it if found
          var scripts = document.getElementsByTagName('script');
          for (var i = 0; i < scripts.length; i++) {
            var s = scripts[i];

            if (
              s.getAttribute('src') === url ||
              s.getAttribute('data-webpack') === dataWebpackPrefix + key
            ) {
              script = s;
              break;
            }
          }
        }

        if (!script) {
          needAttach = true;
          script = document.createElement('script');

          if (__webpack_require__.nc) {
            script.setAttribute('nonce', __webpack_require__.nc);
          }
          script.setAttribute('data-webpack', dataWebpackPrefix + key);
          script.src = url;
        }
        inProgress[url] = [done];

        var onScriptComplete = (
          prev: ((event: Event) => void) | undefined | null,
          event: Event | { type: 'timeout'; target: HTMLScriptElement }
        ) => {
          clearTimeout(timeout);
          var doneFns = inProgress[url];
          delete inProgress[url];
          script?.parentNode && script.parentNode.removeChild(script);
          doneFns && doneFns.forEach((fn) => fn(event));
          if (prev) return prev(event as Event);
        };

        var timeout = setTimeout(
          () => onScriptComplete(undefined, { type: 'timeout', target: script! }),
          120000
        );
        script.onerror = (event) => onScriptComplete(script!.onerror, event as Event);
        script.onload = (event) => onScriptComplete(script!.onload, event);

        needAttach && document.head.appendChild(script);
      };

      return load;
    })(),

    get p(): string {
      let scriptUrl: string | undefined;

      if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + '';
      var document = __webpack_require__.g.document as Document;
      if (!scriptUrl && document) {
        if (document.currentScript) scriptUrl = (document.currentScript as HTMLScriptElement).src;
        if (!scriptUrl) {
          var scripts = document.getElementsByTagName('script');
          if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
        }
      }

      if (!scriptUrl) throw new Error('Automatic publicPath is not supported in this browser');

      scriptUrl = scriptUrl
        .replace(/#.*$/, '')
        .replace(/\?.*$/, '')
        .replace(/\/[^\/]+$/, '/');

      return scriptUrl;
    },
  });

  // runtime/jsonp chunk loading

  (() => {
    /**
     * status for installed chunks
     * - 0 = chunk loaded
     * - [resolve, reject, Promise] = loading
     * - undefined = chunk not loaded
     */
    type LoadingChunkData = [
      resolve: (value?: unknown) => void,
      reject: (reason: any) => void,
      promise: Promise<unknown>,
    ];

    var installedChunks: Record<string, 0 | LoadingChunkData | undefined> = {
      main: 0,
    };

    __webpack_require__.f.j = (chunkId, promises) => {
      var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined;

      if (installedChunkData !== 0) {
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if (true) {
            var promise = new Promise((resolve, reject) => {
              installedChunkData = installedChunks[chunkId] = [
                resolve,
                reject,
              ] as any as LoadingChunkData;
            });
            promises.push(((installedChunkData as any as LoadingChunkData)[2] = promise));

            var url = __webpack_require__.p + __webpack_require__.u(chunkId);
            // create error before stack unwound to get useful stacktrace later
            var error = new Error();

            var loadingEnded: OnLoadCallback = (event) => {
              if (__webpack_require__.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId];
                if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
                if (installedChunkData) {
                  var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                  var realSrc = event && event.target && (event.target as HTMLScriptElement).src;
                  error.message = `Loading chunk ${chunkId} failed.\n(${errorType}: ${realSrc})`;
                  error.name = 'ChunkLoadError';
                  (error as any).type = errorType;
                  (error as any).request = realSrc;
                  installedChunkData[1](error);
                }
              }
            };
            __webpack_require__.l(url, loadingEnded, `chunk-${chunkId}`, chunkId);
          } else installedChunks[chunkId] = 0;
        }
      }
    };

    // no prefetching

    // no preloaded

    // no HMR

    // no HMR manifest

    // no on chunks loaded

    type ChunkLoadingFn = (chunkData: ChunkData) => void;

    var webpackJsonpCallback = (
      parentChunkLoadingFunction: undefined | ChunkLoadingFn,
      data: ChunkData
    ) => {
      var [chunkIds, moreModules, runtime] = data;

      var moduleId: string;

      // some chunk was never loaded, let's merge them now
      if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        for (moduleId in moreModules) {
          if (__webpack_require__.o(moreModules, moduleId)) {
            // merge the modules in the chunk into __webpack_modules__
            __webpack_require__.m[moduleId] = moreModules[moduleId];
          }
        }
        if (runtime) runtime(__webpack_require__);
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (var i = 0; i < chunkIds.length; i++) {
        var chunkId = chunkIds[i];
        if (__webpack_require__.o(installedChunks, chunkId)) {
          const chunkData = installedChunks[chunkId];

          if (chunkData) {
            chunkData[0](); // resolve chunk data
          }
        }
        installedChunks[chunkId] = 0;
      }
    };

    var chunkLoadingGlobal = (self['webpackChunkwebpack_raw'] =
      self['webpackChunkwebpack_raw'] || []);

    // load chunks that already collected
    chunkLoadingGlobal.forEach((data) => webpackJsonpCallback(undefined, data));

    // load chunks for incoming chunk pushed to chunkLoadingGlobal
    chunkLoadingGlobal.push = function (data): any {
      webpackJsonpCallback(chunkLoadingGlobal.push.bind(chunkLoadingGlobal), data);
    };
  })();

  // TODO: figure out what is the use of this
  var __webpack_exports__ = {};

  // entry wrapped in an IIFEE so it is isolated against other modules in the chunk
  (() => {
    /*
     * Source code of this entry is
     * ```js
     * import { myCode } from './my-code';
     *
     * console.log(myCode);
     *
     * setTimeout(() =>
     *   import('./src/lazy-content')
     *     .then(m => m.run()),
     *   3000
     * );
     * ```
     */
    __webpack_require__.r(__webpack_exports__);
    var myCodeModule = __webpack_require__('./src/my-code.js');

    console.log(myCodeModule.myCode);

    setTimeout(() => {
      __webpack_require__
        .e('src_lazy-content_js')
        .then(() => __webpack_require__('./src/lazy-content.js'));
    }, 3000);
  })();
}
