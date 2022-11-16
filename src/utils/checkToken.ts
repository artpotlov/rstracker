import { getLSData, setLSData } from './local-storage';

import { IUserData, ITokenData } from '../types/types';

function getJWTPayloadData(token: string) {
  const payloadStr = token.split('.')[1];
  const decodedPayload: ITokenData = JSON.parse(window.atob(payloadStr));

  Object.defineProperty(decodedPayload, 'isExpired', {
    value: () => {
      return decodedPayload.exp * 1000 < Date.now();
    },
  });

  return decodedPayload;
}

export function checkToken() {
  const userData = getLSData<IUserData>('userData');

  if (!userData) {
    return false;
  }

  if (getJWTPayloadData(userData.token).isExpired()) {
    setLSData<null>('userData', null);
    return false;
  }

  return true;
}
