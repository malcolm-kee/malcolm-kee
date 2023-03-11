import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import type * as types from './types';

/** './pages/something/else.tsx' -> 'something/else' */
const removePrefixAndExtension = (filePath: string) =>
  filePath.replace(/^\.\/pages\//, '').replace(/(index)?\.tsx$/, '');

/** check if the path matches pattern of [dynamic] */
const hasDynamicPath = (path: string) => /\[\w+\]/.test(path);

const replaceDynamicSegments = (
  path: string,
  replaceFn: (dynamicParam: string) => string
) => {
  let result = path;

  const dynamicSegments = path.match(/\[\w+\]/g);

  if (dynamicSegments) {
    dynamicSegments.forEach((dynamicSegment) => {
      const matchIndex = result.indexOf(dynamicSegment);
      const before = result.substring(0, matchIndex);
      const after = result.substring(matchIndex + dynamicSegment.length);

      result = `${before}${replaceFn(
        dynamicSegment.replace(/^\[|\]$/g, '')
      )}${after}`;
    });
  }

  return result;
};

export const getRoutes = (pagesMetadata: Record<string, types.PageExports>) => {
  const routes: RouteObject[] = [];

  Object.entries(pagesMetadata).forEach(
    ([filePath, { default: PageComponent }]) => {
      if (!PageComponent) {
        return;
      }

      const path = removePrefixAndExtension(filePath);

      if (hasDynamicPath(path)) {
        routes.push({
          path: replaceDynamicSegments(path, (param) => `:${param}`),
          element: <PageComponent />,
        });
      } else if (path === '') {
        routes.push({
          index: true,
          element: <PageComponent />,
        });
      }

      routes.push({
        path: path,
        element: <PageComponent />,
      });
    }
  );

  return routes;
};
