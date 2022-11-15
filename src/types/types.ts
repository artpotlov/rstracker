export interface IUserData {
  userId: string;
  login: string;
  token: string;
}

export interface ITokenData {
  exp: number;
  iat: number;
  id: string;
  login: string;
}
export type TUser = {
  _id: string;
  name: string;
  login: string;
  password: string;
};

export type TResponse<S, E> = {
  statusResponse: 'success' | 'error';
  data: S | E;
};

export type TErrorResponse = {
  statusCode?: number | string;
  message: string;
};

export type TUserSuccess = Omit<TUser, 'password'>;

export type TUserRequest = {
  authToken: string;
  userId: string;
};

export type TUserUpdateRequest = Omit<TUser, '_id'> & TUserRequest;
