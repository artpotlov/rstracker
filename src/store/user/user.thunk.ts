import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserById, deleteUserById } from 'api/users';
import { handleError } from 'api/handleError';
import { keysLS } from 'shared/consts';
import { signActions } from 'store/sign/sign.slice';
import { IUserData, TUserCreate } from 'types/types';
import { getLSData } from 'utils/local-storage';
import { userActions } from './user.slice';

export const updateUserThunk = createAsyncThunk(
  'updateUser',
  async (userData: TUserCreate, { dispatch }) => {
    const { setLoading, setError } = signActions;
    const { setUpdatedUser } = userActions;
    dispatch(setError(''));
    dispatch(setUpdatedUser(null));
    dispatch(setLoading(true));
    try {
      const userId = getLSData<IUserData>(keysLS.userData)?.userId;
      if (!userId) return;
      const response = await updateUserById({ userId, ...userData });
      dispatch(setUpdatedUser(response.data));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteUserThunk = createAsyncThunk('deleteUser', async (_, { dispatch }) => {
  const { setLoading, setError } = signActions;
  const { logoutUser, setDeletedUser } = userActions;
  dispatch(setError(''));
  dispatch(setLoading(true));
  try {
    const userId = getLSData<IUserData>(keysLS.userData)?.userId;
    if (!userId) return;
    await deleteUserById({ userId });
    dispatch(setDeletedUser(null));
    dispatch(logoutUser());
  } catch (error) {
    const errorMessage = handleError(error).message;
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
});
