// == BASICS == //

/**
 * (1) x is a string as inferred by TypeScript
 */
// let x = "hello world";

/**
 * (2) reassignment is fine
 */
// x = "hello mars";

/**
 * (3) but it will error if we try to change type
 */
// x = 42;

/**
 * (4) let's look at const. The type is literally 'hello world'
 */
// const y = "hello world";

/**
 * This is called a 'string literal type'. y can never be reassigned since it's a const,
 * so we can regard it as only ever holding a value that's literally the string 'hello world'
 * and no other possible value
 */

/**
 * (5) sometimes we need to declare a variable without initializing it
 */
// let z;
// z = 41;
// z = "abc"; // (6) oh no! This isn't good

/**
 * If we look at the type of z, it's `any`. This is the most flexible type
 * in TypeScript (think of it like a JavaScript `let`)
 */

/**
 * (7) we could improve this situation by providing a type annotation
 * when we declare our variable
 */
// let zz: number;
// zz = 41;
// zz = "abc"; // 🚨 ERROR Type '"abc"' is not assignable to type 'number'.

export default {};
