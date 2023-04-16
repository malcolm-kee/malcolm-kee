import applyDiscount from './05.solution';

test('applyDiscount(providedExamples)', () => {
  expect(
    applyDiscount([
      { id: 5, name: 'orange', price: 10 },
      { id: 20, name: 'banana', price: 100 },
    ])
  ).toStrictEqual([
    { id: 5, name: 'orange', price: 9 },
    { id: 20, name: 'banana', price: 90 },
  ]);
});

test('applyDiscount([])', () => {
  expect(applyDiscount([])).toStrictEqual([]);
});
