import { request } from 'undici';

export const getCloudinaryHelpers = (options: {
  cloudinaryUsername: string;
}) => {
  const regex = new RegExp(
    /^https:\/\/res\.cloudinary\.com\/\w+\/image\/upload\/([\w_,]+\/)?\w+\//
      .source + options.cloudinaryUsername
  );

  const checkIsCloudinaryImage = (imageSrc: unknown): imageSrc is string =>
    typeof imageSrc === 'string' && regex.test(imageSrc);

  return {
    checkIsCloudinaryImage,
  };
};

export const getCloudinaryImageInfo = async (
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
