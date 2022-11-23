export interface IToken {
  token: string;
}

export interface IUserData extends IToken {
  userId: string;
  login: string;
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

export type TUserCreate = Omit<TUser, '_id'>;

export type TUserAuth = Omit<TUser, '_id' | 'name'>;

export type TColumnSuccess = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type TColumnRequest = {
  columnId: string;
} & Omit<TColumnSuccess, '_id'>;

export type TColumnsSetRequest = {
  ids?: string[];
  userId?: string;
};

export type TColumnsSetUpdateRequest = Pick<TColumnSuccess, '_id' | 'order'>[];

export type TColumnsSetCreateRequest = Omit<TColumnSuccess, '_id'>[];

export type TFileSuccess = {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
};

export type TFileGetRequest = {
  ids?: string[];
  userId?: string;
  taskId?: string;
  boardId: string;
};

export type TFileUploadRequest = {
  boardId: string;
  taskId: string;
  file: FormData;
};

export type TFileDeleteRequest = {
  fileId: string;
};
