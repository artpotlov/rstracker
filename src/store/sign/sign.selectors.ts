import { useAppSelector } from 'hooks/useAppSelector';

const SelectSign = () => useAppSelector((state) => state.sign);

export const selectIsLoadingSign = () => SelectSign().isLoading;
export const selectErrorSign = () => SelectSign().errorMessage;
export const selectCreatedUserSign = () => SelectSign().createdUser;
