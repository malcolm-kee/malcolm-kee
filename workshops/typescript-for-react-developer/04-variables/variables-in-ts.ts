//== SIMPLE ARRAYS ==//

/**
 * (8) simple array types can be expressed using []
 */
// let aa: number[] = [];
// aa.push(33);
// aa.push("abc"); // 🚨 ERROR: Argument of type '"abc"' is not assignable to parameter of type 'number'.

/**
 * (9) we can even define a tuple, which has a fixed length
 */
// let bb: [number, string, string, number] = [
//   123,
//   "Fake Street",
//   "Nowhere, USA",
//   10110
// ];

// bb = [1, 2, 3]; // 🚨 ERROR: Type 'number' is not assignable to type 'string'.

/**
 * (10) Tuple values often require type annotations (  : [number, number] )
 */
// const xx = [32, 31]; // number[];
// const yy: [number, number] = [32, 31];

//== OBJECTS ==//

/**
 * (11) object types can be expressed using {} and property names
 */
// let cc: { houseNumber: number; streetName: string };
// cc = {
//   streetName: "Fake Street",
//   houseNumber: 123
// };

// cc = {
//   houseNumber: 33
// };
/**
 * 🚨 Property 'streetName'
 * 🚨   is missing in type   '{ houseNumber: number; }'
 * 🚨   but required in type '{ houseNumber: number; streetName: string; }'.
 */

/**
 * (12) You can use the optional operator (?) to
 * indicate that something may or may not be there
 */
// let dd: { houseNumber: number; streetName?: string };
// dd = {
//   houseNumber: 33
// };

// (13) if we want to re-use this type, we can create an interface
// interface Address {
//   houseNumber: number;
//   streetName?: string;
// }
// // and refer to it by name
// let ee: Address = { houseNumber: 33 };

//== UNION & INTERSECTION ==//

/**
 * (14) Union types
 * Sometimes we have a type that can be one of several things
 */

// export interface HasPhoneNumber {
//   name: string;
//   phone: number;
// }

// export interface HasEmail {
//   name: string;
//   email: string;
// }

// let contactInfo: HasEmail | HasPhoneNumber =
//   Math.random() > 0.5
//     ? {
//         // we can assign it to a HasPhoneNumber
//         name: "Mike",
//         phone: 3215551212
//       }
//     : {
//         // or a HasEmail
//         name: "Mike",
//         email: "mike@example.com"
//       };

// contactInfo.name; // NOTE: we can only access the .name property  (the stuff HasPhoneNumber and HasEmail have in common)

/**
 * (15) Intersection types
 */
// let otherContactInfo: HasEmail & HasPhoneNumber = {
//   // we _must_ initialize it to a shape that's asssignable to HasEmail _and_ HasPhoneNumber
//   name: "Mike",
//   email: "mike@example.com",
//   phone: 3215551212
// };

// otherContactInfo.name; // NOTE: we can access anything on _either_ type
// otherContactInfo.email;
// otherContactInfo.phone;
// const zzz: any = {} as never;

export default {};
