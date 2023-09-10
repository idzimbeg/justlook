/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */

import React from 'react';

import { usePopularMovies, useNowPlayingMovies, useTopRatedMovies, useSearchMovieByGenre } from 'services';
import { Slider, MovieGrid, Spinner } from 'components';
import { getTopMovies, useFavorites } from 'helpers';

export const Movies: React.FC = () => {
  const { popularMovies, isLoading } = usePopularMovies();
  const { nowPlaying } = useNowPlayingMovies();
  const { topRated } = useTopRatedMovies();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { moviesByGenre } = useSearchMovieByGenre(35);

  const { topMovies } = getTopMovies(topRated, isLoading);
  const { topMovies: topPopularMovies } = getTopMovies(popularMovies, isLoading);
  const { topMovies: topNowPlaying } = getTopMovies(nowPlaying, isLoading);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'short' });

  if (isLoading) return <Spinner />;

  return (
    <>
      {/* section Movie sliders */}
      <div className="mb-2 flex gap-4 px-4 py-6 md:px-16">
        <h1 className="text-2xl font-bold md:text-5xl">Discover daily</h1>
        <div className="flex flex-col justify-center rounded-md">
          <div className="rounded-t-md bg-common-red px-4 text-sm font-semibold">{month}</div>
          <div className="font-semi-bold rounded-b-md bg-white px-3 text-center text-2xl text-black">{day}</div>
        </div>
      </div>

      <div className="mb-2 grid w-full grid-cols-1 gap-2 px-2 lg:grid-cols-2 lg:gap-10 lg:px-14">
        <Slider
          data={nowPlaying}
          title="Trending now"
          status="Trending now"
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          className="w-full"
          backdrop
          cardClassName="w-full h-full md:h-56"
          customBreakpoints={{
            640: {
              width: 640,
              slidesPerView: 1.1,
            },
            768: {
              width: 768,
              slidesPerView: 1.3,
            },
          }}
        />
        <Slider
          data={topRated}
          title="Popular"
          status="Popular"
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          className="w-full"
          backdrop
          cardClassName="md:w-full h-full md:h-56"
          customBreakpoints={{
            640: {
              width: 640,
              slidesPerView: 1.1,
            },
            768: {
              width: 768,
              slidesPerView: 1.5,
            },
          }}
        />
      </div>
      {/* EOF section Movie sliders */}

      {/* section Top rated */}
      <div className="mb-2 flex gap-4 px-4 py-6 md:px-16">
        <h1 className="text-3xl font-bold">Today Top List</h1>
      </div>
      <MovieGrid
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
        data={[{ results: topMovies }, { results: topNowPlaying }, { results: topPopularMovies }]}
        backdrop={false}
        title="Top rated"
        className="mb-8"
      />
      {/* EOF section Top rated */}

      <div className="flex gap-4 px-4 md:px-16">
        <h1 className="my-4 text-3xl font-bold">Recommended Genres: Comedy</h1>
      </div>
      <div className="flex px-12">
        <Slider
          data={moviesByGenre}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          className="m-0 mb-6 p-0"
          cardClassName="md:h-72 h-56"
          backdrop={false}
          customBreakpoints={{
            640: {
              width: 640,
              slidesPerView: 3,
            },
            900: {
              width: 900,
              slidesPerView: 4,
            },
          }}
        />
      </div>
      <div className="flex gap-4 px-4 md:px-16">
        <h1 className="my-4 text-3xl font-bold">Popular Movies</h1>
      </div>
      <div className="mb-16 flex px-12">
        <Slider
          data={popularMovies}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          className="m-0 mb-6 p-0"
          cardClassName="h-56 md:h-72"
          backdrop={false}
          customBreakpoints={{
            600: {
              width: 600,
              slidesPerView: 3,
            },
            900: {
              width: 900,
              slidesPerView: 4,
            },
          }}
        />
      </div>

      {/* Section Footer */}
      <div className="bg-footer absolute mx-auto flex h-96 w-full bg-cover bg-center bg-no-repeat">
        <div className="absolute left-0 top-0 mx-auto h-full w-full transform bg-gradient-to-b from-common-base/100 to-common-base/60 p-4" />
        <div className="z-50 flex h-full w-full flex-col items-center justify-center gap-4 text-center">
          <p className="text-[100px]">👋</p>
          <h2 className="text-3xl font-bold">Hasta la vista, baby!</h2>
          <p className="text-xl font-semibold">Still did not find what you are looking for?</p>
        </div>
      </div>
      {/* EOF Section Footer */}
    </>
  );
};
