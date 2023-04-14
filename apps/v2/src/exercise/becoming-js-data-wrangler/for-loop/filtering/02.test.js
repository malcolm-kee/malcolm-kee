import positiveOnly from './02.solution';

test('positiveOnly([2,-3,4,-6]) -> [2,4]', () => {
  expect(positiveOnly([2, -3, 4, -6])).toStrictEqual([2, 4]);
});

test('positiveOnly([-2,0,-20,-300]) -> []', () => {
  expect(positiveOnly([-2, 0, -20, -300])).toStrictEqual([]);
});

test('positiveOnly([12,4,3]) -> [12,4,3]', () => {
  expect(positiveOnly([12, 4, 3])).toStrictEqual([12, 4, 3]);
});
