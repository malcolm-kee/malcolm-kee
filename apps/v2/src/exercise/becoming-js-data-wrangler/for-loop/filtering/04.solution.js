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
