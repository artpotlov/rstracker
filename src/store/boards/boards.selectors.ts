import { useAppSelector } from 'hooks/useAppSelector';

const SelectBoards = () => useAppSelector((state) => state.boards);

export const selectIsLoadingBoards = () => SelectBoards().isLoading;
export const selectErrorBoards = () => SelectBoards().errorMessage;
export const selectCreatedBoard = () => SelectBoards().createdBoard;
