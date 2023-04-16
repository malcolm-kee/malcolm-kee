export default function processIntegers(numberStrings) {
  const result = [];

  for (const original of numberStrings) {
    const intValue = parseInt(original, 10);

    result.push({
      original,
      squared: intValue * intValue,
    });
  }

  return result;
}
