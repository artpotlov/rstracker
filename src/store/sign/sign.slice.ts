import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserSuccess } from 'types/types';

type TCreatedUser = TUserSuccess | null;

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  createdUser: TCreatedUser;
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  createdUser: null,
};

const signSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
    },
    setCreatedUser: (state, { payload }: PayloadAction<TCreatedUser>) => {
      state.createdUser = payload;
    },
  },
});

export const signActions = signSlice.actions;
export const signReducer = signSlice.reducer;
