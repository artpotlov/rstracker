import { useAppSelector } from 'hooks/useAppSelector';

const SelectColumns = () => useAppSelector((state) => state.columns);

export const selectIsLoadingColumns = () => SelectColumns().isLoading;
export const selectErrorColumns = () => SelectColumns().errorMessage;
export const selectIsUploadingColumns = () => SelectColumns().isUploading;
export const selectBoard = () => SelectColumns().board;
export const selectAllColumns = () => SelectColumns().allColumns;
export const selectCreatedColumn = () => SelectColumns().createdColumn;
export const selectDeletedColumn = () => SelectColumns().deletedColumn;

export const selectOrderNewColumn = () => {
  const allColumns = selectAllColumns();
  return allColumns.length ? allColumns[allColumns.length - 1].order + 1 : 1;
};
