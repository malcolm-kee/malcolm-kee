export default function positiveOnly(data) {
  const result = [];

  for (const num of data) {
    if (num > 0) {
      result.push(num);
    }
  }

  return result;
}
