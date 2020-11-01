const pickPhone = person => ({
  phoneNumber: person.phone,
});

const multiply = (x, y) => x * y;

const multiplyCurry = x => y => x * y;

const multiplyAll = (...numbers) =>
  numbers.reduce((result, num) => result * num, 1);

const doubleAndMultiplyAll = factor => (...numbers) =>
  numbers.map(num => num * factor).reduce((result, num) => result * num, 1);
