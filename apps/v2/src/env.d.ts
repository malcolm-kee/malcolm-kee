/// <reference types="astro/client-image" />
/// <reference path="../.astro/types.d.ts" />

interface Document {
  startViewTransition?: (cb: () => void) => {};
}
