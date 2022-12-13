import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserSuccess } from 'types/types';

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  allUsers: TUserSuccess[] | null;
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  allUsers: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
    },
    setAllUsers: (state, { payload }: PayloadAction<TUserSuccess[]>) => {
      state.allUsers = payload;
    },
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
