import { useLocation, Navigate } from 'react-router-dom';
import { pathRoutes } from 'router/router';

import { checkToken } from '../utils/checkToken';

interface Props {
  children: JSX.Element;
}

export function PageGuard({ children }: Props): JSX.Element {
  const location = useLocation();

  if (!checkToken()) {
    return <Navigate to={pathRoutes.welcome} state={{ from: location }} />;
  }

  return children;
}
