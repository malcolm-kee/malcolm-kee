/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ViewTransition {
  ready: Promise<unknown>;
  finished: Promise<unknown>;
}

interface Document {
  startViewTransition?: (cb: () => void | Promise<unknown>) => ViewTransition;
}

declare var promptInstall:
  | {
      prompt: () => void;
      userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    }
  | undefined;

interface ImportMetaEnv {
  PUBLIC_WEBPUSH_KEY: string;
  PUBLIC_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
