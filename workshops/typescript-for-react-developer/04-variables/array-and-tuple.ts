//== SIMPLE ARRAYS ==//

/**
 * * simple array types can be expressed using []
 */
// let luckyNumbers: number[] = [];
// luckyNumbers.push(33);
// luckyNumbers.push("abc"); // !ERROR

/**
 * * Array<> works too
 */
// const frameworks: Array<string> = [];
// frameworks.push('react');
// frameworks.push(true); // !ERROR

/**
 * * we can even define a tuple, a fixed length and specific type for each item
 */
// let address: [number, string, string, number] = [
//   123,
//   "Jalan Besar",
//   "Kuala Lumpur",
//   10110
// ];

// address = [1, 2, 3]; // !ERROR: Type 'number' is not assignable to type 'string'.

/**
 * (Tuple values often require type annotations (  : [number, number] )
 */
// const xx = [32, 31]; // number[];
// const yy: [number, number] = [32, 31];

export default {};
