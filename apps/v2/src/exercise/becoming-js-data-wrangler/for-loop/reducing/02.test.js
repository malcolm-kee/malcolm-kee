import getTotalCharacters from './02.solution';

test("getTotalCharacters(['a','b','c']) -> 3", () => {
  expect(getTotalCharacters(['a', 'b', 'c'])).toStrictEqual(3);
});

test("getTotalCharacters(['abc','def','ghi']) -> 9", () => {
  expect(getTotalCharacters(['abc', 'def', 'ghi'])).toStrictEqual(9);
});

test("getTotalCharacters(['', '12 ', ' 34']) -> 6", () => {
  expect(getTotalCharacters(['', '12 ', ' 34'])).toStrictEqual(6);
});
