import type { ShikiTransformer } from 'shiki';

const parseTitleFromMetaString = (meta: string) => {
  const match = meta.match(/title="([^"]+)"/);
  return match ? match[1] : null;
};

const symbol = Symbol('title-meta');

export const titleMetaTransformer = (): ShikiTransformer => {
  return {
    name: 'malcolm-title-meta',
    pre(element) {
      if (!this.options.meta?.__raw) {
        return;
      }

      const title = parseTitleFromMetaString(this.options.meta?.__raw);

      if (title) {
        this.meta[symbol] = title;

        this.addClassToHast(element, 'mt-0');
      }
    },
    postprocess(html) {
      const title = this.meta[symbol];

      if (typeof title === 'string' && title) {
        const titleElement = /* html */ `<div class="px-4 bg-gray-100 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-200 rounded-t-xl"><span class="font-techie text-sm font-medium">${title}</span></div>`;

        const result = /* html */ `<div>${titleElement}${html}</div>`;

        return result;
      }
    },
  };
};
