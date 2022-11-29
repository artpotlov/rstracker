import { ITokenData } from '../types/types';

export const getJWTPayloadData = (token: string): ITokenData => {
  const payloadStr = token.split('.')[1];
  return JSON.parse(window.atob(payloadStr));
};
