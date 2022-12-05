import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData, TUserSuccess } from 'types/types';
import { deleteLSData, getLSData } from 'utils/local-storage';
import { keysLS } from 'shared/consts';

type TAuthUser = IUserData | null;

type TUpdatedUser = TUserSuccess | null;

type TDeletedUser = IUserData | null;

type TInitialState = {
  authUser: TAuthUser;
  isLoading: boolean;
  errorMessage: string;
  updatedUser: TUpdatedUser;
  deletedUser: TDeletedUser;
};

const initialState: TInitialState = {
  authUser: getLSData<IUserData>(keysLS.userData),
  isLoading: false,
  errorMessage: '',
  updatedUser: null,
  deletedUser: null,
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
    setDeletedUser: (state, { payload }: PayloadAction<TDeletedUser>) => {
      state.deletedUser = payload;
    },
    clearUser: (state) => {
      state.updatedUser = null;
    },
  },
});

export const userActions = userSlice.actions;
export const userRedusers = userSlice.reducer;
