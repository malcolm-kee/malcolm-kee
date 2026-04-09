import { queryOptions } from '@tanstack/react-query';
import { getMovie, getMovies, listMovieComments, listMovies } from '../services/sdk';

const queryKey = 'movies';

export const movieQueryOptions = {
  movies() {
    return queryOptions({
      queryKey: [queryKey],
      queryFn: ({ signal }) => getMovies({ signal, throwOnError: true }).then((res) => res.data),
    });
  },
  movieList(params?: { page?: number; limit?: number; search?: string }) {
    return queryOptions({
      queryKey: [queryKey, 'list', params],
      queryFn: ({ signal }) =>
        listMovies({ query: params, signal, throwOnError: true }).then((res) => res.data),
    });
  },
  movieDetails(movieId: string) {
    return queryOptions({
      queryKey: [queryKey, movieId],
      queryFn: ({ signal }) =>
        getMovie({ path: { movieId }, signal, throwOnError: true }).then((res) => res.data),
    });
  },
  movieComments(movieId: string) {
    return queryOptions({
      queryKey: [queryKey, movieId, 'comments'],
      queryFn: ({ signal }) =>
        listMovieComments({ path: { movieId }, signal, throwOnError: true }).then(
          (res) => res.data
        ),
    });
  },
} as const;
