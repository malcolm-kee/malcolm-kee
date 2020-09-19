/**
 * Worker to fetch typescript definitions for dependencies.
 * Credits to @CompuIves
 * https://github.com/CompuIves/codesandbox-client/blob/dcdb4169bcbe3e5aeaebae19ff1d45940c1af834/packages/app/src/app/components/CodeEditor/Monaco/workers/fetch-dependency-typings.js
 *
 */

import path from 'path';
import { Store, set as setItem, get as getItem } from 'idb-keyval';
import type TypeScript from 'typescript';

declare global {
  var ts: typeof TypeScript;
}

self.importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/typescript/3.7.5/typescript.min.js'
);

const ROOT_URL = `https://cdn.jsdelivr.net/`;

const store = new Store('typescript-definitions-cache-v1');
const fetchCache = new Map<string, Promise<string>>();

const doFetch = (url: string) => {
  const cached = fetchCache.get(url);

  if (cached) {
    return cached;
  }

  const promise = fetch(url)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }

      const error = new Error(String(response.statusText || response.status));

      return Promise.reject(error);
    })
    .then((response) => response.text());

  fetchCache.set(url, promise);

  return promise;
};

const fetchFromDefinitelyTyped = (
  dependency: string,
  _: string,
  fetchedPaths: Record<string, string>
) =>
  doFetch(
    `${ROOT_URL}npm/@types/${dependency
      .replace('@', '')
      .replace(/\//g, '__')}/index.d.ts`
  ).then((typings) => {
    fetchedPaths[`node_modules/@types/${dependency}/index.d.ts`] = typings;
  });

const getRequireStatements = (title: string, code: string) => {
  const requires: string[] = [];

  const sourceFile = self.ts.createSourceFile(
    title,
    code,
    self.ts.ScriptTarget.Latest,
    true,
    self.ts.ScriptKind.TS
  );

  self.ts.forEachChild(sourceFile, (node) => {
    switch (node.kind) {
      case self.ts.SyntaxKind.ImportDeclaration: {
        requires.push((node as any).moduleSpecifier.text);
        break;
      }
      case self.ts.SyntaxKind.ExportDeclaration: {
        // For syntax 'export ... from '...'''
        if ((node as any).moduleSpecifier) {
          requires.push((node as any).moduleSpecifier.text);
        }
        break;
      }
      default: {
        /* */
      }
    }
  });

  return requires;
};

type JSDeliverFile = {
  name: string;
  hash: string;
  time: string;
  size: number;
};

const tempTransformFiles = (files: Array<JSDeliverFile>) => {
  const finalObj: Record<string, JSDeliverFile> = {};

  files.forEach((d) => {
    finalObj[d.name] = d;
  });

  return finalObj;
};

const getFileMetaData = (
  dependency: string,
  version: string,
  depPath: string
) =>
  doFetch(
    `https://data.jsdelivr.com/v1/package/npm/${dependency}@${version}/flat`
  )
    .then((response) => JSON.parse(response))
    .then((response: { default: string; files: Array<JSDeliverFile> }) =>
      response.files.filter((f) => f.name.startsWith(depPath))
    )
    .then(tempTransformFiles);

const resolveAppropiateFile = (
  fileMetaData: Record<string, JSDeliverFile>,
  relativePath: string
) => {
  const absolutePath = `/${relativePath}`;

  if (fileMetaData[`${absolutePath}.d.ts`]) return `${relativePath}.d.ts`;
  if (fileMetaData[`${absolutePath}.ts`]) return `${relativePath}.ts`;
  if (fileMetaData[absolutePath]) return relativePath;
  if (fileMetaData[`${absolutePath}/index.d.ts`])
    return `${relativePath}/index.d.ts`;

  return relativePath;
};

const getFileTypes = (
  depUrl: string,
  dependency: string,
  depPath: string,
  fetchedPaths: Record<string, string>,
  fileMetaData: Record<string, JSDeliverFile>
): Promise<unknown> => {
  const virtualPath = path.join('node_modules', dependency, depPath);

  if (fetchedPaths[virtualPath]) return Promise.resolve(null);

  return doFetch(`${depUrl}/${depPath}`).then((typings) => {
    if (fetchedPaths[virtualPath]) return null;

    fetchedPaths[virtualPath] = typings;

    // Now find all require statements, so we can download those types too
    return Promise.all(
      getRequireStatements(depPath, typings)
        .filter(
          // Don't add global deps
          (dep) => dep.startsWith('.')
        )
        .map((relativePath) => path.join(path.dirname(depPath), relativePath))
        .map((relativePath) =>
          resolveAppropiateFile(fileMetaData, relativePath)
        )
        .map((nextDepPath) =>
          getFileTypes(
            depUrl,
            dependency,
            nextDepPath,
            fetchedPaths,
            fileMetaData
          )
        )
    );
  });
};

function fetchFromMeta(
  dependency: string,
  version: string,
  fetchedPaths: Record<string, string>
) {
  const depUrl = `https://data.jsdelivr.com/v1/package/npm/${dependency}@${version}/flat`;

  return doFetch(depUrl)
    .then((response) => JSON.parse(response))
    .then((meta: { default: string; files: Array<JSDeliverFile> }) => {
      const filterAndFlatten = (files: Array<JSDeliverFile>, filter: RegExp) =>
        files.reduce<string[]>((paths, file) => {
          if (filter.test(file.name)) {
            paths.push(file.name);
          }
          return paths;
        }, []);

      let dtsFiles = filterAndFlatten(meta.files, /\.d\.ts$/);
      if (dtsFiles.length === 0) {
        // if no .d.ts files found, fallback to .ts files
        dtsFiles = filterAndFlatten(meta.files, /\.ts$/);
      }

      if (dtsFiles.length === 0) {
        throw new Error(`No inline typings found for ${dependency}@${version}`);
      }

      dtsFiles.forEach((file) => {
        doFetch(`https://cdn.jsdelivr.net/npm/${dependency}@${version}${file}`)
          .then((dtsFile) => {
            fetchedPaths[`node_modules/${dependency}${file}`] = dtsFile;
          })
          .catch(() => {});
      });
    });
}

function fetchFromTypings(
  dependency: string,
  version: string,
  fetchedPaths: Record<string, string>
) {
  const depUrl = `${ROOT_URL}npm/${dependency}@${version}`;

  return doFetch(`${depUrl}/package.json`)
    .then((response) => JSON.parse(response))
    .then((packageJSON) => {
      const types = packageJSON.typings || packageJSON.types;
      if (types) {
        // Add package.json, since this defines where all types lie
        fetchedPaths[
          `node_modules/${dependency}/package.json`
        ] = JSON.stringify(packageJSON);

        // get all files in the specified directory
        return getFileMetaData(
          dependency,
          version,
          path.join('/', path.dirname(types))
        ).then(
          (fileData) =>
            getFileTypes(
              depUrl,
              dependency,
              resolveAppropiateFile(fileData, types),
              fetchedPaths,
              fileData
            ) as Promise<Record<string, string>>
        );
      }

      throw new Error(
        `No typings field in package.json for ${dependency}@${version}`
      );
    });
}

function fetchDefinitions(name: string, version: string) {
  if (!version) {
    return Promise.reject(new Error(`No version specified for ${name}`));
  }

  // Query cache for the defintions
  const key = `${name}@${version}`;

  return getItem<Record<string, string>>(key, store)
    .catch((e) => {
      console.error('An error occurred when getting definitions from cache', e);
    })
    .then((result) => {
      if (result) {
        return result;
      }

      // If result is empty, fetch from remote
      const fetchedPaths: Record<string, string> = {};

      return fetchFromTypings(name, version, fetchedPaths)
        .catch(() =>
          // not available in package.json, try checking meta for inline .d.ts files
          fetchFromMeta(name, version, fetchedPaths)
        )
        .catch(() =>
          // Not available in package.json or inline from meta, try checking in @types/
          fetchFromDefinitelyTyped(name, version, fetchedPaths)
        )
        .then(() => {
          if (Object.keys(fetchedPaths).length) {
            // Also cache the definitions
            setItem(key, fetchedPaths, store);

            return fetchedPaths;
          } else {
            throw new Error(`Type definitions are empty for ${key}`);
          }
        });
    });
}

export async function getTypeDefinition({
  name,
  version,
}: {
  name: string;
  version: string;
}) {
  try {
    const typings = await fetchDefinitions(name, version);
    return {
      name,
      version,
      typings,
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  }
}
