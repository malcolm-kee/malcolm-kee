import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createMovieComment,
  deleteMovieComment,
  type CreateMovieCommentDto,
} from '../services/sdk';
import { movieQueryOptions } from './movie-queries';

export const useCreateMovieComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateMovieCommentDto) =>
      createMovieComment({ body, throwOnError: true }).then((res) => res.data),
    onSuccess: (_data, { movieId }) => {
      return queryClient.invalidateQueries({
        queryKey: movieQueryOptions.movieComments(movieId).queryKey,
      });
    },
  });
};

export const useDeleteMovieComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; movieId: string }) =>
      deleteMovieComment({
        path: { id },
        throwOnError: true,
      }).then((res) => res.data),
    onSuccess: (_data, { movieId }) => {
      return queryClient.invalidateQueries({
        queryKey: movieQueryOptions.movieComments(movieId).queryKey,
      });
    },
  });
};
