import type { ElementContent, Element as HastElement } from 'hast';
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

          if (text.value.startsWith('//=====')) {
            this.addClassToHast(line, 'code-separator');
          } else if (text.value.startsWith('//<-')) {
            // this.addClassToHast(prevChild, 'code-comment-start');
            this.addClassToHast(child, 'code-walkthrough-comment');
          }
        }
      });
    },
  };
};
