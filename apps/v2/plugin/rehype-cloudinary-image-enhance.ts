import type { Element, Properties, Root } from 'hast';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { getCloudinaryHelpers, getCloudinaryImageInfo } from '../src/lib/cloudinary';

type ImageElement = Element & { properties: Properties };

/**
 * Enhance image element with width and height info
 * if image is hosted on cloudinary
 */
export const rehypeCloudinaryImageEnhance = (options: {
  cloudinaryUsername: string;
}): Transformer<Root> => {
  const { checkIsCloudinaryImage } = getCloudinaryHelpers({
    cloudinaryUsername: options.cloudinaryUsername,
  });

  return async function transformer(tree) {
    const imageElements: Array<ImageElement> = [];

    visit(tree, 'element', function visitor(element) {
      if (element.tagName === 'img' && element.properties) {
        const imageSrc = element.properties.src;
        const isCloudinaryImage = checkIsCloudinaryImage(imageSrc);
        if (isCloudinaryImage && !element.properties.height && !element.properties.width) {
          imageElements.push(element as ImageElement);
        }
      }
    });

    await Promise.all(
      imageElements.map((element) =>
        getCloudinaryImageInfo(element.properties.src as string).then((res) => {
          if (res) {
            element.properties.width = res.output.width;
            element.properties.height = res.output.height;
          }
        })
      )
    );
  };
};
