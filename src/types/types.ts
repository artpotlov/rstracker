export interface IToken {
  token: string;
}

export interface IUserData extends IToken {
  userId: string;
  login: string;
  tokenExp: number;
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

export type TBoardCreate = Omit<TBoardSuccess, '_id'>;

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

export type TPointSuccess = {
  _id: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
};

export type TPointsGetRequest = {
  ids?: string[];
  userId?: string;
  taskId: string;
};

export type TPointCreateRequest = Omit<TPointSuccess, '_id'>;

export type TPointsUpdateRequest = Pick<TPointSuccess, '_id' | 'done'>[];

export type TPointUpdateRequest = {
  pointId: string;
} & Pick<TPointSuccess, '_id' | 'done'>;

export type TPointDeleteRequest = {
  pointId: string;
};

export type TTasksSuccess = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
};

export type TTasksRequest = {
  taskId: string;
} & Omit<TTasksSuccess, '_id'>;

export type TNewTaskDataRequest = {
  newTaskData: Omit<TTasksRequest, 'taskId' | 'boardId'>;
} & Pick<TTasksRequest, 'boardId' | 'columnId' | 'taskId'>;

export type TTasksSetRequest = {
  ids?: string[];
  userId?: string;
  search?: string;
};

export type TTasksSetUpdateRequest = Pick<TTasksSuccess, '_id' | 'order' | 'columnId'>[];
