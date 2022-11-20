import { instanceAxios } from './instanceAxios';
import { IToken, TUserAuth, TUserCreate, TUserSuccess } from '../types/types';

export const createNewUser = (userData: TUserCreate) => {
  return instanceAxios().post<TUserSuccess>('/auth/signup', userData);
};

export const auth = (userData: TUserAuth) => {
  return instanceAxios().post<IToken>('/auth/signin', userData);
};
