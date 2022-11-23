import { instanceAxios } from './instanceAxios';
import {
  TTasksRequest,
  TTasksSetRequest,
  TTasksSetUpdateRequest,
  TTasksSuccess,
} from '../types/types';
import { AxiosRequestConfig } from 'axios';

export const getTasksInColumns = ({
  boardId,
  columnId,
}: Pick<TTasksRequest, 'boardId' | 'columnId'>) => {
  return instanceAxios().get<TTasksSuccess[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
};

export const createNewTask = ({
  boardId,
  columnId,
  ...taskData
}: Omit<TTasksRequest, 'taskId'>) => {
  return instanceAxios().post<TTasksSuccess>(
    `/boards/${boardId}/columns/${columnId}/tasks`,
    taskData
  );
};

export const getTaskById = ({
  boardId,
  columnId,
  taskId,
}: Pick<TTasksRequest, 'boardId' | 'columnId' | 'taskId'>) => {
  return instanceAxios().get<TTasksSuccess>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
  );
};

export const updateTaskById = ({ boardId, columnId, taskId, ...taskData }: TTasksRequest) => {
  return instanceAxios().put<TTasksSuccess[]>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    taskData
  );
};

export const deleteTaskById = ({
  boardId,
  columnId,
  taskId,
}: Pick<TTasksRequest, 'boardId' | 'columnId' | 'taskId'>) => {
  return instanceAxios().delete<TTasksSuccess>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
  );
};

export const getTasksSet = ({ ids, userId, search }: TTasksSetRequest) => {
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

  if (search) {
    config.params = {
      search,
    };
  }

  return instanceAxios().get<TTasksSuccess[]>('/tasksSet', config);
};

export const updateSetOfTasks = (tasks: TTasksSetUpdateRequest) => {
  return instanceAxios().patch<TTasksSuccess[]>('/tasksSet', tasks);
};

export const getTasksByBoardId = ({ boardId }: Pick<TTasksRequest, 'boardId'>) => {
  return instanceAxios().get<TTasksSuccess[]>(`/tasksSet/${boardId}`);
};
