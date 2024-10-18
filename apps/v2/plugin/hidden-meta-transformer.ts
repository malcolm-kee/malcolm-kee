import type { ShikiTransformer } from 'shiki';

export const hiddenMetaTransformer = (): ShikiTransformer => {
  return {
    name: 'malcolm-hidden-meta',
    pre(element) {
      if (this.options.meta?.__raw && /\bhidden\b/.test(this.options.meta.__raw)) {
        element.properties['hidden'] = true;
      }
    },
  };
};
