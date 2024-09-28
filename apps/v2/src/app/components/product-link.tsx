import * as React from 'react';
import type { Product } from '../services/product-service';
import { Link } from './link';
import { isProductNavigated, navigateProduct } from './product-navigation';

export const ProductLink = ({ data }: { data: Product }) => {
  const imageRef = React.useRef<HTMLImageElement>(null);

  return (
    <Link
      to={`/product/${data._id}`}
      className="flex items-center gap-2 p-1 hover:bg-gray-50"
      animateNavigation
      onClick={() => {
        navigateProduct(data._id);
        if (imageRef.current) {
          imageRef.current.style.viewTransitionName = `product-${data._id}`;
        }
      }}
    >
      {data.images ? (
        <img
          src={data.images.thumbWebp}
          alt=""
          width={188}
          height={188}
          className="w-10 h-10 rounded-full"
          style={
            isProductNavigated(data._id)
              ? ({
                  viewTransitionName: `product-${data._id}`,
                } as any)
              : undefined
          }
          ref={imageRef}
        />
      ) : (
        <div
          className="w-10 h-10 bg-gray-100 rounded-full"
          style={
            isProductNavigated(data._id)
              ? ({
                  viewTransitionName: `product-${data._id}`,
                } as any)
              : undefined
          }
          ref={imageRef}
        />
      )}
      <span className="text-sm line-clamp-2">{data.name}</span>
    </Link>
  );
};
