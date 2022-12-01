import { useTranslation } from 'react-i18next';
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
import { Box, Flex } from '@chakra-ui/react';
import { ColumnBoard } from 'components/ColumnBoard/ColumnBoard';

export const KanbanColumns = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const columns = selectAllColumns();
  const isLoading = selectIsLoadingColumns();
  const isUploading = selectIsUploadingColumns();
  const deletedColumn = selectDeletedColumn();
  const board = selectBoard();
  const { setDeletedColumn } = columnsActions;

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
    <Box height="100%" maxH="100%" overflowX="auto" overflowY="hidden" flexGrow={1}>
      <Flex height="100%" maxH="100%" gap="4">
        {columns.map((column) => (
          <ColumnBoard key={column._id} column={column} />
        ))}
      </Flex>
      <Portal
        title={`${t('columns.delete')} ${deletedColumn?.title}?`}
        handleClose={handleCloseConfirm}
        isOpen={!!deletedColumn}
      >
        <ConfirmModal confirm={confirmDeleteColumn} isLoading={isUploading} />
      </Portal>
    </Box>
  );
};
