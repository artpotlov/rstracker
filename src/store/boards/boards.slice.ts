import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoardSuccess } from 'types/types';

type TCreatedBoard = TBoardSuccess | null;

type TInitialState = {
  isLoading: boolean;
  errorMessage: string;
  createdBoard: TCreatedBoard;
  allBoards: TBoardSuccess[];
  deletedBoard: TBoardSuccess | null;
};

const initialState: TInitialState = {
  isLoading: false,
  errorMessage: '',
  createdBoard: null,
  allBoards: [],
  deletedBoard: null,
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
    setAllBoard: (state, { payload }: PayloadAction<TBoardSuccess[]>) => {
      state.allBoards = payload;
    },
    setDeletedBoard: (state, { payload }: PayloadAction<TBoardSuccess | null>) => {
      state.deletedBoard = payload;
    },
    deleteBoard: (state, { payload }: PayloadAction<TBoardSuccess>) => {
      state.allBoards = state.allBoards.filter((board) => board._id !== payload._id);
    },
  },
});

export const boardsActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
