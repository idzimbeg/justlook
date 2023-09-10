/* eslint-disable max-len */
import { useParams } from 'react-router-dom';

import { FavoriteButton, Spinner } from 'components';
import { cx, useFavorites } from 'helpers';
import { useMovieById } from 'services';

export const MovieDescription = () => {
  const { movieId } = useParams();
  const { movieData, isLoading: isMovieLoading } = useMovieById(movieId);
  const { isFavorite, toggleFavorite } = useFavorites();

  const isLoading = isMovieLoading;

  if (isLoading) return <Spinner />;

  const { title, id } = movieData;

  return (
    <div className="min-h-96 relative -mb-32 w-full">
      <div className="absolute inset-0 mx-auto h-full w-full transform bg-gradient-to-t from-common-base/100 to-common-base/10" />
      {movieData.backdrop_path ? (
        <img
          alt={`${movieData.title}`}
          src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
          className="hidden h-96 w-full rounded-md object-fill md:block"
        />
      ) : (
        <img
          alt="Fallback"
          src={`${process.env.PUBLIC_URL}/image/popcorn.jpg`}
          className="hidden h-96 w-full rounded-md object-fill md:block"
        />
      )}
      <div className="container absolute left-0 right-0 top-2 h-full w-full transform rounded-2xl sm:left-5 md:left-1/2 md:top-52 md:w-[90%] md:-translate-x-1/2">
        <div className="z-20 grid rounded-3xl  bg-common-base md:mx-auto md:grid-cols-2 md:gap-1 md:px-4">
          <figure className="relative w-full md:py-4">
            <img
              alt={`${movieData.title}`}
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              className="relative h-[calc(100%-10rem)] w-full rounded-md object-fill"
            />
            <FavoriteButton
              id={id}
              title={title}
              backdrop={false}
              isFavorite={isFavorite}
              toggleFavorite={() => toggleFavorite({ id, title })}
              buttonClassName="absolute h-10 w-[90%] bottom-0 z-20 flex items center justify-center"
              iconClassName="w-12 absolute top-0 right-10 md:top-3 md:right-6"
            />
          </figure>

          <div className="-mt-32 mb-10 flex flex-col px-6 md:mb-0 md:mt-0 md:py-4">
            <div className="flex items-center justify-between gap-6 align-baseline">
              <div className="flex flex-col justify-between gap-2 md:flex-row">
                <h1 className="text-3xl font-semibold">{movieData.title}</h1>
                <p className="pt-1 text-2xl text-white/60">({movieData.release_date})</p>
              </div>
            </div>
            <div className="mb-6 w-full pt-2">
              <h3>{movieData.tagline}</h3>
            </div>
            <div
              className={cx(
                'flex flex-col md:justify-between',
                movieData.genres.length > 2 ? 'gap-1 md:flex-col' : 'md:flex-row',
              )}
            >
              <ul className="mr-10 flex md:mr-0">
                {movieData.genres.map((genre) => (
                  <li key={genre.id} className="mr-2 flex items-center justify-center rounded-xl bg-common-yellow align-middle">
                    <p className="px-2 py-1 text-center text-common-base">{genre.name}</p>
                  </li>
                ))}
              </ul>
              <div className="flex pt-2 text-center md:pt-0">
                <p className="text-10">🍿</p>
                <p className="mr-2 pt-1 text-sm">{(Math.round(movieData.vote_average * 10) / 10).toFixed(1)} / 10</p>
                {movieData.revenue && movieData.revenue != null && (
                  <>
                    <p className="text-10">💲</p>
                    <p className="pt-1 text-sm">{movieData.revenue}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col pt-12">
              <h3 className="mb-2 text-2xl">Synopsis</h3>
              <p>{movieData.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
