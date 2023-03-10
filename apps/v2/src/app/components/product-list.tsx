import * as React from 'react';
import { useProducts } from '../queries/product-queries';
import { ProductLink } from './product-link';

export const ProductList = () => {
  const { isLoading, data } = useProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {data && data.map((row) => <ProductLink data={row} key={row._id} />)}
      </div>
    </>
  );
};
