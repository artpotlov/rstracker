import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBoardById } from 'api/boards';
import { createNewColumn, deleteColumnById, getAllColumns } from 'api/columns';
import { handleError } from 'api/handleError';
import { TColumnRequest, TColumnSuccess } from 'types/types';
import { columnsActions } from './columns.slice';

export const getAllColumnsThunk = createAsyncThunk(
  'getAllColumns',
  async (boardId: string, { dispatch }) => {
    const { setLoading, setError, setAllColumns, setBoard } = columnsActions;
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const responseColomns = await getAllColumns({ boardId });
      dispatch(setAllColumns(responseColomns.data));
      const responseBoard = await getBoardById({ boardId });
      dispatch(setBoard(responseBoard.data));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createColumnThunk = createAsyncThunk(
  'createColumn',
  async (columnData: Omit<TColumnSuccess, '_id'>, { dispatch }) => {
    const { setUploading, setError, setCreatedColumn } = columnsActions;
    dispatch(setError(''));
    dispatch(setCreatedColumn(null));
    dispatch(setUploading(true));
    try {
      const { data } = await createNewColumn(columnData);
      dispatch(setCreatedColumn(data));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setUploading(false));
    }
  }
);

export const deleteColumnThunk = createAsyncThunk(
  'deleteColumn',
  async (sendData: Pick<TColumnRequest, 'boardId' | 'columnId'>, { dispatch }) => {
    const { setUploading, setError, setDeletedColumn, deleteColumn } = columnsActions;
    dispatch(setError(''));
    dispatch(setUploading(true));
    try {
      const { data } = await deleteColumnById(sendData);
      dispatch(deleteColumn(data));
      dispatch(setDeletedColumn(null));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setUploading(false));
    }
  }
);
