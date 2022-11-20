import {
  TColumnRequest,
  TColumnsSetCreateRequest,
  TColumnsSetRequest,
  TColumnsSetUpdateRequest,
  TColumnSuccess,
} from '../types/types';
import { instanceAxios } from './instanceAxios';
import { AxiosRequestConfig } from 'axios';

export const getAllColumns = ({ boardId }: Pick<TColumnRequest, 'boardId'>) => {
  return instanceAxios().get<TColumnSuccess[]>(`/boards/${boardId}/columns`);
};

export const createNewColumn = ({ boardId, ...columnData }: Omit<TColumnRequest, 'columnId'>) => {
  return instanceAxios().post<TColumnSuccess>(`/boards/${boardId}/columns`, columnData);
};

export const getColumnById = ({
  boardId,
  columnId,
}: Pick<TColumnRequest, 'boardId' | 'columnId'>) => {
  return instanceAxios().get<TColumnSuccess>(`/boards/${boardId}/columns/${columnId}`);
};

export const updateColumnById = ({ boardId, columnId, ...columnData }: TColumnRequest) => {
  return instanceAxios().put<TColumnSuccess>(`/boards/${boardId}/columns/${columnId}`, columnData);
};

export const deleteColumnById = ({
  boardId,
  columnId,
}: Pick<TColumnRequest, 'boardId' | 'columnId'>) => {
  return instanceAxios().delete<TColumnSuccess>(`/boards/${boardId}/columns/${columnId}`);
};

export const getColumnsSet = ({ ids, userId }: TColumnsSetRequest) => {
  const config: AxiosRequestConfig = {};

  if (ids && ids.length > 0) {
    config.params = {
      ids: ids.join(','),
    };
  }

  if (userId) {
    config.params = {
      userId,
    };
  }

  return instanceAxios().get<TColumnSuccess[]>('/columnsSet', config);
};

export const updateOrdersInColumns = (columns: TColumnsSetUpdateRequest) => {
  return instanceAxios().patch<TColumnSuccess[]>('/columnsSet', columns);
};

export const createColumnsSet = (columns: TColumnsSetCreateRequest) => {
  return instanceAxios().post<TColumnSuccess[]>('/columnsSet', columns);
};
