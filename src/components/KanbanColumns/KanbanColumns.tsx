import { useTranslation } from 'react-i18next';
import { Box, Flex } from '@chakra-ui/react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import {
  selectAllColumns,
  selectBoard,
  selectDeletedColumn,
  selectIsLoadingColumns,
  selectIsUploadingColumns,
} from 'store/columns/columns.selectors';
import { columnsActions } from 'store/columns/columns.slice';
import { deleteColumnThunk, moveColumnThunk } from 'store/columns/columns.thunk';
import { EmptyDataText } from 'components/EmptyDataText/EmptyDataText';
import { LoaderPage } from 'components/LoaderPage/LoaderPage';
import { Portal } from 'components/Portal/Portal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { ColumnBoard } from 'components/ColumnBoard/ColumnBoard';
import { DRAGGABLE_TYPES } from 'shared/consts';
import { useState } from 'react';
import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';

export const KanbanColumns = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const columns = selectAllColumns();
  const isLoading = selectIsLoadingColumns();
  const isUploading = selectIsUploadingColumns();
  const deletedColumn = selectDeletedColumn();
  const board = selectBoard();
  const { setDeletedColumn } = columnsActions;

  const [isOpenTaskModal, setOpenTaskModal] = useState(false);

  const handleToggleTaskModal = () => {
    setOpenTaskModal((prev) => !prev);
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

  const handleDragEnd = ({ destination, source, type }: DropResult) => {
    const isDrag =
      destination &&
      (destination.droppableId !== source.droppableId || destination.index !== source.index);
    if (!isDrag) return;
    if (type === DRAGGABLE_TYPES.column) {
      const dragColumn = columns[source.index];
      const newColumns = [...columns];
      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, dragColumn);
      dispatch(moveColumnThunk(newColumns));
    }
  };

  if (isLoading) {
    return <LoaderPage />;
  }

  if (!columns.length) {
    return <EmptyDataText text={t('columns.noData')} />;
  }

  return (
    <Box height="100%" maxH="100%" overflowX="auto" overflowY="hidden" flexGrow={1}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type={DRAGGABLE_TYPES.column}>
          {(provided) => (
            <Flex
              height="100%"
              maxH="100%"
              gap="4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column, index) => (
                <ColumnBoard key={column._id} column={column} index={index} />
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
      <Portal
        title={t('columns.deleteTitle')}
        handleClose={handleCloseConfirm}
        isOpen={!!deletedColumn}
      >
        <ConfirmModal
          confirm={confirmDeleteColumn}
          isLoading={isUploading}
          question={`${t('columns.deleteQuestion')} ${deletedColumn?.title}?`}
          handleClose={handleCloseConfirm}
        />
      </Portal>
      <Portal
        title={t('tasks.createTitle')}
        handleClose={handleToggleTaskModal}
        isOpen={isOpenTaskModal}
      >
        <CreateTaskForm handleClose={handleToggleTaskModal} />
      </Portal>
    </Box>
  );
};
