import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from 'api/handleError';
import { createNewTask, getTasksByBoardId } from 'api/tasks';
import { TRootState } from 'store/store';
import { TColumnSuccess, TTasksRequest } from 'types/types';
import { sortArrayByOrder } from 'utils/sortArrayByOrder';
import { tasksActions } from './tasks.slice';

type TEditColumnTitleParams = TColumnSuccess & { index: number };
type TOptionsThunk = { state: TRootState };

export const getAllTasksBoardThunk = createAsyncThunk(
  'getAllTasksBoard',
  async (boardId: string, { dispatch }) => {
    const { setLoading, setError, setAllTasksBoard } = tasksActions;
    dispatch(setError(''));
    dispatch(setLoading(true));
    try {
      const { data } = await getTasksByBoardId({ boardId });
      const tasksSorted = sortArrayByOrder(data);
      dispatch(setAllTasksBoard(tasksSorted));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createTaskThunk = createAsyncThunk(
  'createTask',
  async (taskData: Omit<TTasksRequest, 'taskId'>, { dispatch }) => {
    const { setUploading, setError, setCreatedTask } = tasksActions;
    dispatch(setError(''));
    dispatch(setCreatedTask(null));
    dispatch(setUploading(true));
    try {
      const { data } = await createNewTask(taskData);
      dispatch(setCreatedTask(data));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setUploading(false));
    }
  }
);

// export const deleteTaskThunk = createAsyncThunk(
//   'deleteColumn',
//   async (sendData: Pick<TColumnRequest, 'boardId' | 'columnId'>, { dispatch }) => {
//     const { setUploading, setError, setDeletedColumn, deleteColumn } = tasksActions;
//     dispatch(setError(''));
//     dispatch(setUploading(true));
//     try {
//       const { data } = await deleteColumnById(sendData);
//       dispatch(deleteColumn(data));
//       dispatch(setDeletedColumn(null));
//     } catch (error) {
//       const errorMessage = handleError(error).message;
//       dispatch(setError(errorMessage));
//     } finally {
//       dispatch(setUploading(false));
//     }
//   }
// );

// export const moveColumnThunk = createAsyncThunk<unknown, TColumnSuccess[], { state: TRootState }>(
//   'moveColumn',
//   async (newColumn, { dispatch, getState }) => {
//     const { setUploading, setError, setAllColumns } = columnsActions;
//     dispatch(setAllColumns(newColumn));
//     dispatch(setError(''));
//     dispatch(setUploading(true));
//     try {
//       const sendData = newColumn.map((column, index) => ({ _id: column._id, order: index + 1 }));
//       await updateOrdersInColumns(sendData);
//     } catch (error) {
//       const oldColumns = getState().columns.allColumns;
//       const errorMessage = handleError(error).message;
//       dispatch(setError(errorMessage));
//       dispatch(setAllColumns(oldColumns));
//     } finally {
//       dispatch(setUploading(false));
//     }
//   }
// );

// export const editColumnTitleThunk = createAsyncThunk<
//   unknown,
//   TEditColumnTitleParams,
//   TOptionsThunk
// >('editColumnTitle', async (columnData, { dispatch, getState }) => {
//   const { setUploading, setError, setAllColumns } = columnsActions;
//   const { _id, title, order, index, boardId } = columnData;
//   const oldColumns = getState().columns.allColumns;
//   const sendData = { columnId: _id, title, order, boardId };
//   const newColumns = [...oldColumns];
//   newColumns.splice(index, 1, columnData);
//   dispatch(setAllColumns(newColumns));
//   dispatch(setError(''));
//   dispatch(setUploading(true));
//   try {
//     await updateColumnById(sendData);
//   } catch (error) {
//     const errorMessage = handleError(error).message;
//     dispatch(setAllColumns(oldColumns));
//     dispatch(setError(errorMessage));
//   } finally {
//     dispatch(setUploading(false));
//   }
// });
