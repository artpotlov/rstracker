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

export type TErrorResponse = {
  statusCode?: number | string;
  message: string;
};

export type TUserSuccess = Omit<TUser, 'password'>;

export type TUserRequest = {
  userId: string;
};

export type TUserUpdateRequest = Omit<TUser, '_id'> & TUserRequest;

export type TBoardSuccess = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type TBoardRequest = {
  boardId: string;
} & Omit<TBoardSuccess, '_id'>;

export type TBoardsSetRequest = {
  ids: string[];
  userId: string;
};
