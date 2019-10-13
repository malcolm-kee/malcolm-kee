// == BASICS == //

/**
 * * x is a string (inferred)
 */
// let x = "hello js";

/**
 * * reassignment is fine
 */
// x = "hello ts";

/**
 * * but it will error if we try to change type
 */
// x = 42; // !error

/**
 * * let's look at const. The type is literally 'hello'
 */
// const y = "hello";

/**
 * This is called a 'string literal type'. y can never be reassigned since it's a const,
 * so we can regard it as only ever holding a value that's literally the string 'hello world'
 * and no other possible value
 */
// if (y === 'whurt') {} // !this check is unnecessary

/**
 * * sometimes we need to declare a variable without initializing it
 */
// let z;
// z = 41;
// z = "abc"; // oh no! TypeScript didn't error

/**
 * If we look at the type of z, it's `any`. This is the most flexible type
 * in TypeScript
 */

/**
 * we could improve this situation by providing a type annotation
 * when we declare our variable
 */
// let zz: number;
// zz = 41;
// zz = "abc"; // !ERROR, yay!

export default {};
