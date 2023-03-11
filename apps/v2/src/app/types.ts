import type * as React from 'react';
import type { QueryKey } from '@tanstack/react-query';

export type PageComponent = React.ComponentType<{}>;

export type QueryOptions<QueryResult = unknown> = {
  queryKey: QueryKey;
  queryFn: (info: { signal?: AbortSignal }) => Promise<QueryResult>;
  getDependentQueries?: (result: QueryResult) => Array<QueryOptions>;
};

export type StaticData = {
  title?: string;
  prefetchQueries?: Array<QueryOptions<any>>;
};

export type GetStaticData = () => Promise<
  StaticData | Array<StaticData & { params: Record<string, string> }>
>;

export type StaticDataResult = {
  path: string | undefined;
  props: StaticData;
};

export type PageExports = {
  default?: PageComponent;
  getStaticData?: GetStaticData;
};
