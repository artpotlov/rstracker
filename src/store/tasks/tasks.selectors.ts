import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/useAppSelector';

const SelectTasks = () => useAppSelector((state) => state.tasks);

export const selectIsLoadingTasks = () => SelectTasks().isLoading;
export const selectErrorTasks = () => SelectTasks().errorMessage;
export const selectIsUploadingTasks = () => SelectTasks().isUploading;
export const selectTask = () => SelectTasks().task;
export const selectAllTasksBoard = () => SelectTasks().allTasksBoard;
export const selectCreatedTask = () => SelectTasks().createdTask;
export const selectDeletedTask = () => SelectTasks().deletedTask;

export const selectOrderNewTask = createSelector(
  [selectAllTasksBoard, (columnId) => columnId],
  (allTasksBoard, columnId) => {
    const tasksColumn = allTasksBoard.filter((task) => task.columnId === columnId);
    return tasksColumn.length ? allTasksBoard[allTasksBoard.length - 1].order + 1 : 1;
  }
);

export const selectTaskColumn = createSelector(
  [selectAllTasksBoard, (columnId) => columnId],
  (allTasksBoard, columnId) => {
    return allTasksBoard.filter((task) => task.columnId === columnId);
  }
);
