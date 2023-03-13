/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface Document {
  startViewTransition?: (cb: () => void) => {};
}
