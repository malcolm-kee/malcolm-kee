import type { ImageData } from '~/lib/cloudinary';
import * as React from 'react';

export interface CloudinaryImageProps
  extends Omit<React.ComponentPropsWithoutRef<'img'>, 'src'> {
  data: ImageData;
}

export const CloudinaryImage = ({ data, ...props }: CloudinaryImageProps) => {
  return (
    <picture>
      {data.enhancements.map((enhancement) => (
        <source {...enhancement} key={enhancement.srcSet} />
      ))}
      <img
        src={data.baseSrc}
        width={data.dimensions.width}
        height={data.dimensions.height}
        {...props}
      />
    </picture>
  );
};
