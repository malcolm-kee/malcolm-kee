/**
 * Given an array of number,
 * returns all the positive numbers
 *
 * Examples:
 * - data: [2,-3,4,-6] -> [2,4]
 * - data: [-2,0,-20,-300] -> []
 * - data: [12,4,3] -> [12,4,3]
 */
export default function positiveOnly(data) {
  const result = [];

  for (const num of data) {
    if (num > 0) {
      result.push(num);
    }
  }

  return result;
}
