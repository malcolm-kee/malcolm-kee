import findOlderThan from './03.solution';

test('findOlderThan(40)', () => {
  expect(findOlderThan(40)).toStrictEqual([{ name: 'Richie', age: 50 }]);
});

test('findOlderThan(51)', () => {
  expect(findOlderThan(51)).toStrictEqual([]);
});

test('findOlderThan(30)', () => {
  expect(findOlderThan(30)).toStrictEqual([
    { name: 'Malcolm', age: 32 },
    { name: 'Richie', age: 50 },
  ]);
});
