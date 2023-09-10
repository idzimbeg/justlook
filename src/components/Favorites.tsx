/* eslint-disable max-len */
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { MovieItem } from 'types';
import { useFavorites, cx } from 'helpers';

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <Menu as="div" className="relative z-40 inline-block p-1 text-left">
      <div className="">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-common-passive px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-black/20 hover:bg-black/80">
          Favorites
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-common-base shadow-lg ring-1 ring-black/20 ring-opacity-5 focus:outline-none">
          <div className="max-h-64 overflow-auto py-1">
            {favorites.length > 0 ? (
              favorites.map((movie: MovieItem) => (
                <Menu.Item key={movie.id}>
                  {({ active }: any) => (
                    <Link
                      to={`/movie/${movie.id}`}
                      className={cx(
                        active ? 'bg-common-active text-common-light' : 'text-common-light/60',
                        'block px-4 py-2 text-sm',
                      )}
                    >
                      {movie.title}
                    </Link>
                  )}
                </Menu.Item>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-common-light/60">No favorites yet</div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
