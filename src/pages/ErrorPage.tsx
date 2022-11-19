import { useLocation, Navigate } from 'react-router-dom';
import { pathRoutes } from 'router/router';

export const ErrorPage = () => {
  const { pathname } = useLocation();

  if (pathname !== `/${pathRoutes.errorPath}`) {
    return <Navigate to={pathRoutes.errorPath} state={{ from: location }} />;
  }

  return <div>Error Page</div>;
};
