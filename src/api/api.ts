import axios from 'axios';
import {
  TErrorResponse,
  TResponse,
  TUserRequest,
  TUserSuccess,
  TUserUpdateRequest,
} from '../types/types';
import { BASE_URL } from '../shared/consts';
import { handleError } from './handleError';

export const getAllUsers = async ({
  authToken,
}: Pick<TUserRequest, 'authToken'>): Promise<TResponse<TUserSuccess[], TErrorResponse>> => {
  try {
    const response = await axios({
      method: 'get',
      baseURL: BASE_URL,
      url: '/users',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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
      method: 'get',
      baseURL: BASE_URL,
      url: `/users/${userId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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
      method: 'put',
      baseURL: BASE_URL,
      url: `/users/${userId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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
      method: 'delete',
      baseURL: BASE_URL,
      url: `/users/${userId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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
