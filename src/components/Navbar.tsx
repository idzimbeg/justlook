import { Link } from 'react-router-dom';

import { Favorites, Filter } from 'components';

export const Navbar = () => {
  return (
    <div className="mb-2 w-full py-6 sm:px-4 lg:px-16">
      <div className="grid lg:grid-cols-3">
        <Link to="/" className="mb-3 flex justify-center pt-2 lg:col-span-2 lg:mb-0 lg:justify-start">
          <div
            className="h-0 w-0 
            border-b-[15px] border-l-[15px]
            border-t-[15px] border-b-transparent
            border-l-common-yellow border-t-transparent"
          />
          <h2 className="text-2xl text-common-yellow">JustLook</h2>
        </Link>
        <div className="flex w-full justify-between">
          <Link to="/movies" className="flex w-1/4 justify-center pt-2">
            Discover
          </Link>
          <div className="flex">
            <Filter />
            <Favorites />
          </div>
        </div>
      </div>
    </div>
  );
};
