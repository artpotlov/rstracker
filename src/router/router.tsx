import { createBrowserRouter } from 'react-router-dom';
import { App } from 'App';
import { WelcomePage } from 'pages/WelcomePage';
import { HomePage } from 'pages/HomePage';
import { BoardPage } from 'pages/BoardPage';
import { ErrorPage } from 'pages/ErrorPage';
import { SignPage } from 'pages/SignPage';
import { ProfilePage } from 'pages/ProfilePage';

export enum pathRoutes {
  welcome = '/',
  boards = 'boards',
  sign = 'sign',
  errorPath = '404',
  profile = 'profile',
}

const routes = [
  {
    path: pathRoutes.welcome,
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: pathRoutes.boards,
        element: <HomePage />,
      },
      {
        path: `${pathRoutes.boards}/:id`,
        element: <BoardPage />,
      },
      {
        path: pathRoutes.sign,
        element: <SignPage />,
      },
      {
        path: pathRoutes.profile,
        element: <ProfilePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes, { basename: '/' });
