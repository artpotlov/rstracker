import { Stack } from '@chakra-ui/react';
import { TaskItem } from 'components/TaskItem/TaskItem';
import { selectTaskColumn } from 'store/tasks/tasks.selectors';
import { Droppable } from '@hello-pangea/dnd';
import { DRAGGABLE_TYPES } from 'shared/consts';

type TTasksListProps = {
  columnId: string;
};

export const TasksList = ({ columnId }: TTasksListProps) => {
  const tasksBoard = selectTaskColumn(columnId);

  return (
    <Droppable droppableId={columnId} type={DRAGGABLE_TYPES.task}>
      {(provided) => (
        <Stack spacing="4" px={2} minH="40px" {...provided.droppableProps} ref={provided.innerRef}>
          {tasksBoard.map((task, index) => (
            <TaskItem key={task._id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
};
