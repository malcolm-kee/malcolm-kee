export default function multiplyAll(data, num) {
  const result = [];

  for (const item of data) {
    result.push(item * num);
  }

  return result;
}
