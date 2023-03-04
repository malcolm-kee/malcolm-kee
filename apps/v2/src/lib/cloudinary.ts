import { v2 as cloudinary } from 'cloudinary';
import { request } from 'undici';

cloudinary.config({
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

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

type ColorPercentage = [string, number];

export const getTransformedImage = async (imagePublicId: string) => {
  const jpgUrl = cloudinary.url(imagePublicId, {
    resource_type: 'image',
    format: 'jpg',
    width: 1500,
  });

  const webpUrl = cloudinary.url(imagePublicId, {
    resource_type: 'image',
    format: 'webp',
    width: 1500,
  });

  const smallJpgUrl = cloudinary.url(imagePublicId, {
    resource_type: 'image',
    format: 'jpg',
    width: 500,
  });

  const smallWebpUrl = cloudinary.url(imagePublicId, {
    resource_type: 'image',
    format: 'webp',
    width: 500,
  });

  const info: {
    width: number;
    height: number;
    colors: Array<ColorPercentage>;
  } = await cloudinary.api.resource(imagePublicId, {
    resource_type: 'image',
    colors: true,
  });

  return {
    jpgUrl,
    smallJpgUrl,
    webpUrl,
    smallWebpUrl,
    info,
  };
};
