import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { TColumnSuccess } from 'types/types';
import {
  selectAllColumns,
  selectBoard,
  selectDeletedColumn,
  selectIsLoadingColumns,
  selectIsUploadingColumns,
} from 'store/columns/columns.selectors';
import { columnsActions } from 'store/columns/columns.slice';
import { deleteColumnThunk } from 'store/columns/columns.thunk';
import { EmptyDataText } from 'components/EmptyDataText/EmptyDataText';
import { LoaderPage } from 'components/LoaderPage/LoaderPage';
import { Portal } from 'components/Portal/Portal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';

export const KanbanColumns = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const columns = selectAllColumns();
  const isLoading = selectIsLoadingColumns();
  const isUploading = selectIsUploadingColumns();
  const deletedColumn = selectDeletedColumn();
  const board = selectBoard();
  const { setDeletedColumn } = columnsActions;

  const deleteColumn = (event: MouseEvent<HTMLButtonElement>, column: TColumnSuccess) => {
    event.stopPropagation();
    dispatch(setDeletedColumn(column));
  };

  const confirmDeleteColumn = () => {
    if (deletedColumn && board) {
      const sendData = { boardId: board._id, columnId: deletedColumn._id };
      dispatch(deleteColumnThunk(sendData));
    }
  };

  const handleCloseConfirm = () => {
    dispatch(setDeletedColumn(null));
  };

  if (isLoading) {
    return <LoaderPage />;
  }

  if (!columns.length) {
    return <EmptyDataText text={t('columns.noData')} />;
  }

  return (
    <>
      {columns.map((column) => (
        //todo верстка колонок
        <div key={column._id}>
          {column.title}{' '}
          <button type="button" onClick={(event) => deleteColumn(event, column)}>
            delete
          </button>
        </div>
      ))}
      <Portal
        title={`${t('columns.delete')} ${deletedColumn?.title}?`}
        handleClose={handleCloseConfirm}
        isOpen={!!deletedColumn}
      >
        <ConfirmModal confirm={confirmDeleteColumn} isLoading={isUploading} />
      </Portal>
    </>
  );
};
