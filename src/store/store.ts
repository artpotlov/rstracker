import { configureStore } from '@reduxjs/toolkit';
import { signReducer } from './sign/sign.slice';
import { userRedusers } from './user/user.slice';

export const store = configureStore({
  reducer: { sign: signReducer, user: userRedusers },
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
