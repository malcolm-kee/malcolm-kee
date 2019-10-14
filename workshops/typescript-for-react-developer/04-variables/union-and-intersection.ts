/**
 * * Union types
 * Sometimes we have a type that can be one of several things
 */

// interface WithPhoneNumber {
//   name: string;
//   phone: number;
// }

// interface WithEmail {
//   name: string;
//   email: string;
// }

// let contactInfo: WithPhoneNumber | WithEmail =
//   Math.random() > 0.5
//     ? {
//         // we can assign it to a HasPhoneNumber
//         name: "Malcolm",
//         phone: 60174444444
//       }
//     : {
//         // or a HasEmail
//         name: "Malcolm",
//         email: "malcolm@example.com"
//       };

// contactInfo.name; // NOTE: we can only access the .name property  (the stuff HasPhoneNumber and HasEmail have in common)

/**
 * * Intersection types
 */
// let otherContactInfo: WithPhoneNumber & WithEmail = {
// //   we _must_ initialize it to a shape that's asssignable to HasEmail _and_ HasPhoneNumber
//   name: "Malcolm",
//   email: "malcolm@example.com",
//   phone: 601744444444
// };

// otherContactInfo.name; // NOTE: we can access anything on _either_ type
// otherContactInfo.email;
// otherContactInfo.phone;

export default {};
