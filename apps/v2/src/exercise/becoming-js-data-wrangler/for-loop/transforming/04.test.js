import processIntegers from './04.solution';

test('processIntegers(providedExamples)', () => {
  expect(processIntegers(['1', '2', '3', '4', '5'])).toStrictEqual([
    { original: '1', squared: 1 },
    { original: '2', squared: 4 },
    { original: '3', squared: 9 },
    { original: '4', squared: 16 },
    { original: '5', squared: 25 },
  ]);
});

test('processIntegers handles empty array', () => {
  expect(processIntegers([])).toStrictEqual([]);
});

test('processIntegers handles negative value', () => {
  expect(processIntegers(['-2', '10'])).toStrictEqual([
    {
      original: '-2',
      squared: 4,
    },
    {
      original: '10',
      squared: 100,
    },
  ]);
});
