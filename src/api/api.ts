import axios, { AxiosRequestConfig } from 'axios';
import {
  TErrorResponse,
  TResponse,
  TUserRequest,
  TUserSuccess,
  TUserUpdateRequest,
} from '../types/types';
import { BASE_URL } from '../shared/consts';
import { handleError } from './handleError';

const defaultConfig = (authToken: string): AxiosRequestConfig => {
  return {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
};

export const getAllUsers = async ({
  authToken,
}: Pick<TUserRequest, 'authToken'>): Promise<TResponse<TUserSuccess[], TErrorResponse>> => {
  try {
    const response = await axios({
      ...defaultConfig(authToken),
      method: 'get',
      url: '/users',
    });

    return {
      statusResponse: 'success',
      data: response.data,
    };
  } catch (error) {
    return {
      statusResponse: 'error',
      data: handleError(error),
    };
  }
};

export const getUserById = async ({
  authToken,
  userId,
}: TUserRequest): Promise<TResponse<TUserSuccess, TErrorResponse>> => {
  try {
    const response = await axios({
      ...defaultConfig(authToken),
      method: 'get',
      url: `/users/${userId}`,
    });

    return {
      statusResponse: 'success',
      data: response.data,
    };
  } catch (error) {
    return {
      statusResponse: 'error',
      data: handleError(error),
    };
  }
};

export const updateUserById = async ({
  authToken,
  userId,
  ...userData
}: TUserUpdateRequest): Promise<TResponse<TUserSuccess, TErrorResponse>> => {
  try {
    const response = await axios({
      ...defaultConfig(authToken),
      method: 'put',
      url: `/users/${userId}`,
      data: userData,
    });

    return {
      statusResponse: 'success',
      data: response.data,
    };
  } catch (error) {
    return {
      statusResponse: 'success',
      data: handleError(error),
    };
  }
};

export const deleteUserById = async ({
  authToken,
  userId,
}: TUserRequest): Promise<TResponse<TUserSuccess, TErrorResponse>> => {
  try {
    const response = await axios({
      ...defaultConfig(authToken),
      method: 'delete',
      url: `/users/${userId}`,
    });

    return {
      statusResponse: 'success',
      data: response.data,
    };
  } catch (error) {
    return {
      statusResponse: 'error',
      data: handleError(error),
    };
  }
};
