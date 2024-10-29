import type { ShikiTransformer } from 'shiki';

export const codeWalkthroughTransformer = (): ShikiTransformer => {
  return {
    name: 'malcolm-code-walkthrough',
    code(element) {
      const lines = element.children.filter((i) => i.type === 'element');
      lines.forEach((line) => {
        for (let i = 0; i < line.children.length; i++) {
          const child = line.children[i];

          if (child.type !== 'element') {
            continue;
          }

          const text = child.children[0];

          if (text.type !== 'text') {
            continue;
          }

          if (/=====/.test(text.value)) {
            const prevChild = line.children[i - 1];
            if (
              prevChild &&
              prevChild.type === 'element' &&
              prevChild.children[0].type === 'text' &&
              prevChild.children[0].value === '//'
            ) {
              this.addClassToHast(line, 'code-separator');
            }
          }
        }
      });
    },
  };
};
