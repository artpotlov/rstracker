import { useLocation, Navigate } from 'react-router-dom';

import { checkToken } from '../utils/checkToken';

interface Props {
  children: JSX.Element;
}

export function PageGuard({ children }: Props): JSX.Element {
  const location = useLocation();

  if (!checkToken()) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
