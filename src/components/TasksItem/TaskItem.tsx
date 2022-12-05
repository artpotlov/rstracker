import { Edit } from '@carbon/icons-react';
import { Card, Flex, Text } from '@chakra-ui/react';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { TTasksSuccess } from 'types/types';
import { Draggable } from '@hello-pangea/dnd';

type TTaskItemProps = {
  task: TTasksSuccess;
  index: number;
};

export const TaskItem = ({ task, index }: TTaskItemProps) => {
  return (
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
            <IconButtonBase aria-label="edit task">
              <Edit size={20} />
            </IconButtonBase>
          </Flex>
        </Card>
      )}
    </Draggable>
  );
};
