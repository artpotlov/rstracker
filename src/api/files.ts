import {
  TFileDeleteRequest,
  TFileGetRequest,
  TFileSuccess,
  TFileUploadRequest,
} from '../types/types';
import { AxiosRequestConfig } from 'axios';
import { instanceAxios } from './instanceAxios';

export const getFiles = ({ ids, userId, taskId }: Omit<TFileGetRequest, 'boardId'>) => {
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

  if (taskId) {
    config.params = {
      taskId,
    };
  }

  return instanceAxios().get<TFileSuccess[]>('/file', config);
};

export const uploadFile = (fileData: TFileUploadRequest) => {
  return instanceAxios().post<TFileSuccess[]>('/file', fileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getFilesByBoardId = ({ boardId }: Pick<TFileGetRequest, 'boardId'>) => {
  return instanceAxios().get<TFileSuccess[]>(`/file/${boardId}`);
};

export const deleteFileById = ({ fileId }: TFileDeleteRequest) => {
  return instanceAxios().delete<TFileSuccess>(`/file/${fileId}`);
};
