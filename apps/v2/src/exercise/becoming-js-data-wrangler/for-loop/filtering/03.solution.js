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

export default function findOlderThan(minAge) {
  const result = [];

  for (const data of dataset) {
    if (data.age > minAge) {
      result.push(data);
    }
  }

  return result;
}
