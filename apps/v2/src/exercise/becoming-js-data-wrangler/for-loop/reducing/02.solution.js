/**
 * Given an array of strings, return the total number of characters in all strings combined.
 *
 * Examples:
 * - texts: `['a','b','c']` -> `3`
 * - texts: `['abc','def','ghi']` -> `9`
 * - texts: `['', '12 ', ' 34']` -> `6`
 *
 * @param {string[]} texts
 */
export default function getTotalCharacters(texts) {
  let total = 0;
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    total += text.length;
  }
  return total;
}
