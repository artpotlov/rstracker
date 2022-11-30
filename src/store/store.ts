import { configureStore } from '@reduxjs/toolkit';
import { boardsReducer } from './boards/boards.slice';
import { columnsReducer } from './columns/columns.slice';
import { signReducer } from './sign/sign.slice';
import { userRedusers } from './user/user.slice';
import { usersReducer } from './users/users.slice';

export const store = configureStore({
  reducer: {
    sign: signReducer,
    user: userRedusers,
    boards: boardsReducer,
    users: usersReducer,
    columns: columnsReducer,
  },
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
