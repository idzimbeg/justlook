import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from 'components';
import { Home, Movies, MovieDescription } from 'routes';
import { Layout } from 'layout';

import 'style.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/movies',
        element: <Movies />,
      },
    ],
  },
  {
    path: `/`,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'movie/:movieId',
        element: <MovieDescription />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
