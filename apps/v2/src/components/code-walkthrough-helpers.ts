import { includes } from '@mkee/helpers';

const SUPPORTED_LANGUAGES = ['js', 'jsx', 'ts', 'tsx'] as const;

interface CodeWalkthroughMarkers {
  separatorIndexes: Array<number>;
}

export const extractCodeWalkthroughMarkers = (
  $codeElement: HTMLElement,
  language: string
): CodeWalkthroughMarkers | undefined => {
  if (!includes(SUPPORTED_LANGUAGES, language)) {
    return undefined;
  }

  const separatorIndexes: Array<number> = [];

  $codeElement.childNodes.forEach((child, childIndex) => {
    if (child instanceof HTMLElement) {
      // code-separator class is added by codeWalkthroughTransformer
      if (child.classList.contains('code-separator')) {
        separatorIndexes.push(childIndex);
      } else if (child.classList.contains('line')) {
        let codeWalkthroughCommentNode: HTMLElement | undefined;

        child.childNodes.forEach((lineChild) => {
          if (lineChild instanceof HTMLElement) {
            if (lineChild.classList.contains('code-walkthrough-comment')) {
              if (!codeWalkthroughCommentNode) {
                codeWalkthroughCommentNode = lineChild;
              } else {
                console.error('multiple code-walkthrough-comment nodes found', lineChild);
              }
            }
          }
        });

        if (codeWalkthroughCommentNode) {
          codeWalkthroughCommentNode.textContent =
            codeWalkthroughCommentNode.textContent?.replace(/^\/\/\<-/, '').trim() || null;
          codeWalkthroughCommentNode.classList.add('font-techie', 'text-lg');
          codeWalkthroughCommentNode.style.color = 'hsl(212 8% 64%)';
        }
      }
    }
  });

  return {
    separatorIndexes,
  };
};

export const getCodeWalkthroughSectionIndex = (
  lineIndex: number,
  separatorIndexes: Array<number>
): number => {
  if (separatorIndexes.includes(lineIndex)) {
    return -1;
  }

  const lastIndex = separatorIndexes[separatorIndexes.length - 1];

  if (lineIndex > lastIndex) {
    return separatorIndexes.length;
  }

  return separatorIndexes.findIndex((separatorIndex) => separatorIndex > lineIndex);
};
