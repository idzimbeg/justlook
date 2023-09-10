/* eslint-disable max-len */
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div className="relative h-screen bg-opacity-20 bg-error bg-cover">
      <div className="absolute left-0 top-0 h-full w-full transform bg-gradient-to-b from-common-base/100 to-common-base/40" />
      <div className="flex h-full flex-col items-center justify-center gap-8 text-common-light">
        <h1 className="z-50 text-4xl font-bold">Oops!</h1>
        <p className="z-50 ">Sorry, an unexpected error has occurred.</p>
        <p className="z-50 text-common-light/80 ">
          <i>{isRouteErrorResponse(error) ? error.error?.message || error.statusText : 'Unknown error message'}</i>
        </p>
      </div>
    </div>
  );
};
