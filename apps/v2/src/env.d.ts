/// <reference types="astro/client-image" />
/// <reference path="../.astro/types.d.ts" />

interface ViewTransition {
  ready: Promise<unknown>;
  finished: Promise<unknown>;
}

interface Document {
  startViewTransition?: (cb: () => void) => ViewTransition;
}
