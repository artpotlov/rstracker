import { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../shared/consts';

export const defaultConfig = (authToken: string): AxiosRequestConfig => {
  return {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
};
