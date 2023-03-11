import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import {
  createBrowserRouter,
  createMemoryRouter,
  RouteObject,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '~/components/icons';
import { Link } from './components/link';
import { ProductDetails } from './components/product-details';
import { ProductList } from './components/product-list';
import { productQueryOptions } from './queries/product-queries';
import './react-app.css';
import { getProducts } from './services/product-service';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

const NavBar = (props: { children: React.ReactNode }) => (
  <div className="mb-3 [view-transition-name:navbar]" {...props} />
);

const ProductsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <NavBar>
        <Link
          to="/"
          animateNavigation
          className="inline-flex items-center gap-2 text-gray-500"
        >
          <ChevronLeftIcon className="w-5 h-5" /> Home
        </Link>
      </NavBar>
      <h1 className="text-4xl font-bold mb-6 w-fit [view-transition-name:product-page-title]">
        Products
      </h1>
      <ProductList />
    </div>
  );
};

const ProductDetailsPage = () => {
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
};

export async function getStaticRouteData() {
  const products = await getProducts();

  return [
    {
      path: 'product',
      props: {
        title: 'Products',
        queryOptions: productQueryOptions.products(),
      },
    },
    ...products.map((product) => ({
      path: `product/${product._id}`,
      props: {
        title: product.name,
        queryOptions: productQueryOptions.productDetails(product._id),
      },
    })),
  ];
}

export const routes: RouteObject[] = [
  {
    index: true,
    element: (
      <div>
        <h1 className="text-4xl font-bold mb-6">SPA Demo</h1>
        <p className="mb-6">A SPA embedded into an Astro site.</p>
        <ul>
          <li>
            <Link
              to="/product"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
              animateNavigation
            >
              <ChevronRightIcon className="w-5 h-5" />
              <span className="text-lg [view-transition-name:product-page-title]">
                Products
              </span>
            </Link>
          </li>
        </ul>
      </div>
    ),
  },
  {
    path: '/product',
    element: <ProductsPage />,
  },
  {
    path: `/product/:productId`,
    element: <ProductDetailsPage />,
  },
  {
    path: '*',
    element: (
      <div>
        <h1>Client Side Page Not Found</h1>
      </div>
    ),
  },
];

const isSsr = import.meta.env.SSR;

export interface ReactAppProps {
  basename: string;
  currentPath: string;
  dehydratedState?: unknown;
}

export const ReactApp = (props: ReactAppProps) => {
  const [router] = React.useState(() =>
    isSsr
      ? createMemoryRouter(routes, {
          basename: props.basename,
          initialEntries: [props.currentPath],
        })
      : createBrowserRouter(routes, { basename: props.basename })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet titleTemplate="%s - SPA Demo" defaultTitle="SPA Demo" />
      <Hydrate state={props.dehydratedState}>
        <RouterProvider router={router} />
      </Hydrate>
    </QueryClientProvider>
  );
};
