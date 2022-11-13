import { isExpired } from 'react-jwt';

import { getLSData, setLSData } from '../utils/local-storage';

import { IUserData } from '../types/types';

export function checkToken() {
  const userData = getLSData<IUserData>('userData');

  if (!userData) return;

  if (isExpired(userData.token)) setLSData<null>('userData', null);
}
