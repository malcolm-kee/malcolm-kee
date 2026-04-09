import { HttpResponse, delay, type HttpHandler } from 'msw';
import { faker } from '@faker-js/faker';
import { createMswHandlers } from '../services/sdk/msw.gen';
import {
  addMovieComment,
  deleteMovieComment,
  getMovieComments,
  movieData,
} from './mock-movie-data';

const mock = createMswHandlers({
  baseUrl: 'https://ecomm-service.fly.dev',
});

export const handlers: Array<HttpHandler> = [
  mock.pick.getMovies({
    body: movieData,
  }),
  mock.pick.getMovie(async ({ params }) => {
    const movie = movieData.find((m) => m._id === params.movieId);

    if (movie) {
      await delay(faker.helpers.arrayElement([500, 2000]));
      return HttpResponse.json(movie);
    }

    return new HttpResponse(null, { status: 404 });
  }),
  mock.pick.listMovieComments(async ({ params }) => {
    await delay(1000);
    return HttpResponse.json(getMovieComments(params.movieId));
  }),
  mock.pick.createMovieComment(async ({ request }) => {
    const body = await request.clone().json();
    await delay(1500);

    return HttpResponse.json(addMovieComment(body));
  }),
  mock.pick.deleteMovieComment(async ({ params }) => {
    await delay(2000);
    const deletedComment = deleteMovieComment(params.id);

    if (deletedComment) {
      return HttpResponse.json(deletedComment);
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
