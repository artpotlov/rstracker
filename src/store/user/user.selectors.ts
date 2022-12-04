import { useAppSelector } from 'hooks/useAppSelector';

const SelectUser = () => useAppSelector((state) => state.user);

export const selectAuthUser = () => SelectUser().authUser;

export const selectIsExpiredToken = () => {
  const authUser = selectAuthUser();
  return !authUser || authUser.tokenExp * 1000 < Date.now();
};

export const selectUpdatedUser = () => SelectUser().updatedUser;
