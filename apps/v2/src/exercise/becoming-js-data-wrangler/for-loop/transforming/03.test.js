import addAgeTagging from './03.solution';

test('addAgeTagging(providedExamples)', () => {
  expect(
    addAgeTagging([
      {
        name: 'Malcolm',
        age: 32,
      },
      {
        name: 'Esther',
        age: 10,
      },
      {
        name: 'Richie',
        age: 50,
      },
      {
        name: 'Audrey',
      },
    ])
  ).toStrictEqual([
    {
      name: 'Malcolm',
      age: 32,
      isUnderage: false,
    },
    {
      name: 'Esther',
      age: 10,
      isUnderage: true,
    },
    {
      name: 'Richie',
      age: 50,
      isUnderage: false,
    },
    {
      name: 'Audrey',
      isUnderage: false,
    },
  ]);
});

test('addAgeTagging should forward all props', () => {
  expect(
    addAgeTagging([
      {
        fullName: 'Malcolm Kee',
        age: 33,
      },
    ])
  ).toStrictEqual([
    {
      fullName: 'Malcolm Kee',
      age: 33,
      isUnderage: false,
    },
  ]);
});

test('addAgeTagging should handle empty array', () => {
  expect(addAgeTagging([])).toStrictEqual([]);
});
