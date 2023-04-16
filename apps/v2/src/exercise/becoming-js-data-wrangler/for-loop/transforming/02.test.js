import getPersonsSummary from './02.solution';

test('getPersonsSummary(providedExamples)', () => {
  expect(
    getPersonsSummary([
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
  ).toStrictEqual(['Malcolm, aged 32', 'Esther, aged 10', 'Richie, aged 50', 'Audrey']);
});

test('getPersonsSummary(newExamples)', () => {
  expect(
    getPersonsSummary([
      {
        name: 'Audrey',
      },
    ])
  ).toStrictEqual(['Audrey']);
});

test('getPersonsSummary([])', () => {
  expect(getPersonsSummary([])).toStrictEqual([]);
});
