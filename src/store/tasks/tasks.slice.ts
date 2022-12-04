import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTasksSuccess } from 'types/types';

type TInitialState = {
  isLoading: boolean;
  isUploading: boolean;
  errorMessage: string;
  task: TTasksSuccess | null;
  createdTask: TTasksSuccess | null;
  allTasksBoard: TTasksSuccess[];
  deletedTask: TTasksSuccess | null;
};

const initialState: TInitialState = {
  isLoading: false,
  isUploading: false,
  errorMessage: '',
  task: null,
  createdTask: null,
  allTasksBoard: [],
  deletedTask: null,
};

const tasksSlice = createSlice({
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
    setAllTasksBoard: (state, { payload }: PayloadAction<TTasksSuccess[]>) => {
      state.allTasksBoard = payload;
    },
    setCreatedTask: (state, { payload }: PayloadAction<TTasksSuccess | null>) => {
      state.createdTask = payload;
      if (payload) {
        state.allTasksBoard.push(payload);
      }
    },
    setDeletedTask: (state, { payload }: PayloadAction<TTasksSuccess | null>) => {
      state.deletedTask = payload;
    },
    deleteTask: (state, { payload }: PayloadAction<TTasksSuccess>) => {
      state.allTasksBoard = state.allTasksBoard.filter((task) => task._id !== payload._id);
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
