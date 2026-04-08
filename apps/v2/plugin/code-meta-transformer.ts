import type { ShikiTransformer } from 'shiki';

export const codeMetaTransformer = (): ShikiTransformer => {
  return {
    name: 'malcolm-code-meta',
    pre(element) {
      if (!this.options.meta?.__raw) {
        return;
      }

      if (/\bhidden\b/.test(this.options.meta.__raw)) {
        element.properties['hidden'] = true;
      }

      if (/\bfull\-blend\b/.test(this.options.meta.__raw)) {
        this.addClassToHast(element, 'full-blend');
      }
    },
  };
};
