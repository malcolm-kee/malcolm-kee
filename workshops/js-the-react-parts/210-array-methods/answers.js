/**
 * Note that you can't copy paste the whole file because there are many duplicate
 * variable declaration. Copy paste the specific section for the question and try
 * it out.
 *
 * If there is any question, raise an issue to this repo!
 */

// Array.map exercise
const participants = [
  { name: 'Abu', ic: '880505-23-4955', gender: 'male' },
  { name: 'Mary', ic: '920505-10-9958', gender: 'female' },
  { name: 'T Chakra', ic: '900505-23-5775', gender: 'male' },
  { name: 'Suzi', ic: '880505-23-4958', gender: 'female' },
];

const allIcs = participants.map(participant => participant.ic);

// Array.filter exercise 1
const numbers = [3, -2, 1000, 201, 50, 100, 33, 50, -21];
const positiveNumbers = numbers.filter(num => num >= 0);
const oddNumbers = numbers.filter(num => num % 2 === 1);
const numLargerThanPrev = numbers.filter((num, index, allNums) => {
  if (index === 0) {
    return false;
  }
  return num > allNums[index - 1];
});

// Array.filter exercise 2
const participants = [
  { name: 'Abu', ic: '880505-23-4955', gender: 'male' },
  { name: 'Mary', ic: '920505-10-9958', gender: 'female' },
  { name: 'T Chakra', ic: '900505-23-5775', gender: 'male' },
  { name: 'Suzi', ic: '880505-23-4958', gender: 'female' },
];
const allIcs = participants.map(participant => participant.ic);
const allFemaleNames = participants
  .filter(participant => participant.gender === 'female')
  .map(participant => participant.name);

// Array.reduce exercise
const participants = [
  { name: 'Abu', gender: 'male', paid: true },
  { name: 'Mary', gender: 'female', paid: true },
  { name: 'T Chakra', gender: 'male', paid: false },
  { name: 'Suzi', gender: 'female', paid: true },
];

const participantsByPayStatus = participants.reduce(
  (group, participant) => {
    if (participant.paid) {
      return {
        paid: group.paid.concat(participant),
        unPaid: group.unPaid,
      };
    } else {
      return {
        unPaid: group.unPaid.concat(participant),
        paid: group.paid,
      };
    }
  },
  { paid: [], unPaid: [] }
);

// Array.forEach exercise
const participants = [
  { name: 'Abu', gender: 'male', paid: true },
  { name: 'Mary', gender: 'female', paid: true },
  { name: 'T Chakra', gender: 'male', paid: false },
  { name: 'Suzi', gender: 'female', paid: true },
];

const paid = [];
const unPaid = [];

const participantsByPayStatus = participants.forEach(participant => {
  if (participant.paid) {
    paid.push(participant);
  } else {
    unPaid.push(participant);
  }
});
