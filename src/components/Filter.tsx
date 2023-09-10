/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import { useMoviesSearch } from 'services';
import { cx } from 'helpers';
import { Movie } from 'types';

import { Spinner } from './Spinner';

export const Filter = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const { moviesCollectionData, isMoviesCollectionDataLoading } = useMoviesSearch(searchTitle, '', '');

  if (isMoviesCollectionDataLoading) return <Spinner />;

  return (
    <Combobox as="div" className="relative p-1">
      <Combobox.Input
        placeholder="Search movies"
        className="w-full rounded-md border-0 bg-common-passive py-1.5 pl-3 pr-10 text-common-light shadow-sm ring-1 ring-inset ring-common-passive focus:ring-2 focus:ring-inset focus:ring-common-active sm:text-sm sm:leading-6"
        onChange={(event) => setSearchTitle(event.target.value)}
        autoComplete="off"
        value={searchTitle}
      />
      <Combobox.Button
        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        type="submit"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </Combobox.Button>
      {moviesCollectionData && (
        <Combobox.Options className="absolute -left-12 z-50 mt-1 flex max-h-60 w-[calc(100%+10rem)] flex-col overflow-auto rounded-lg bg-common-base py-1 text-base shadow-lg focus:outline-none sm:w-[100%+0.5rem] sm:text-sm md:-left-36">
          {moviesCollectionData.map((movie: Movie) => (
            <Combobox.Option
              key={movie.id}
              value={movie}
              className={({ active }) =>
                cx(
                  'relative cursor-default select-none py-2 pl-8 pr-4',
                  active ? 'bg-common-active text-common-light' : 'text-common-light/60',
                )
              }
            >
              {({ selected }) => (
                <Link to={`movie/${movie.id}`} className={cx('block truncate', selected && 'font-semibold')}>
                  {movie.title}
                </Link>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  );
};
