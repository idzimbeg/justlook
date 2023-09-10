import React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from 'components';
import { CardProps } from 'types';
import { cx } from 'helpers';

import { FavoriteButton } from './FavoriteButton';

export const Card: React.FC<CardProps> = ({
  id,
  title,
  status,
  poster,
  backdrop,
  className,
  release_date,
  vote_average,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <div className={cx('group/card relative flex aspect-[2/1] w-full rounded-xl border-2 border-none', className)}>
      {typeof status !== 'number' && (
        <FavoriteButton toggleFavorite={toggleFavorite} isFavorite={isFavorite} title={title} id={id} backdrop={backdrop} />
      )}
      {status && (
        <>
          <h1
            className={cx(
              'pointer-events-none absolute text-sm font-semibold ',
              typeof status !== 'number'
                ? 'left-20 top-0 z-50 text-xs sm:left-52 sm:top-8 sm:text-lg'
                : 'left-24 top-2 z-50 truncate text-xs sm:left-20 md:text-sm',
            )}
          >
            {title}
          </h1>
          <div
            className={cx(
              'absolute z-20 flex flex-col text-xs',
              backdrop ? 'xs:top-32 xs:left-40 left-20 top-8 sm:left-52 sm:top-16' : 'bottom-12 left-24 md:bottom-6 md:left-20',
            )}
          >
            <p className="ml-1 md:mb-2 md:mt-1">({release_date && release_date.split('-')[0]})</p>
            <p className="whitespace-nowrap">
              {backdrop && <>🍿</>}
              {vote_average && (Math.round(vote_average * 10) / 10).toFixed(1)} / 10
            </p>
          </div>
        </>
      )}
      <Link to={`/movie/${id}`} className="right-0 z-10 flex h-full w-full flex-col items-end text-white">
        {status && typeof status === 'string' && <Badge title={status} />}
        {typeof status === 'number' && (
          <h5 className="text-bold absolute -left-9 top-1 text-[5rem] text-common-status">{status}</h5>
        )}
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          className={cx(
            'z-30 h-full rounded-md bg-cover transition-opacity duration-300 ease-in-out group-hover/card:opacity-80',
            status && typeof status === 'number' ? 'h-32 sm:h-24' : 'w-full',
            backdrop ? 'absolute left-0 w-1/3' : 'object-fit absolute left-0',
          )}
        />
        <div
          className={cx(
            'absolute inset-0 rounded-md ',
            status && typeof status === 'number' ? 'h-32 sm:h-24' : 'w-full bg-black/30',
          )}
        />
      </Link>
    </div>
  );
};
