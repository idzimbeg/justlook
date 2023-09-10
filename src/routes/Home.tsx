/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="bg-footer relative h-screen w-full bg-cover bg-center bg-no-repeat !px-0">
      <div className="absolute inset-0 mx-auto h-full w-full transform bg-gradient-to-b from-common-base/100 to-common-base/60" />
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <h1 className="z-50 text-3xl font-bold ">Movies</h1>
        <p className="z-50 ">Some text about movies</p>
        <div className="z-50 rounded-md bg-common-yellow py-3 hover:bg-common-yellow/80 ">
          <Link to="/movies" className="z-50  p-2 text-lg font-semibold text-white/80 hover:text-white">
            Discover Movies
          </Link>
        </div>
      </div>
    </div>
  );
};
