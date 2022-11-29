import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from 'api/handleError';
import { getAllUsers } from 'api/users';
import { usersActions } from './users.slice';

export const getAllUsersThunk = createAsyncThunk('getAllUsers', async (_, { dispatch }) => {
  const { setLoading, setError, setAllUsers } = usersActions;
  dispatch(setError(''));
  dispatch(setLoading(true));
  try {
    const response = await getAllUsers();
    dispatch(setAllUsers(response.data));
  } catch (error) {
    const errorMessage = handleError(error).message;
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
});
