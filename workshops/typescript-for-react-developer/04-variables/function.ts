// interface WithPhoneNumber {
//     name: string;
//     phone: number;
// }

// interface WithEmail {
//     name: string;
//     email: string;
// }

// * function arguments and return values can have type annotations
// function sendEmail(to: WithEmail): { recipient: string; body: string } {
//   return {
//     recipient: `${to.name} <${to.email}>`, // Malcolm Kee <malcolm@example.com>
//     body: "You're pre-qualified for the job!"
//   };
// }

// * the arrow-function variant
// const sendTextMessage = (
//   to: WithPhoneNumber
// ): { recipient: string; body: string } => {
//   return {
//     recipient: `${to.name} <${to.phone}>`,
//     body: "You're pre-qualified for the job!"
//   };
// };

// * return types can almost always be inferred
// function getNameParts(contact: { name: string }) {
//   const parts = contact.name.split(/\s/g); // split @ whitespace
//   if (parts.length < 2) {
//     throw new Error(`Can't calculate name parts from name "${contact.name}"`);
//   }
//   return {
//     first: parts[0],
//     middle:
//       parts.length === 2
//         ? undefined
//         : // everything except first and last
//           parts.slice(1, parts.length - 2).join(" "),
//     last: parts[parts.length - 1]
//   };
// }

// * rest params work just as you'd think. Type must be array-ish
// const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0);
// console.log(sum(3, 4, 6)); // 13

// * we can even provide multiple function signatures
// "overload signatures"
// function contactPeople(method: "email", ...people: WithEmail[]): void;
// function contactPeople(method: "phone", ...people: WithPhoneNumber[]): void;

// * function implementation
// function contactPeople(
//   method: "email" | "phone",
//   ...people: (WithEmail | WithPhoneNumber)[]
// ): void {
//   if (method === "email") {
//     (people as WithEmail[]).forEach(sendEmail);
//   } else {
//     (people as WithPhoneNumber[]).forEach(sendTextMessage);
//   }
// }

// * email works
// contactPeople("email", { name: "foo", email: "" });

// * phone works
// contactPeople("phone", { name: "foo", phone: 12345678 });

// ! mixing does not work
// contactPeople("email", { name: "foo", phone: 12345678 });

export default {};