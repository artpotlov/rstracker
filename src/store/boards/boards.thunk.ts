import { createAsyncThunk } from '@reduxjs/toolkit';
import { createNewBoard } from 'api/boards';
import { handleError } from 'api/handleError';
import { TBoardCreate } from 'types/types';
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
      console.log(error);
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
