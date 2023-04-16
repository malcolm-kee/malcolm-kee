/**
 * Returns an array that contains the original items in the dataset,
 * with each item is added with a `isUnderage` property, where person
 * with age < 18 would have `isUnderage: true`, otherwise would be
 * `false.
 *
 * An example of the dataset is
 *
 * ```js
 * const dataset = [
 *   {
 *     name: 'Malcolm',
 *     age: 32,
 *   },
 *   {
 *     name: 'Esther',
 *     age: 10,
 *   },
 *   {
 *     name: 'Richie',
 *     age: 50,
 *   },
 *   {
 *     name: 'Audrey',
 *   }
 * ];
 * ```
 *
 * When the example is provided to the function,
 * it should returns:
 * ```js
 * [
 *   {
 *     name: 'Malcolm',
 *     age: 32,
 *     isUnderage: false
 *   },
 *   {
 *     name: 'Esther',
 *     age: 10,
 *     isUnderage: true
 *   },
 *   {
 *     name: 'Richie',
 *     age: 50,
 *     isUnderage: false
 *   },
 *   {
 *     name: 'Audrey',
 *     isUnderage: false
 *   },
 * ]
 * ```
 */
export default function addAgeTagging(dataset) {
  // TODO
}
