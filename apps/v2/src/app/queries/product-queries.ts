import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as productService from '../services/product-service';

const queryKey = 'products';

export const useProducts = () => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: ({ signal }) => productService.getProducts({ signal }),
  });
};

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [queryKey, productId],
    queryFn: ({ signal }) =>
      productService.getOneProduct(productId, { signal }),
    placeholderData: () =>
      queryClient
        .getQueryData<productService.Product[]>([queryKey])
        ?.find((prod) => prod._id === productId),
  });
};
