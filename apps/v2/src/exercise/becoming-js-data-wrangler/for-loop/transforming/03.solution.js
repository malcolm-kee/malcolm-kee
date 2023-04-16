export default function addAgeTagging(dataset) {
  const result = [];

  for (const person of dataset) {
    result.push({
      ...person,
      isUnderage: typeof person.age === 'number' && person.age < 18,
    });
  }

  return result;
}
