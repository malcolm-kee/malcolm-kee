import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import { Link } from './components/link';
import { ProductDetails } from './components/product-details';
import { ProductList } from './components/product-list';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Products</h1>
      <ProductList />
    </div>
  );
};

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <div className="mb-3">
        <Link to="/" animateNavigation className="text-gray-500">
          {'<'} All products
        </Link>
      </div>
      <ProductDetails productId={productId!} />
    </div>
  );
};

export const ReactApp = (props: { basename: string }) => {
  const [router] = React.useState(() =>
    createBrowserRouter(
      [
        {
          index: true,
          element: <HomePage />,
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
      ],
      { basename: props.basename }
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
