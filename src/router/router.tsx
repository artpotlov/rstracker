import { createBrowserRouter } from 'react-router-dom';
import { App } from 'App';
import { WelcomePage } from 'pages/WelcomePage';
import { HomePage } from 'pages/HomePage';
import { BoardPage } from 'pages/BoardPage';
import { ErrorPage } from 'pages/ErrorPage';

export enum pathRoutes {
  welcome = '/',
  board = 'board',
  auth = 'auth',
  registration = 'registration',
  errorPath = '404',
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
        path: pathRoutes.board,
        element: <HomePage />,
      },
      {
        path: `${pathRoutes.board}/:id`,
        element: <BoardPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);
