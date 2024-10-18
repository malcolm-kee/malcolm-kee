import { clsx } from 'clsx';
import { Link, useViewTransitionState } from 'react-router-dom';
import type { Product } from '../services/product-service';

export const ProductLink = ({
  data,
  isListingPage,
}: {
  data: Product;
  isListingPage?: boolean;
}) => {
  const target = `/product/${data._id}`;

  const isTransitioning = useViewTransitionState(target);

  return (
    <Link to={target} className="flex items-center gap-2 p-1 hover:bg-gray-50" viewTransition>
      {data.images ? (
        <img
          src={data.images.thumbWebp}
          alt=""
          width={188}
          height={188}
          className={clsx(
            'w-10 h-10 rounded-full',
            isTransitioning && isListingPage && '[view-transition-name:product-image]'
          )}
        />
      ) : (
        <div
          className={clsx(
            'w-10 h-10 bg-gray-100 rounded-full',
            isTransitioning && isListingPage && '[view-transition-name:product-image]'
          )}
        />
      )}
      <span className="text-sm line-clamp-2">{data.name}</span>
    </Link>
  );
};
