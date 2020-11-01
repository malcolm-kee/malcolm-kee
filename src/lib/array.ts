import { isArray } from 'typesafe-is';

export function lastItem<T>(array: T[] | null) {
  return isArray(array) ? array[array.length - 1] : array;
}

export function createEmptyArray(length: number) {
  if (Array.from) {
    return Array.from({ length });
  }

  const result = [];

  for (let index = 0; index < length; index++) {
    result.push(undefined);
  }

  return result;
}

/**
 * Check if an item is within an array OR if a string is part of a bigger string
 */
export function includes<T>(array: T[], item: T) {
  return (
    (Array.isArray(array) || typeof array === 'string') &&
    array.indexOf(item) > -1
  );
}
