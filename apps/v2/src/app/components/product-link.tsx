import * as React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../services/product-service';

export const ProductLink = ({ data }: { data: Product }) => {
  return (
    <Link
      to={`/product/${data._id}`}
      className="flex items-center gap-2 p-1 hover:bg-gray-50"
    >
      {data.images ? (
        <img
          src={data.images.thumbWebp}
          alt=""
          width={188}
          height={188}
          className="w-10 h-10 rounded-full"
          style={
            {
              viewTransitionName: `product-${data._id}`,
            } as any
          }
        />
      ) : (
        <div
          className="w-10 h-10 bg-gray-100 rounded-full"
          style={
            {
              viewTransitionName: `product-${data._id}`,
            } as any
          }
        />
      )}
      <span className="text-sm line-clamp-2">{data.name}</span>
    </Link>
  );
};
