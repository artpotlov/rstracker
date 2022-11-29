import { useAppSelector } from 'hooks/useAppSelector';

const SelectUsers = () => useAppSelector((state) => state.users);

export const selectIsLoadingUsers = () => SelectUsers().isLoading;
export const selectErrorUsers = () => SelectUsers().errorMessage;
export const selectAllUsers = () => SelectUsers().allUsers;
export const selectAllUsersOptions = () => {
  const allUsers = selectAllUsers();
  return allUsers?.map(({ login }) => ({ label: login, value: login })) || [];
};
