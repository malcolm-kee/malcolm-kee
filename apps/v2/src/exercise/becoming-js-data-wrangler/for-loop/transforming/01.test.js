import multiplyAll from './01.solution';

test('multiplyAll([2,3,2,6], 2) -> [4,6,4,12]', () => {
  expect(multiplyAll([2, 3, 2, 6], 2)).toStrictEqual([4, 6, 4, 12]);
});

test('multiplyAll([5,3,1], 6) -> [30,18,6]', () => {
  expect(multiplyAll([5, 3, 1], 6)).toStrictEqual([30, 18, 6]);
});

test('multiplyAll([7,7,7], 7) -> [49,49,49]', () => {
  expect(multiplyAll([7, 7, 7], 7)).toStrictEqual([49, 49, 49]);
});
