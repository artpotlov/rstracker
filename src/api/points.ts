import {
  TPointCreateRequest,
  TPointDeleteRequest,
  TPointsGetRequest,
  TPointSuccess,
  TPointsUpdateRequest,
  TPointUpdateRequest,
} from '../types/types';
import { AxiosRequestConfig } from 'axios';
import { instanceAxios } from './instanceAxios';

export const getAllPoints = ({ userId, ids }: Omit<TPointsGetRequest, 'taskId'>) => {
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

  return instanceAxios().get<TPointSuccess[]>('/points', config);
};

export const createNewPoint = (pointData: TPointCreateRequest) => {
  return instanceAxios().post<TPointSuccess>('/points', pointData);
};

export const updateSetPoints = (pointsData: TPointsUpdateRequest) => {
  return instanceAxios().patch<TPointSuccess[]>('/points', pointsData);
};

export const getPointsByTaskId = ({ taskId }: Pick<TPointsGetRequest, 'taskId'>) => {
  return instanceAxios().get<TPointSuccess[]>(`/points/${taskId}`);
};

export const updatePointById = ({ pointId, ...pointData }: TPointUpdateRequest) => {
  return instanceAxios().patch<TPointSuccess>(`/points/${pointId}`, pointData);
};

export const deletePointById = ({ pointId }: TPointDeleteRequest) => {
  return instanceAxios().delete<TPointSuccess>(`/points/${pointId}`);
};
