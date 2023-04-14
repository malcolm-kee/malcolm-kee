import excludeUndefined from './04.solution';

test(`excludeUndefined([1,3,undefined,0,12] -> [1,3,0,12]`, () => {
  expect(excludeUndefined([1, 3, undefined, 0, 12])).toStrictEqual([1, 3, 0, 12]);
});
test(`excludeUndefined([undefined, 'Pika', 'Charm', undefined, ''] -> ['Pika', 'Charm', '']`, () => {
  expect(excludeUndefined([undefined, 'Pika', 'Charm', undefined, ''])).toStrictEqual([
    'Pika',
    'Charm',
    '',
  ]);
});
test(`excludeUndefined([undefined, undefined] -> []`, () => {
  expect(excludeUndefined([undefined, undefined])).toStrictEqual([]);
});
