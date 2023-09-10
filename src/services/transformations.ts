import { MovieItem, Movie } from 'types';

export const resToMovieItem = (res: any): MovieItem => {
  return {
    id: res.id,
    title: res.title ?? '',
  };
};

export const resToMovie = (res: any): Movie => {
  if (!res) return {} as Movie;
  return {
    id: res.id,
    poster_path: res.poster_path ?? '',
    title: res.title ?? '',
    vote_average: res.vote_average ?? 0,
    overview: res.overview ?? '',
    release_date: res.release_date ? res.release_date.split('-')[0] : '',
    genres: res.genres ?? [],
    revenue: res.revenue ? `${res.revenue.toLocaleString()}` : '',
    tagline: res.tagline ?? '',
    backdrop_path: res.backdrop_path ?? '',
  };
};
