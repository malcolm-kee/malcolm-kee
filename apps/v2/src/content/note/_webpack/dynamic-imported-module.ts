import type { WebpackRequire } from './bootstrap-with-dynamic-import';

(self['webpackChunkwebpack_raw'] = self['webpackChunkwebpack_raw'] || []).push([
  ['src_lazy-content_js'],
  {
    './src/lazy-content.js': (_, __webpack_exports__, __webpack_require__: WebpackRequire) => {
      __webpack_require__.r(__webpack_exports__);

      __webpack_require__.d(__webpack_exports__, {
        run: () => run,
      });

      function run() {
        console.log('do something');
      }
    },
  },
]);
