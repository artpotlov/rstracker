import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBoardById } from 'api/boards';
import {
  createNewColumn,
  deleteColumnById,
  getAllColumns,
  updateColumnById,
  updateOrdersInColumns,
} from 'api/columns';
import { handleError } from 'api/handleError';
import { TRootState } from 'store/store';
import { TColumnCreateRequest, TColumnRequest, TColumnSuccess } from 'types/types';
import { sortArrayByOrder } from 'utils/sortArrayByOrder';
import { columnsActions } from './columns.slice';

type TEditColumnTitleParams = TColumnSuccess & { index: number };
type TOptionsThunk = { state: TRootState };

export const getAllColumnsThunk = createAsyncThunk(
  'getAllColumns',
  async (boardId: string, { dispatch }) => {
    const { setLoading, setError, setAllColumns, setBoard } = columnsActions;
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const responseBoard = await getBoardById({ boardId });
      dispatch(setBoard(responseBoard.data));
      const responseColumns = await getAllColumns({ boardId });
      const columnsSorted = sortArrayByOrder(responseColumns.data);
      dispatch(setAllColumns(columnsSorted));
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
  async (columnData: TColumnCreateRequest, { dispatch }) => {
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

export const moveColumnThunk = createAsyncThunk<unknown, TColumnSuccess[], { state: TRootState }>(
  'moveColumn',
  async (newColumn, { dispatch, getState }) => {
    const { setUploading, setError, setAllColumns } = columnsActions;
    dispatch(setAllColumns(newColumn));
    dispatch(setError(''));
    dispatch(setUploading(true));
    try {
      const sendData = newColumn.map((column, index) => ({ _id: column._id, order: index + 1 }));
      await updateOrdersInColumns(sendData);
    } catch (error) {
      const oldColumns = getState().columns.allColumns;
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
      dispatch(setAllColumns(oldColumns));
    } finally {
      dispatch(setUploading(false));
    }
  }
);

export const editColumnTitleThunk = createAsyncThunk<
  unknown,
  TEditColumnTitleParams,
  TOptionsThunk
>('editColumnTitle', async (columnData, { dispatch, getState }) => {
  const { setUploading, setError, setAllColumns } = columnsActions;
  const { _id, title, order, index, boardId } = columnData;
  const oldColumns = getState().columns.allColumns;
  const sendData = { columnId: _id, title, order, boardId };
  const newColumns = [...oldColumns];
  newColumns.splice(index, 1, columnData);
  dispatch(setAllColumns(newColumns));
  dispatch(setError(''));
  dispatch(setUploading(true));
  try {
    await updateColumnById(sendData);
  } catch (error) {
    const errorMessage = handleError(error).message;
    dispatch(setAllColumns(oldColumns));
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setUploading(false));
  }
});
