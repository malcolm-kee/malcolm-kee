/**
 * Given an array,
 * returns a new array with all the undefined item removed.
 *
 * Examples:
 * - data: [1,3,undefined,0,12] -> [1,3,0,12]
 * - data: [undefined, 'Pika', 'Charm', undefined, ''] -> ['Pika', 'Charm', '']
 * - data: [undefined, undefined] -> []
 */
export default function excludeUndefined(data) {
  const result = [];

  for (const d of data) {
    if (typeof d !== 'undefined') {
      result.push(d);
    }
  }

  return result;
}
