import { instanceAxios } from './instanceAxios';
import {
  TBoardRequest,
  TBoardsSetRequest,
  TBoardSuccess,
  TTasksRequest,
  TTasksSuccess,
} from '../types/types';

export const getTasksInColumns = ({
  boardId,
  columnId,
}: Pick<TTasksRequest, 'boardId' | 'columnId'>) => {
  return instanceAxios().get<TTasksSuccess[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
};
