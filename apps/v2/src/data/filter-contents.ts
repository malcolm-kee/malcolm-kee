import type { ContentData } from './get-contents';

export const filterContents = (
  all: Array<ContentData>,
  minDate: Date
): {
  newContents: Array<ContentData>;
  updatedContents: Array<ContentData>;
} => {
  const newContents: Array<ContentData> = [];
  const updatedContents: Array<ContentData> = [];

  for (const content of all) {
    if (content.pubDate > minDate) {
      newContents.push(content);
    } else if (content.updatedDate && content.updatedDate > minDate) {
      updatedContents.push(content);
    }
  }

  return {
    newContents,
    updatedContents,
  };
};
