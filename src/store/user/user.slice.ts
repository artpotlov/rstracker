import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from 'types/types';
import { deleteLSData, getLSData } from 'utils/local-storage';
import { keysLS } from 'shared/consts';
import { TUserSuccess } from 'types/types';

type TAuthUser = IUserData | null;

type TUpdatedUser = TUserSuccess | null;

type TInitialState = {
  authUser: TAuthUser;
  isLoading: boolean;
  errorMessage: string;
  updatedUser: TUpdatedUser;
};

const initialState: TInitialState = {
  authUser: getLSData<IUserData>(keysLS.userData),
  isLoading: false,
  errorMessage: '',
  updatedUser: null,
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
    setUpdatedUser: (state, { payload }: PayloadAction<TUpdatedUser>) => {
      state.updatedUser = payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userRedusers = userSlice.reducer;
