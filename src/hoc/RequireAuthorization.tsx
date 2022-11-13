import { useLocation, Navigate } from 'react-router-dom';

import { getLSData } from '../utils/local-storage';
import { checkToken } from '../api/checkToken';

import { IUserData } from '../types/types';

interface Props {
  children: JSX.Element;
}

export function RequireAuthorization({ children }: Props): JSX.Element {
  const location = useLocation();

  checkToken();

  const userData = getLSData<IUserData>('userData');

  if (!userData) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
