/**
 * * Union types
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
//         name: "Malcolm",
//         phone: 0174444444
//       }
//     : {
//         // or a HasEmail
//         name: "Malcolm",
//         email: "malcolm@example.com"
//       };

// contactInfo.name; // NOTE: we can only access the .name property  (the stuff HasPhoneNumber and HasEmail have in common)

/**
 * (15) Intersection types
 */
// let otherContactInfo: HasEmail & HasPhoneNumber = {
// //   we _must_ initialize it to a shape that's asssignable to HasEmail _and_ HasPhoneNumber
//   name: "Malcolm",
//   email: "malcolm@example.com",
//   phone: 01744444444
// };

// otherContactInfo.name; // NOTE: we can access anything on _either_ type
// otherContactInfo.email;
// otherContactInfo.phone;

export default {};
