const dataset = [
  {
    name: 'Malcolm',
    age: 32,
  },
  {
    name: 'Esther',
    age: 10,
  },
  {
    name: 'Richie',
    age: 50,
  },
  {
    name: 'Audrey',
    age: 25,
  },
];

/**
 * Given a number,
 * returns persons whose age larger than the number
 *
 * Examples:
 * - minAge: 40 -> [{ name: 'Richie', age: 50 }]
 * - minAge: 51 -> []
 * - minAge: 30 -> [{ name: 'Malcolm', age: 32 }, { name: 'Richie', age: 50 }]
 */
export default function findOlderThan(minAge) {
  const result = [];

  for (const data of dataset) {
    if (data.age > minAge) {
      result.push(data);
    }
  }

  return result;
}
