import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useLocation, type RouteObject } from 'react-router-dom';
import type * as types from './types';

/** './pages/something/else.tsx' -> 'something/else' */
const removePrefixAndExtension = (filePath: string) =>
  filePath.replace(/^\.\/pages\//, '').replace(/(index)?\.tsx$/, '');

/** check if the path matches pattern of [dynamic] */
const hasDynamicPath = (path: string) => /\[\w+\]/.test(path);

const replaceDynamicSegments = (path: string, replaceFn: (dynamicParam: string) => string) => {
  let result = path;

  const dynamicSegments = path.match(/\[\w+\]/g);

  if (dynamicSegments) {
    dynamicSegments.forEach((dynamicSegment) => {
      const matchIndex = result.indexOf(dynamicSegment);
      const before = result.substring(0, matchIndex);
      const after = result.substring(matchIndex + dynamicSegment.length);

      result = `${before}${replaceFn(dynamicSegment.replace(/^\[|\]$/g, ''))}${after}`;
    });
  }

  return result;
};

const AutoTitle = (props: { titleByPath: Record<string, string | undefined> }) => {
  const location = useLocation();
  const title = props.titleByPath[location.pathname];

  return title ? (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  ) : null;
};

const Layout = (props: { titleByPath: Record<string, string | undefined> }) => {
  return (
    <>
      <AutoTitle {...props} />
      <Outlet />
    </>
  );
};

export const getRoutes = (
  pagesMetadata: Record<string, types.PageExports>,
  titleByPath: Record<string, string | undefined>
): RouteObject[] => {
  const routes: RouteObject[] = [];

  Object.entries(pagesMetadata).forEach(([filePath, { default: PageComponent }]) => {
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
  });

  return [
    {
      path: '/',
      element: <Layout titleByPath={titleByPath} />,
      children: routes,
    },
  ];
};

export const getAllStaticData = async (
  pagesMetadata: Record<string, types.PageExports>
): Promise<Array<types.StaticDataResult>> => {
  const result: Array<types.StaticDataResult> = [];

  const pageEntries = Object.entries(pagesMetadata);

  for (const [filePath, { default: PageComponent, getStaticData }] of pageEntries) {
    if (!PageComponent) {
      continue;
    }

    const path = removePrefixAndExtension(filePath);

    const staticData = getStaticData ? await getStaticData() : {};

    if (hasDynamicPath(path)) {
      if (Array.isArray(staticData)) {
        staticData.forEach(({ params, title, prefetchQueries }) => {
          result.push({
            path: replaceDynamicSegments(path, (paramName) => params[paramName]),
            props: {
              title,
              prefetchQueries,
            },
          });
        });

        continue;
      } else {
        console.error(
          `getStaticData should returns an array with params property for dynamic page.`
        );
      }
    }

    if (!Array.isArray(staticData)) {
      result.push({
        path: path === '' ? undefined : path,
        props: staticData,
      });
    } else {
      console.error(`getStaticData should returns an object for page without dynamic path`);
    }
  }

  return result;
};
