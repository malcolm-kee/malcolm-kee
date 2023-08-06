import { v2 as cloudinary } from 'cloudinary';
import { request } from 'undici';
import { getDominantColor } from './get-dominant-color';

cloudinary.config({
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export const getCloudinaryHelpers = (options: { cloudinaryUsername: string }) => {
  const regex = new RegExp(
    /^https:\/\/res\.cloudinary\.com\/\w+\/image\/upload\/([\w_,]+\/)?\w+\//.source +
      options.cloudinaryUsername
  );

  const checkIsCloudinaryImage = (imageSrc: unknown): imageSrc is string =>
    typeof imageSrc === 'string' && regex.test(imageSrc);

  return {
    checkIsCloudinaryImage,
  };
};

type CloudinaryImageInfo = {
  output: { format: string; width: number; height: number };
};

export const getCloudinaryImageInfo = async (
  imageSrc: string
): Promise<CloudinaryImageInfo | undefined> => {
  const url = imageSrc.replace(/\/image\/upload/, '/image/upload/fl_getinfo');

  try {
    const { body } = await request(url);
    const result = await body.json();

    return result as CloudinaryImageInfo;
  } catch (err) {
    console.info(`Fail to get image info for ${url}`);
  }
};

type ColorPercentage = [string, number];

export interface ImageData {
  dimensions: {
    width: number;
    height: number;
  };
  enhancements: Array<{
    type: 'image/webp' | 'image/jpg';
    media?: string;
    srcSet: string;
  }>;
  baseSrc: string;
  primaryColor: string;
}

const imageDataMap = new Map<
  string,
  {
    width: number;
    height: number;
    colors: Array<ColorPercentage>;
  }
>();

async function getImageData(imagePublicId: string) {
  const cached = imageDataMap.get(imagePublicId);

  if (cached) {
    return cached;
  }

  const info: {
    width: number;
    height: number;
    colors: Array<ColorPercentage>;
  } = await cloudinary.api.resource(imagePublicId, {
    resource_type: 'image',
    colors: true,
  });

  imageDataMap.set(imagePublicId, info);

  return info;
}

export const getTransformedImage = async (imagePublicId: string): Promise<ImageData> => {
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

  const info = await getImageData(imagePublicId);

  return {
    baseSrc: jpgUrl,
    dimensions: {
      width: info.width,
      height: info.height,
    },
    enhancements: [
      {
        type: 'image/webp',
        media: '(max-width: 400px)',
        srcSet: smallWebpUrl,
      },
      {
        type: 'image/webp',
        srcSet: webpUrl,
      },
      {
        type: 'image/jpg',
        media: '(max-width: 400px)',
        srcSet: smallJpgUrl,
      },
    ],
    primaryColor: getDominantColor(info.colors),
  };
};
