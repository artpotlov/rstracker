import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoardSuccess, TColumnSuccess } from 'types/types';

type TInitialState = {
  isLoading: boolean;
  isUploading: boolean;
  errorMessage: string;
  board: TBoardSuccess | null;
  createdColumn: TColumnSuccess | null;
  allColumns: TColumnSuccess[];
  deletedColumn: TColumnSuccess | null;
};

const initialState: TInitialState = {
  isLoading: false,
  isUploading: false,
  errorMessage: '',
  board: null,
  createdColumn: null,
  allColumns: [],
  deletedColumn: null,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setUploading: (state, { payload }: PayloadAction<boolean>) => {
      state.isUploading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
    },
    setAllColumns: (state, { payload }: PayloadAction<TColumnSuccess[]>) => {
      state.allColumns = payload;
    },
    setBoard: (state, { payload }: PayloadAction<TBoardSuccess>) => {
      state.board = payload;
    },
    setCreatedColumn: (state, { payload }: PayloadAction<TColumnSuccess | null>) => {
      state.createdColumn = payload;
      if (payload) {
        state.allColumns.push(payload);
      }
    },
    setDeletedColumn: (state, { payload }: PayloadAction<TColumnSuccess | null>) => {
      state.deletedColumn = payload;
    },
    deleteColumn: (state, { payload }: PayloadAction<TColumnSuccess>) => {
      state.allColumns = state.allColumns.filter((column) => column._id !== payload._id);
    },
    clearColumn: (state) => {
      state.createdColumn = null;
    },
  },
});

export const columnsActions = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
