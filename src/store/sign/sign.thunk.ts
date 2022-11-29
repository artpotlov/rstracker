import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, createNewUser } from 'api/auth';
import { handleError } from 'api/handleError';
import { keysLS } from 'shared/consts';
import { userActions } from 'store/user/user.slice';
import { TUserAuth, TUserCreate } from 'types/types';
import { getJWTPayloadData } from 'utils/getJWTPayloadData';
import { setLSData } from 'utils/local-storage';
import { signActions } from './sign.slice';

export const signUpThunk = createAsyncThunk(
  'signUp',
  async (userData: TUserCreate, { dispatch }) => {
    const { setLoading, setError, setCreatedUser } = signActions;
    dispatch(setError(''));
    dispatch(setCreatedUser(null));
    dispatch(setLoading(true));
    try {
      const response = await createNewUser(userData);
      dispatch(setCreatedUser(response.data));
    } catch (error) {
      const errorMessage = handleError(error).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const signInThunk = createAsyncThunk('signIn', async (userData: TUserAuth, { dispatch }) => {
  const { setLoading, setError } = signActions;
  const { setAuthUser } = userActions;
  dispatch(setError(''));
  dispatch(setLoading(true));
  try {
    const response = await auth(userData);
    const jwt = getJWTPayloadData(response.data.token);
    const authUser = {
      login: userData.login,
      userId: jwt.id,
      token: response.data.token,
      tokenExp: jwt.exp,
    };
    setLSData(keysLS.userData, authUser);
    dispatch(setAuthUser(authUser));
  } catch (error) {
    const errorMessage = handleError(error).message;
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
});
