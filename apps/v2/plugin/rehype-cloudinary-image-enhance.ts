import type { Root, Element, Properties } from 'hast';
import { request } from 'undici';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

type ImageElement = Element & { properties: Properties };

export const rehypeCloudinaryImageEnhance = (options: {
  cloudinaryUsername: string;
}): Transformer<Root> => {
  const regex = new RegExp(
    /^https:\/\/res\.cloudinary\.com\/\w+\/image\/upload\/\w+\//.source +
      options.cloudinaryUsername
  );

  const checkIsCloudinaryImage = (imageSrc: unknown): imageSrc is string =>
    typeof imageSrc === 'string' && regex.test(imageSrc);

  return async function transformer(tree) {
    const imageElements: Array<ImageElement> = [];

    visit(tree, 'element', function visitor(element) {
      if (element.tagName === 'img' && element.properties) {
        const imageSrc = element.properties.src;
        const isCloudinaryImage = checkIsCloudinaryImage(imageSrc);
        if (
          isCloudinaryImage &&
          !element.properties.height &&
          !element.properties.width
        ) {
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

const getCloudinaryImageInfo = async (
  imageSrc: string
): Promise<
  | {
      output: { format: string; width: number; height: number };
    }
  | undefined
> => {
  const url = imageSrc.replace(/\/image\/upload/, '/image/upload/fl_getinfo');

  try {
    const { body } = await request(url);
    const result = await body.json();

    return result;
  } catch (err) {
    console.info(`Fail to get image info for ${url}`);
  }
};
