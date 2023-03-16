import { dehydrate } from '@tanstack/react-query';
import type { APIRoute, GetStaticPaths } from 'astro';
import { getStaticRouteData, queryClient } from '~/app/react-app';
import type { QueryOptions } from '~/app/types';

export const getStaticPaths: GetStaticPaths = async function getStaticPaths() {
  const data = await getStaticRouteData();

  const paths = data.map((d) => ({
    params: {
      slug: d.path == null ? 'index' : d.path,
    },
  }));

  return paths;
};

export const get: APIRoute = async ({ params }) => {
  const data = await getStaticRouteData();

  const titleByPath: Record<string, string> = {};

  data.forEach(({ path, props }) => {
    if (props.title) {
      titleByPath[`/${path || ''}`] = props.title;
    }
  });

  const currentPathData = data.find((d) => (d.path == null ? 'index' : d.path) === params.slug)!;
  const {
    props: { prefetchQueries, title },
  } = currentPathData;

  async function prefetchData(queries: Array<QueryOptions>) {
    for (const { getDependentQueries, ...queryOptions } of queries) {
      await queryClient.prefetchQuery(queryOptions);
      if (getDependentQueries) {
        const result = queryClient.getQueryData(queryOptions.queryKey);
        if (result) {
          const dependents = getDependentQueries(result);

          if (dependents && dependents.length > 0) {
            prefetchData(dependents);
          }
        }
      }
    }
  }

  if (prefetchQueries) {
    queryClient.clear();
    await prefetchData(prefetchQueries);
  }

  return {
    body: JSON.stringify({
      titleByPath,
      title,
      dehydratedState: dehydrate(queryClient),
    }),
  };
};
