import { createAsyncThunk } from '@reduxjs/toolkit';
import { createNewBoard, deleteBoardById, getAllBoards } from 'api/boards';
import { handleError } from 'api/handleError';
import { TBoardCreate, TBoardSuccess } from 'types/types';
import { boardsActions } from './boards.slice';

export const createBoardThunk = createAsyncThunk(
  'createBoard',
  async (boardData: TBoardCreate, { dispatch }) => {
    const { setLoading, setError, setCreatedBoard } = boardsActions;
    dispatch(setError(''));
    dispatch(setCreatedBoard(null));
    dispatch(setLoading(true));
    try {
      const response = await createNewBoard(boardData);
      dispatch(setCreatedBoard(response.data));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getAllBoardsThunk = createAsyncThunk('getAllBoards', async (_, { dispatch }) => {
  const { setLoading, setError, setAllBoard } = boardsActions;
  dispatch(setError(''));
  dispatch(setLoading(true));
  try {
    const { data } = await getAllBoards();
    dispatch(setAllBoard(data));
  } catch (error) {
    const errorMessage = handleError(error).message;
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
});

export const deleteBoardThunk = createAsyncThunk(
  'deleteBoards',
  async (board: TBoardSuccess, { dispatch }) => {
    const { setLoading, setError, deleteBoard, setDeletedBoard } = boardsActions;
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const { data } = await deleteBoardById({ boardId: board._id });
      dispatch(deleteBoard(data));
      dispatch(setDeletedBoard(null));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
