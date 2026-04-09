import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import clsx from 'clsx';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { createBrowserRouter, Link, RouterProvider, useParams } from 'react-router-dom';
import { movieData } from './mock/mock-movie-data';
import { useCreateMovieComment, useDeleteMovieComment } from './queries/movie-mutations';
import { movieQueryOptions } from './queries/movie-queries';
import type { CreateMovieCommentDto, MovieCommentDto } from './services/sdk';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

export const getStaticPathsData = async (): Promise<
  Array<{ path: string | undefined; title: string }>
> => {
  return [
    { path: undefined, title: 'All movies' },
    ...movieData.map((m) => ({ path: m._id, title: m.title })),
  ];
};

export interface MovieAppProps {
  basename: string;
}

let mockingPromise: Promise<unknown> | undefined;

const startMocking = () => {
  if (!mockingPromise) {
    mockingPromise = import('./mock/browser').then(({ enableMocking }) => enableMocking());
  }
  return mockingPromise;
};

export const MovieApp = (props: MovieAppProps) => (
  <React.Suspense fallback={null}>
    <MovieAppRoot {...props} />
  </React.Suspense>
);

const MovieAppRoot = (props: MovieAppProps) => {
  React.use(startMocking());

  const [router] = React.useState(() =>
    createBrowserRouter(
      [
        { path: '/', element: <MovieListPage /> },
        { path: '/:movieId', element: <MovieDetailPage /> },
      ],
      { basename: props.basename }
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet titleTemplate="%s - Movies" defaultTitle="Movies" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const MovieListPage = () => {
  const { isLoading, data: movies } = useQuery(movieQueryOptions.movies());
  const [transitioningTo, setTransitioningTo] = React.useState('');

  return (
    <div className="mx-auto max-w-5xl">
      <Helmet>
        <title>All movies</title>
      </Helmet>
      <h1 className="mb-6 text-2xl font-bold">Movies</h1>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <li key={index}>
                <MovieCardSkeleton />
              </li>
            ))
          : movies?.map((movie) => (
              <li key={movie._id}>
                <Link
                  to={`/${movie._id}`}
                  onClick={() => setTransitioningTo(movie._id)}
                  className={clsx(
                    'block transition hover:opacity-100',
                    transitioningTo
                      ? transitioningTo === movie._id
                        ? 'scale-110'
                        : 'opacity-60'
                      : 'opacity-90'
                  )}
                >
                  <React.ViewTransition name={`movie-poster-${movie._id}`}>
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="aspect-[2/3] w-full rounded object-cover"
                    />
                  </React.ViewTransition>
                  <p className="mt-2 font-medium">{movie.title}</p>
                  <p className="text-sm text-gray-500">{movie.releaseDate}</p>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

const MovieCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[2/3] w-full rounded bg-gray-200" />
    <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
    <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
  </div>
);

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  if (!movieId) {
    return <p>Movie not found.</p>;
  }

  return <MovieDetailView movieId={movieId} />;
};

const MovieDetailView = ({ movieId }: { movieId: string }) => {
  const { data: movie, isLoading } = useSuspenseQuery(movieQueryOptions.movieDetails(movieId));

  return (
    <div className="mx-auto max-w-5xl">
      <Helmet>
        <title>{movie?.title ?? 'Movie'}</title>
      </Helmet>
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        ← All movies
      </Link>
      {isLoading && <MovieDetailSkeleton commentSection={<CommentSection movieId={movieId} />} />}
      {movie && (
        <article className="mt-4">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <React.ViewTransition name={`movie-poster-${movie._id}`}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="md:w-1/3 flex-shrink-0 rounded"
              />
            </React.ViewTransition>
            <div>
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="text-sm text-gray-500">{movie.releaseDate}</p>
              <p className="mt-4">{movie.overview}</p>
              {!isLoading && <CommentSection movieId={movieId} />}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

const MovieDetailSkeleton = (props: { commentSection?: React.ReactNode }) => (
  <div className="mt-4 animate-pulse">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="aspect-[2/3] md:w-1/3 flex-shrink-0 rounded bg-gray-200" />
      <div className="flex-1 space-y-3">
        <div className="h-8 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/4 rounded bg-gray-200" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>
        {props.commentSection}
      </div>
    </div>
  </div>
);

const CommentSkeleton = () => (
  <li className="flex animate-pulse items-start justify-between gap-4 rounded border border-gray-200 p-3">
    <div className="flex-1 space-y-2">
      <div className="h-4 w-1/3 rounded bg-gray-200" />
      <div className="h-4 w-5/6 rounded bg-gray-200" />
    </div>
    <div className="h-4 w-12 rounded bg-gray-200" />
  </li>
);

const CommentSection = (props: { movieId: string }) => {
  const commentsQuery = useQuery(movieQueryOptions.movieComments(props.movieId));
  const deleteCommentMutation = useDeleteMovieComment();
  const createCommentMutation = useCreateMovieComment();

  const [comments, setOptimisticComments] = React.useOptimistic(commentsQuery.data);
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold">Comments</h2>
      <MovieComments
        isLoading={commentsQuery.isLoading}
        comments={comments?.map((comment) => ({
          ...comment,
          isPending: !commentsQuery.data?.includes(comment),
        }))}
        onDeleteComment={async (comment) =>
          React.startTransition(async () => {
            setOptimisticComments((comments) => comments?.filter((c) => c._id !== comment._id));
            await deleteCommentMutation.mutateAsync({
              id: comment._id,
              movieId: comment.movieId,
            });
          })
        }
        isDeleting={deleteCommentMutation.isPending}
      />
      <AddMovieCommentForm
        movieId={props.movieId}
        isAdding={createCommentMutation.isPending}
        onAddComment={async (body) => {
          React.startTransition(async () => {
            setOptimisticComments((comments) => [
              ...(comments ?? []),
              {
                _id: `optimistic-${Date.now()}`,
                userId: 'optimistic',
                userName: 'You',
                ...body,
              },
            ]);
            await createCommentMutation.mutateAsync(body);
          });
        }}
      />
    </section>
  );
};

const MovieComments = ({
  isLoading,
  comments,
  onDeleteComment,
  isDeleting,
}: {
  isLoading: boolean;
  comments: (MovieCommentDto & { isPending?: boolean })[] | undefined;
  onDeleteComment: (comment: MovieCommentDto) => Promise<unknown>;
  isDeleting: boolean;
}) => {
  if (isLoading) {
    return (
      <ul className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <CommentSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">No comments yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li
          key={comment._id}
          className={clsx(
            'flex items-start justify-between gap-4 rounded border border-gray-200 p-3',
            comment.isPending && 'animate-pulse'
          )}
        >
          <div>
            <p className="text-sm font-medium">
              {comment.userName} <span className="text-gray-500">· {comment.rating}/10</span>
            </p>
            <p className="mt-1">{comment.content}</p>
          </div>
          {!comment.isPending && (
            <button
              type="button"
              onClick={() => onDeleteComment(comment)}
              disabled={isDeleting}
              className="text-sm text-red-600 hover:underline disabled:opacity-50"
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

const AddMovieCommentForm = ({
  movieId,
  onAddComment,
  isAdding,
}: {
  movieId: string;
  onAddComment: (body: CreateMovieCommentDto) => Promise<unknown>;
  isAdding: boolean;
}) => {
  const [rating, setRating] = React.useState(5);
  const [content, setContent] = React.useState('');

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onAddComment({ movieId, rating, content });
    setRating(5);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <label className="block">
        <span className="text-sm font-medium">Rating (0–10)</span>
        <input
          type="number"
          min={0}
          max={10}
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
          className="mt-1 block w-24 rounded border border-gray-300 px-2 py-1"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Comment</span>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          rows={3}
          className="mt-1 block w-full rounded border border-gray-300 px-2 py-1"
        />
      </label>
      <button
        type="submit"
        disabled={isAdding}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isAdding ? 'Posting...' : 'Post comment'}
      </button>
    </form>
  );
};
