import getPositions from './01.solution';

test('getPositions([2,3,2,6], 2) -> [0,2]', () => {
  expect(getPositions([2, 3, 2, 6], 2)).toStrictEqual([0, 2]);
});

test('getPositions([5,3,1], 6) -> []', () => {
  expect(getPositions([5, 3, 1], 6)).toStrictEqual([]);
});

test('getPositions([7,7,7], 7) -> [0,1,2]', () => {
  expect(getPositions([7, 7, 7], 7)).toStrictEqual([0, 1, 2]);
});
