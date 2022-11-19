import { createBrowserRouter } from 'react-router-dom';
import { App } from 'App';
import { WelcomePage } from 'pages/WelcomePage';
import { HomePage } from 'pages/HomePage';
import { BoardPage } from 'pages/BoardPage';
import { ErrorPage } from 'pages/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: 'board',
        element: <HomePage />,
      },
      {
        path: 'board/:id',
        element: <BoardPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
