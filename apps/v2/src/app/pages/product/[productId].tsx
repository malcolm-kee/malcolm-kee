import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '~/components/icons';
import { Link } from '../../components/link';
import { NavBar } from '../../components/nav-bar';
import { ProductDetails } from '../../components/product-details';
import { productQueryOptions } from '../../queries/product-queries';
import {
  getOneProduct,
  getProducts,
  Product,
} from '../../services/product-service';
import { GetStaticData, StaticData } from '../../types';

export const getStaticData = async function getStaticData() {
  const products = await getProducts();

  const staticDataMap = new Map<
    string,
    StaticData & { params: { productId: string } }
  >();

  async function collectStaticData(productList: Product[]) {
    for (const product of productList) {
      staticDataMap.set(product._id, {
        params: {
          productId: product._id,
        },
        title: product.name,
        prefetchQueries: [
          {
            ...productQueryOptions.productDetails(product._id),
            getDependentQueries: (productData: Product) =>
              productData.related
                ? product.related.map((id) =>
                    productQueryOptions.productDetails(id)
                  )
                : [],
          },
        ],
      });

      if (product.related) {
        const unseenProducts = product.related.filter(
          (id) => !staticDataMap.has(id)
        );

        if (unseenProducts.length > 0) {
          const relatedProducts = await Promise.all(
            unseenProducts.map((id) => getOneProduct(id))
          );

          await collectStaticData(relatedProducts);
        }
      }
    }
  }

  await collectStaticData(products);

  return Array.from(staticDataMap.values());
} satisfies GetStaticData;

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <NavBar>
        <Link
          to="/product"
          animateNavigation
          className="inline-flex items-center gap-2 text-gray-500"
        >
          <ChevronLeftIcon className="w-5 h-5" /> Products
        </Link>
      </NavBar>
      <ProductDetails productId={productId!} />
    </div>
  );
}
