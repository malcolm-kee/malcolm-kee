/**
 * Given an array of number (data parameter), and a number (num parameter),
 * returns all the indexes of the num in the data.
 *
 * Examples:
 * - data: [2,3,2,6], num: 2 -> [0,2]
 * - data: [5,3,1], num: 6 -> []
 * - data: [7,7,7], num: 7 -> [0,1,2]
 */
export default function getPositions(data, num) {
  const result = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    if (element === num) {
      result.push(index);
    }
  }

  return result;
}
