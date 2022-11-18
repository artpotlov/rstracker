import { instanceAxios } from './instanceAxios';
import { TUserRequest, TUserSuccess, TUserUpdateRequest } from '../types/types';

export const getAllUsers = () => {
  return instanceAxios().get<TUserSuccess[]>('/users');
};

export const getUserById = ({ userId }: TUserRequest) => {
  return instanceAxios().get<TUserSuccess>(`/users/${userId}`);
};

export const updateUserById = ({ userId, ...userData }: TUserUpdateRequest) => {
  return instanceAxios().put<TUserSuccess>(`/users/${userId}`, userData);
};

export const deleteUserById = ({ userId }: TUserRequest) => {
  return instanceAxios().delete<TUserSuccess>(`/users/${userId}`);
};
