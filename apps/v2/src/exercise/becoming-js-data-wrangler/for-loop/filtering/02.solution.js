export default function excludeUndefined(data) {
  const result = [];

  for (const d of data) {
    if (typeof d !== 'undefined') {
      result.push(d);
    }
  }

  return result;
}
