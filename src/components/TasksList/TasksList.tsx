import { Stack } from '@chakra-ui/react';
import { TaskItem } from 'components/TasksItem/TaskItem';
import { selectTaskColumn } from 'store/tasks/tasks.selectors';

type TTasksListProps = {
  columnId: string;
};

export const TasksList = ({ columnId }: TTasksListProps) => {
  const tasksBoard = selectTaskColumn(columnId);

  return (
    <Stack spacing="4" px={2}>
      {tasksBoard.map((task) => (
        <TaskItem task={task} key={task._id} />
      ))}
    </Stack>
  );
};
