import { Outlet } from 'react-router-dom';

import { Navbar } from 'components';

export const Layout = () => {
  return (
    <div className="w-full bg-common-base font-lato text-common-light">
      <Navbar />
      <Outlet />
    </div>
  );
};
