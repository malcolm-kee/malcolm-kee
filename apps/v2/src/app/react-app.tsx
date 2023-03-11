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
  RouterProvider,
} from 'react-router-dom';
import { getRoutes } from './framework';
import { productQueryOptions } from './queries/product-queries';
import './react-app.css';
import { getProducts } from './services/product-service';
import type { PageExports } from './types';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

const pages: Record<string, PageExports> = import.meta.glob(
  './pages/**/*.tsx',
  {
    eager: true,
  }
);

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

const isSsr = import.meta.env.SSR;

export interface ReactAppProps {
  basename: string;
  currentPath: string;
  dehydratedState?: unknown;
}

export const ReactApp = (props: ReactAppProps) => {
  const [router] = React.useState(() => {
    const allRoutes = getRoutes(pages);

    return isSsr
      ? createMemoryRouter(allRoutes, {
          basename: props.basename,
          initialEntries: [props.currentPath],
        })
      : createBrowserRouter(allRoutes, { basename: props.basename });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet titleTemplate="%s - SPA Demo" defaultTitle="SPA Demo" />
      <Hydrate state={props.dehydratedState}>
        <RouterProvider router={router} />
      </Hydrate>
    </QueryClientProvider>
  );
};
