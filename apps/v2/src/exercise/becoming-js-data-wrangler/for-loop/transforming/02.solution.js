export default function getPersonsSummary(dataset) {
  return dataset.map((person) => (person.age ? `${person.name}, aged ${person.age}` : person.name));
}
