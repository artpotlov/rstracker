import { instanceAxios } from './instanceAxios';
import { TBoardRequest, TBoardsSetRequest, TBoardSuccess } from '../types/types';

export const getAllBoards = () => {
  return instanceAxios().get<TBoardSuccess[]>('/boards');
};

export const createNewBoard = (boardData: Omit<TBoardRequest, 'boardId'>) => {
  return instanceAxios().post('/boards', boardData);
};

export const getBoardById = ({ boardId }: Pick<TBoardRequest, 'boardId'>) => {
  return instanceAxios().get<TBoardSuccess>(`/boards/${boardId}`);
};

export const updateBoardById = ({ boardId, ...boardData }: TBoardRequest) => {
  return instanceAxios().put<TBoardSuccess>(`/boards/${boardId}`, boardData);
};

export const deleteBoardById = ({ boardId }: Pick<TBoardRequest, 'boardId'>) => {
  return instanceAxios().delete<TBoardSuccess>(`/boards/${boardId}`);
};

export const getBoardsSet = ({ ids }: Pick<TBoardsSetRequest, 'ids'>) => {
  return instanceAxios().get<TBoardSuccess[]>('/boardsSet', {
    params: {
      ids: ids.join(','),
    },
  });
};

export const getBoardsSetByUserId = ({ userId }: Pick<TBoardsSetRequest, 'userId'>) => {
  return instanceAxios().get<TBoardSuccess[]>(`/boardsSet/${userId}`);
};
