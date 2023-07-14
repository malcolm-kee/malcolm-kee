import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as productService from '../services/product-service';

const queryKey = 'products';

export const productQueryOptions = {
  products() {
    return {
      queryKey: [queryKey],
      queryFn: ({ signal }: { signal?: AbortSignal }) => productService.getProducts({ signal }),
    };
  },
  productDetails(productId: string) {
    return {
      queryKey: [queryKey, productId],
      queryFn: ({ signal }: { signal?: AbortSignal }) =>
        productService.getOneProduct(productId, { signal }),
    };
  },
} as const;

export const useProducts = () => {
  return useQuery(productQueryOptions.products());
};

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...productQueryOptions.productDetails(productId),
    placeholderData: () =>
      queryClient
        .getQueryData<productService.Product[]>([queryKey])
        ?.find((prod) => prod._id === productId),
  });
};
