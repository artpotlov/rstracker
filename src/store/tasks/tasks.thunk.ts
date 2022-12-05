import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from 'api/handleError';
import { createNewTask, getTasksByBoardId, updateSetOfTasks } from 'api/tasks';
import { TRootState } from 'store/store';
import { TTasksRequest, TTasksSuccess } from 'types/types';
import { sortArrayByOrder } from 'utils/sortArrayByOrder';
import { tasksActions } from './tasks.slice';

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

export const moveTaskThunk = createAsyncThunk<unknown, TTasksSuccess[], { state: TRootState }>(
  'moveColumn',
  async (changedTasks, { dispatch, getState }) => {
    const { setUploading, setError, setAllTasksBoard } = tasksActions;
    const oldTasks = getState().tasks.allTasksBoard;
    const newTasks = oldTasks.map((task) => {
      const updatedTask = changedTasks.find((changedTask) => changedTask._id === task._id);
      return updatedTask ? updatedTask : task;
    });
    const sortedNewTasks = sortArrayByOrder(newTasks);
    dispatch(setAllTasksBoard(sortedNewTasks));
    dispatch(setError(''));
    dispatch(setUploading(true));
    try {
      const sendData = changedTasks.map((task) => ({
        _id: task._id,
        columnId: task.columnId,
        order: task.order,
      }));
      await updateSetOfTasks(sendData);
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
      dispatch(setAllTasksBoard(oldTasks));
    } finally {
      dispatch(setUploading(false));
    }
  }
);
