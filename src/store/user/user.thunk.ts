import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserById } from 'api/users';
import { handleError } from 'api/handleError';
import { keysLS } from 'shared/consts';
import { signActions } from 'store/sign/sign.slice';
import { TUserAuth, TUserCreate } from 'types/types';
import { getJWTPayloadData } from 'utils/getJWTPayloadData';
import { setLSData, getLSData } from 'utils/local-storage';
import { userActions } from './user.slice';

type TUserData = {
  login: string;
  userId: string;
  token: string;
  tokenExp: number;
};

export const updateUserThunk = createAsyncThunk(
  'updateUser',
  async (userData: TUserCreate, { dispatch }) => {
    const { setLoading, setError } = signActions;
    const { setUpdatedUser } = userActions;
    dispatch(setError(''));
    dispatch(setUpdatedUser(null));
    dispatch(setLoading(true));
    try {
      const userId = getLSData<TUserData>(keysLS.userData)?.userId;
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
