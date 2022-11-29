import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from 'types/types';
import { deleteLSData, getLSData } from 'utils/local-storage';
import { keysLS } from 'shared/consts';

type TAuthUser = IUserData | null;

type TInitialState = {
  authUser: TAuthUser;
};

const initialState: TInitialState = {
  authUser: getLSData<IUserData>(keysLS.userData),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser(state, { payload }: PayloadAction<IUserData>) {
      state.authUser = payload;
    },
    logoutUser(state) {
      deleteLSData(keysLS.userData);
      state.authUser = null;
    },
  },
});

export const userActions = userSlice.actions;
export const userRedusers = userSlice.reducer;
