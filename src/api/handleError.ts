import { TErrorResponse } from '../types/types';
import axios from 'axios';

export const handleError = (error: unknown): TErrorResponse => {
  if (axios.isAxiosError<TErrorResponse>(error) && error.response) {
    return error.response.data;
  }

  if (axios.isAxiosError(error) && error.request && error.request instanceof XMLHttpRequest) {
    return {
      statusCode: error.code,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'Bad request',
  };
};
