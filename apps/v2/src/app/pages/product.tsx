import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '~/components/icons';
import { NavBar } from '../components/nav-bar';
import { ProductList } from '../components/product-list';
import { productQueryOptions } from '../queries/product-queries';
import type { GetStaticData } from '../types';

export const getStaticData = async function getStaticData() {
  return {
    title: 'Products',
    prefetchQueries: [productQueryOptions.products()],
  };
} satisfies GetStaticData;

export default function ProductsPage() {
  return (
    <div>
      <NavBar>
        <Link to="/" viewTransition className="inline-flex items-center gap-2 text-gray-500">
          <ChevronLeftIcon className="w-5 h-5" /> Home
        </Link>
      </NavBar>
      <h1 className="text-4xl font-bold mb-6 w-fit [view-transition-name:product-page-title]">
        Products
      </h1>
      <ProductList />
    </div>
  );
}
