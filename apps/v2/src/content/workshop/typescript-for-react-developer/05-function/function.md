---
title: Functions in TypeScript
description: 'Learn how to annotate types for function parameters and returns.'
date: '2019-10-13'
updated_at: '2019-11-27'
objectives:
  - how to annotate types for function parameter and return type
  - how to annotate optional parameters
  - how to annotate rest parameters
  - how to overload function annotations
  - how to add TypeScript into a Create React App project
---

## Simple Function Annotations

```ts live
/* annotate parameter and return type */
function getSpamEmailTitle(name: string, promotion: string): string {
  return `Hi ${name.toUpperCase()}, act now before ${promotion} ends!`;
}

/* the arrow-function variant */
const getSpamTextMessage = (name: string, promotion: string): string =>
  `RM0. ${name.toUpperCase()}, grab ${promotion} before sold out!`;
```

## Using Type Alias

```ts live
interface WithPhoneNumber {
  name: string;
  phone: number;
}

interface WithEmail {
  name: string;
  email: string;
}

function sendEmail(to: WithEmail): { recipient: string; body: string } {
  return {
    recipient: `${to.name} <${to.email}>`, // Malcolm Kee <malcolm@example.com>
    body: "You're pre-qualified for the job!",
  };
}

const sendTextMessage = (to: WithPhoneNumber): { recipient: string; body: string } => {
  return {
    recipient: `${to.name} <${to.phone}>`,
    body: "You're pre-qualified for the job!",
  };
};

/* return types can almost always be inferred */
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
```

Even though function return type can be inferred, you may want to declare it explicitly to make sure your function implementation follow your expectation. My personal style is to declare return type if it is a large function (i.e. more than 5 lines). If it is a short function that just do simple computation, I will just let TypeScript do its magic.

## Optional and Rest Parameters

```ts live
/* use ? to indicate optional parameter */
// const validateEmail = (email: string, required?: boolean) => {
//   if (required) {
//     if (!email) {
//       return false;
//     }
//   }
//   if (email && !email.includes('@')) {
//     return false;
//   }
// }

/* default parameter would allows TypeScript to infer your parameter type */
// const logEvent = (msg: string, user = 'Anonymous') => {
//   console.log(`${msg} has been logged by ${user}`);
// };

/* rest params work just as you'd think. Type must be array-ish */
// const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0);
// console.log(sum(3, 4, 6)); // 13
```

## Function Overloading

```ts live
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
```

Even though overloading function is theoretically possible, but in practice I seldom use it because I perfer to have two separate functions instead of one function that behave differently based on parameter. The only time I need that is when the function need to handle dynamic data that is returned from an API.

## Adding TypeScript in a Create React App project

Before we start doing exercise on TypeScript, let's add TypeScript into our project.

1. Install required packages.

   ```bash
   yarn add -D typescript @types/react @types/react-dom @types/node @types/jest @types/classnames
   ```

   OR

   ```bash
   npm i -D typescript @types/react @types/react-dom @types/node @types/jest @types/classnames
   ```

2. Change any `.js` file to `.ts` and then start local development server. Create React App will add `tsconfig.json` into the project with default configuration. (You can add it manually by copy pasting from some sample project if you wish)

   ```bash
   yarn start
   ```

   Kill the server and rename back the file to `.ts`.

<aside>

What are those `@types/??` packages? They are the third-party libraries that are maintained by communities. We will discuss them in more details in a [coming section](/typescript-for-react-developer/using-third-party-types#using-types-from-typescript-and-libraries).

</aside>

Note: For brevity, going forwared I will only show the yarn version. Just change `yarn add` to `npm i` for equivalent command for npm.

<Exercise title="Do It: Convert JavaScript to TypeScript">

1. Rename `lib/format.js` to `lib/format.ts` and add required type declarations.
1. Rename `lib/typecheck.js` to `lib/typecheck.ts` and add required type declarations.
1. Rename `lib/camelize.js` to `lib/camelize.ts` and add required type declaration for the function.
1. Rename `lib/copy.js` to `lib/copy.ts` and add required type declaration for the function.
1. Rename `lib/id.js` to `lib/id.ts` and add required type declarations. Note that return type of `getId` function depends on the parameter. Declare the type such that the following code example with not cause type error:

   ```ts
   const numId = getId(true);
   console.log(numId * 10);

   const stringId = getId();
   console.log(stringId.toUpperCase());
   ```

</Exercise>
