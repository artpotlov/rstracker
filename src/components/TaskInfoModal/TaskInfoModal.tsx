import { Box, Flex, ModalBody, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const TaskInfoModal = () => {
  const { t } = useTranslation();

  return (
    <>
      <ModalBody>
        <Stack spacing={4}>
          <Text as="b">{t('forms.taskDescription')}</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate
            delectus deserunt, dicta dolores enim fuga hic id laudantium maxime natus odio quam
            reiciendis tenetur voluptatum. Beatae culpa minima similique?
          </Text>
          <Flex flexWrap="wrap" gap={4}>
            <Box as="div">
              <Text as="b">{t('tasks.author')}</Text>
              <Text>User name</Text>
            </Box>
            <Box as="div">
              <Text as="b">{t('tasks.users')}</Text>
              <Text>User name, user name</Text>
            </Box>
          </Flex>
        </Stack>
      </ModalBody>
    </>
  );
};
