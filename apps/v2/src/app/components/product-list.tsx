import * as React from 'react';
import type { Product } from '../services/product-service';
import { ProductLink } from './product-link';

export const ProductList = ({ products }: { products: Array<Product> }) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((row) => (
        <ProductLink data={row} key={row._id} />
      ))}
    </div>
  );
};
