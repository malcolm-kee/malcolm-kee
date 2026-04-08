import type { ShikiTransformer } from 'shiki';

const parseDataAttrsFromMetaString = (meta: string) => {
  const result: Record<string, string> = {};
  const regex = /(data-[\w-]+)="([^"]*)"/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(meta)) !== null) {
    result[match[1]] = match[2];
  }

  return result;
};

export const dataAttrMetaTransformer = (): ShikiTransformer => {
  return {
    name: 'malcolm-data-attr-meta',
    pre(element) {
      if (!this.options.meta?.__raw) {
        return;
      }

      const dataAttrs = parseDataAttrsFromMetaString(this.options.meta.__raw);

      for (const [key, value] of Object.entries(dataAttrs)) {
        element.properties[key] = value;
      }
    },
  };
};
