import { useState } from 'react';
import { View } from '@carbon/icons-react';
import { Card, Flex, Text } from '@chakra-ui/react';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { TTasksSuccess } from 'types/types';
import { Draggable } from '@hello-pangea/dnd';
import { Portal } from 'components/Portal/Portal';
import { TaskInfoModal } from 'components/TaskInfoModal/TaskInfoModal';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { tasksActions } from 'store/tasks/tasks.slice';

type TTaskItemProps = {
  task: TTasksSuccess;
  index: number;
};

export const TaskItem = ({ task, index }: TTaskItemProps) => {
  const [isOpenTask, setOpenTask] = useState(false);
  const dispatch = useAppDispatch();
  const { setDeletedTask } = tasksActions;

  const toggleOpenTask = () => {
    setOpenTask((prev) => !prev);
  };

  const deleteTask = () => {
    if (isOpenTask) {
      toggleOpenTask();
    }
    dispatch(setDeletedTask(task));
  };

  return (
    <>
      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <Card
            p={2}
            backgroundColor="white"
            cursor="grab"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Flex justifyContent="space-between" gap={2}>
              <Text size="sm" flexGrow={1} w="80%">
                {task.title}
              </Text>
              <IconButtonBase aria-label="view task" onClick={toggleOpenTask}>
                <View size={20} />
              </IconButtonBase>
            </Flex>
          </Card>
        )}
      </Draggable>
      <Portal title={task.title} isOpen={isOpenTask} handleClose={toggleOpenTask}>
        <TaskInfoModal task={task} handleDelete={deleteTask} />
      </Portal>
    </>
  );
};
