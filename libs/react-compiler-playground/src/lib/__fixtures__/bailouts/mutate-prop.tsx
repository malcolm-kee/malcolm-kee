/**
 * Mutating a prop is a Rules of React violation that the compiler catches
 * statically. Unlike the impurity bailouts above, there's no surprise here
 * — the compiler refuses to emit any output and surfaces a clear error
 * message pointing at the offending assignment.
 *
 * The fix is to copy into a local before mutating: `const price = ... ;
 * if (discount) { price = price * (1 - discount); }`. The compiler is happy
 * with arbitrary mutation as long as the mutated value didn't come from props.
 */
type Product = { price: number; discount?: number };

export default function PriceTag({ product }: { product: Product }) {
  if (product.discount) {
    product.price = product.price * (1 - product.discount);
  }
  return <span>${product.price}</span>;
}
