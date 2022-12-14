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
import {
  selectAllTasksBoard,
  selectDeletedTask,
  selectIsLoadingTasks,
  selectIsUploadingTasks,
} from 'store/tasks/tasks.selectors';
import { columnsActions } from 'store/columns/columns.slice';
import { deleteColumnThunk, moveColumnThunk } from 'store/columns/columns.thunk';
import { deleteTaskThunk, moveTaskThunk } from 'store/tasks/tasks.thunk';
import { EmptyDataText } from 'components/EmptyDataText/EmptyDataText';
import { LoaderPage } from 'components/LoaderPage/LoaderPage';
import { Portal } from 'components/Portal/Portal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { ColumnBoard } from 'components/ColumnBoard/ColumnBoard';
import { DRAGGABLE_TYPES } from 'shared/consts';
import { tasksActions } from 'store/tasks/tasks.slice';

export const KanbanColumns = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const columns = selectAllColumns();
  const isLoadingColumns = selectIsLoadingColumns();
  const isLoadingTasks = selectIsLoadingTasks();
  const isUploadingColumn = selectIsUploadingColumns();
  const isUpLoadingTasks = selectIsUploadingTasks();
  const deletedColumn = selectDeletedColumn();
  const deletedTask = selectDeletedTask();
  const board = selectBoard();
  const allTaskBoard = selectAllTasksBoard();
  const { setDeletedColumn } = columnsActions;
  const { setDeletedTask } = tasksActions;

  const confirmDeleteColumn = () => {
    if (deletedColumn && board) {
      const sendData = { boardId: board._id, columnId: deletedColumn._id };
      dispatch(deleteColumnThunk(sendData));
    }
  };

  const confirmDeleteTask = () => {
    if (deletedTask && board) {
      const sendData = {
        boardId: board._id,
        columnId: deletedTask.columnId,
        taskId: deletedTask._id,
      };
      dispatch(deleteTaskThunk(sendData));
    }
  };

  const handleCloseConfirmDeleteColumn = () => {
    dispatch(setDeletedColumn(null));
  };

  const handleCloseConfirmDeleteTask = () => {
    dispatch(setDeletedTask(null));
  };

  const handleDragEnd = ({ destination, source, type, draggableId }: DropResult) => {
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
    if (type === DRAGGABLE_TYPES.task) {
      const dragTask = allTaskBoard.find((task) => task._id === draggableId);
      if (!dragTask) return;
      const sourceColumnTasks = allTaskBoard.filter((task) => task.columnId === source.droppableId);
      sourceColumnTasks.splice(source.index, 1);
      if (destination.droppableId === source.droppableId) {
        sourceColumnTasks.splice(destination.index, 0, dragTask);
        const newTasks = sourceColumnTasks.map((task, index) => ({ ...task, order: index + 1 }));
        dispatch(moveTaskThunk(newTasks));
      } else {
        const destinationColumnTasks = allTaskBoard.filter(
          (task) => task.columnId === destination.droppableId
        );
        destinationColumnTasks.splice(destination.index, 0, {
          ...dragTask,
          columnId: destination.droppableId,
        });
        const newTasksSource = sourceColumnTasks.map((task, index) => ({
          ...task,
          order: index + 1,
        }));
        const newTasksDestination = destinationColumnTasks.map((task, index) => ({
          ...task,
          order: index + 1,
        }));
        dispatch(moveTaskThunk([...newTasksSource, ...newTasksDestination]));
      }
    }
  };

  if (isLoadingColumns || isLoadingTasks) {
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
              width="fit-content"
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
        handleClose={handleCloseConfirmDeleteColumn}
        isOpen={!!deletedColumn}
      >
        <ConfirmModal
          confirm={confirmDeleteColumn}
          isLoading={isUploadingColumn}
          question={`${t('columns.deleteQuestion')} ${deletedColumn?.title}?`}
          handleClose={handleCloseConfirmDeleteColumn}
        />
      </Portal>
      <Portal
        title={t('tasks.deleteTitle')}
        isOpen={!!deletedTask}
        handleClose={handleCloseConfirmDeleteTask}
      >
        <ConfirmModal
          confirm={confirmDeleteTask}
          isLoading={isUpLoadingTasks}
          question={`${t('tasks.deleteQuestion')} ${deletedTask?.title}?`}
          handleClose={handleCloseConfirmDeleteTask}
        />
      </Portal>
    </Box>
  );
};
