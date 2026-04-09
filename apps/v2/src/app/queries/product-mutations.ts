import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addProductComment,
  createProduct,
  deleteProduct,
  updateProduct,
  type CreateProductDto,
  type ProductCommentDto,
  type UpdateProductDto,
} from '../services/sdk';
import { productQueryOptions } from './product-queries';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateProductDto) =>
      createProduct({ body, throwOnError: true }).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productQueryOptions.products().queryKey,
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateProductDto }) =>
      updateProduct({
        path: { id },
        body,
        throwOnError: true,
      }).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productQueryOptions.products().queryKey,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteProduct({
        path: { id },
        throwOnError: true,
      }).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productQueryOptions.products().queryKey,
      });
    },
  });
};

export const useAddProductComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: ProductCommentDto }) =>
      addProductComment({
        path: { id },
        body,
        throwOnError: true,
      }).then((res) => res.data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: productQueryOptions.productDetails(id).queryKey,
      });
    },
  });
};
