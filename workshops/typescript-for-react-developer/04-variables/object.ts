/**
 * * object types can be expressed using {} and property names
 */
// let address: { houseNumber: number; streetName: string };
// address = {
//   streetName: "Fake Street",
//   houseNumber: 123
// };

// address = {
//   houseNumber: 33
// }; // !Error: Property 'streetName' is missing

/**
 * * You can use the optional operator (?) to indicate that something may or may not be there
 */
// let add: { houseNumber: number; streetName?: string };
// add = {
//   houseNumber: 33
// };

// * Use `interface` to reuse object type
// interface Address {
//   houseNumber: number;
//   streetName?: string;
// }
// * and refer to it by name
// let ee: Address = { houseNumber: 33 };

export default {};
