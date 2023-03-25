type WebpackModuleExports = Record<string, any>;

interface WebpackModule {
  exports: WebpackModuleExports;
}

type WebpackHarmonyExport = Record<string, () => any>;

type WebpackRequire = ((moduleId: string) => WebpackModuleExports) & {
  /**
   * webpack/runtime/hasOwnProperty shorthand
   **/
  o: (obj: object, prop: string) => boolean;
  /**
   * define getter functions for harmony exports
   */
  d: (mExports: WebpackModuleExports, definition: WebpackHarmonyExport) => void;

  // webpack/runtime/make namespace object */

  /**
   * define __esModule on exports
   **/
  r: (mExports: WebpackModuleExports) => void;
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
  });

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
     * ```
     */
    __webpack_require__.r(__webpack_exports__);
    var myCodeModule = __webpack_require__('./src/my-code.js');

    console.log(myCodeModule.myCode);
  })();
}
