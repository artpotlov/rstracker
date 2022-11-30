import { Link } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { pathRoutes } from 'router/router';
import { selectBoard } from 'store/columns/columns.selectors';
import { TitlePage } from 'components/TitilePage/TitlePage';
import { CreateColumnForm } from 'components/CreateColumnForm/CreateColumnForm';
import { Portal } from 'components/Portal/Portal';
import { useState } from 'react';

export const KanbanHeader = () => {
  const { t } = useTranslation();
  const board = selectBoard();
  const [isCreateColumn, setCreateColumn] = useState(false);

  const handleTogglePortal = () => {
    setCreateColumn((prev) => !prev);
  };

  if (!board) {
    return null;
  }

  return (
    <>
      <Box mb={4}>
        <TitlePage title={board.title} />
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Link to={`/${pathRoutes.boards}`}>
            <Button colorScheme="blue" size="sm">
              {t('columns.back')}
            </Button>
          </Link>
          <Button colorScheme="blue" size="sm" onClick={handleTogglePortal}>
            {t('columns.create')}
          </Button>
        </Flex>
        <Flex gap={4}></Flex>
      </Box>
      <Portal title={''} isOpen={isCreateColumn} handleClose={handleTogglePortal}>
        <CreateColumnForm />
      </Portal>
    </>
  );
};
