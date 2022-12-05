import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserById, deleteUserById, getUserById } from 'api/users';
import { handleError } from 'api/handleError';
import { keysLS } from 'shared/consts';
import { signActions } from 'store/sign/sign.slice';
import { IUserData, TUserEdit } from 'types/types';
import { getLSData } from 'utils/local-storage';
import { userActions } from './user.slice';
import { auth } from 'api/auth';

export const updateUserThunk = createAsyncThunk(
  'updateUser',
  async (newUserData: TUserEdit, { dispatch }) => {
    const { setLoading, setError } = signActions;
    const { setUpdatedUser } = userActions;
    dispatch(setError(''));
    dispatch(setUpdatedUser(null));
    dispatch(setLoading(true));
    try {
      const userId = getLSData<IUserData>(keysLS.userData)?.userId;
      if (!userId) return;

      const currentUserData = (await getUserById({ userId })).data;

      await auth({
        login: currentUserData.login,
        password: newUserData.password,
      });

      const userData = {
        name: newUserData.name ? newUserData.name : currentUserData.name,
        login: newUserData.login ? newUserData.login : currentUserData.login,
        password: newUserData.newPassword ? newUserData.newPassword : newUserData.password,
      };

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
