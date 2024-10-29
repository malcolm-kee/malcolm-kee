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
    // code-separator class is added by codeWalkthroughTransformer
    if (child instanceof HTMLElement && child.classList.contains('code-separator')) {
      separatorIndexes.push(childIndex);
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
