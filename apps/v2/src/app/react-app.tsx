import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import { getAllStaticData, getRoutes } from './framework';
import './react-app.css';
import type { PageExports, StaticDataResult } from './types';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

const pages: Record<string, PageExports> = import.meta.glob('./pages/**/*.tsx', {
  eager: true,
});

let allStaticData: StaticDataResult[];

export async function getStaticRouteData() {
  if (allStaticData) {
    return allStaticData;
  }

  allStaticData = await getAllStaticData(pages);

  return allStaticData;
}

const isSsr = import.meta.env.SSR;

export interface ReactAppProps {
  basename: string;
  currentPath: string;
  titleByPath: Record<string, string | undefined>;
  dehydratedState?: unknown;
}

export const ReactApp = (props: ReactAppProps) => {
  const [router] = React.useState(() => {
    const allRoutes = getRoutes(pages, props.titleByPath);

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
