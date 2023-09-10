import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Movie } from 'types';

export const getTopMovies = (topRated: any, isLoading: boolean) => {
  if (!topRated || isLoading) {
    return { topMovies: [], ratings: [] };
  }

  const ratings = topRated.results.map((movie: Movie) => movie.vote_average);

  const topMovies = topRated.results
    .map((movie: Movie, index: number) => ({ movie, rating: ratings[index] }))
    .sort((a: any, b: any) => b.rating - a.rating)
    .slice(0, 3);

  return { topMovies, ratings };
};

export const cx = (...arg: ClassValue[]) => {
  return twMerge(clsx(...arg));
};
