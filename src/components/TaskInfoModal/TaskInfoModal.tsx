import { Box, Button, Flex, ModalBody, ModalFooter, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TTasksSuccess } from 'types/types';

type TTaskInfoModalPropps = {
  task: TTasksSuccess;
  handleDelete: () => void;
};

export const TaskInfoModal = ({ task, handleDelete }: TTaskInfoModalPropps) => {
  const { t } = useTranslation();

  return (
    <>
      <ModalBody>
        <Stack spacing={4}>
          <Text as="b">{t('forms.taskDescription')}</Text>
          <Text>{task.description}</Text>
          <Flex w="100%" flexWrap="wrap" gap={4}>
            <Box as="div" maxW="100%">
              <Text as="b">{t('tasks.author')}</Text>
              <Text>{task.userId}</Text>
            </Box>
            {!!task.users.length && (
              <Box as="div" maxW="100%">
                <Text as="b">{t('tasks.users')}</Text>
                <Text>{task.users.join(', ')}</Text>
              </Box>
            )}
          </Flex>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="red"
          opacity={'0.9'}
          variant={'outline'}
          size="sm"
          onClick={handleDelete}
        >
          {t('forms.delete')}
        </Button>
      </ModalFooter>
    </>
  );
};
