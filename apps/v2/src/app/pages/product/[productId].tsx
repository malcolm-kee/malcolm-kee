import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '~/components/icons';
import { Link } from '../../components/link';
import { NavBar } from '../../components/nav-bar';
import { ProductDetails } from '../../components/product-details';

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <NavBar>
        <Link
          to="/product"
          animateNavigation
          className="inline-flex items-center gap-2 text-gray-500"
        >
          <ChevronLeftIcon className="w-5 h-5" /> Products
        </Link>
      </NavBar>
      <ProductDetails productId={productId!} />
    </div>
  );
}
