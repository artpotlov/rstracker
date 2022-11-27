import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoardSuccess } from 'types/types';

type TCreatedBoard = TBoardSuccess | null;

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  createdBoard: TCreatedBoard;
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  createdBoard: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
    },
    setCreatedBoard: (state, { payload }: PayloadAction<TCreatedBoard>) => {
      state.createdBoard = payload;
    },
  },
});

export const boardsActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
