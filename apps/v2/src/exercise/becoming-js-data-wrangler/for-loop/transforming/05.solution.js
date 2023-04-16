/**
 * Given an array of object representing products, where
 * each object has `id`, `name`, and `price` property,
 * returns a new array of objects with a discounted price
 * by applying a 10% discount.
 *
 * Example:
 *
 * Given `products` is:
 *
 * ```js
 * [{id: 5, name: 'orange', price: 10}, {id: 20, name: 'banana', price: 100}]
 * ```
 *
 * the function should returns:
 *
 * ```js
 * [
 *   {
 *     id: 5,
 *     name: 'orange',
 *     price: 9
 *   },
 *   {
 *     id: 20,
 *     name: 'banana',
 *     price: 90
 *   }
 * ]
 * ```
 */
export default function applyDiscount(products) {
  const result = [];

  for (const product of products) {
    result.push({
      ...product,
      price: product.price * 0.9,
    });
  }

  return result;
}
