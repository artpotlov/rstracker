import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../shared/consts';
import { IUserData } from '../types/types';
import { getLSData } from '../utils/local-storage';

export const instanceAxios = (defaultConfig?: AxiosRequestConfig) => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
  };

  const userData = getLSData<IUserData>('userData');

  if (userData && 'token' in userData) {
    config.headers = {
      Authorization: `Bearer ${userData.token}`,
    };
  }

  return axios.create({
    ...config,
    ...defaultConfig,
  });
};
