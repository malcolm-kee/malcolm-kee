import computeSum from './01.solution';

test('computeSum([2,-3,4,-6]) -> -3', () => {
  expect(computeSum([2, -3, 4, -6])).toStrictEqual(-3);
});

test('computeSum([-2,0,-20,-300]) -> -322', () => {
  expect(computeSum([-2, 0, -20, -300])).toStrictEqual(-322);
});

test('computeSum([12,4,3]) -> 19', () => {
  expect(computeSum([12, 4, 3])).toStrictEqual(19);
});
