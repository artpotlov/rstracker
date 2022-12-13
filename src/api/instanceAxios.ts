import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, keysLS } from '../shared/consts';
import { IUserData } from '../types/types';
import { getLSData } from '../utils/local-storage';

export const instanceAxios = (defaultConfig?: AxiosRequestConfig) => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
  };

  const userData = getLSData<IUserData>(keysLS.userData);

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
