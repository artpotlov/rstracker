import { Edit } from '@carbon/icons-react';
import { Card, Flex, Text } from '@chakra-ui/react';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { TTasksSuccess } from 'types/types';

type TTaskItemProps = {
  task: TTasksSuccess;
};

export const TaskItem = ({ task }: TTaskItemProps) => {
  return (
    <Card p={2} backgroundColor="white">
      <Flex justifyContent="space-between" gap={2}>
        <Text size="sm" flexGrow={1} w="80%">
          {task.title}
        </Text>
        <IconButtonBase aria-label="edit task">
          <Edit size={20} />
        </IconButtonBase>
      </Flex>
    </Card>
  );
};
