import { Link } from 'react-router-dom';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { pathRoutes } from 'router/router';
import { selectBoard } from 'store/columns/columns.selectors';
import { TitlePage } from 'components/TitilePage/TitlePage';
import { CreateColumnForm } from 'components/CreateColumnForm/CreateColumnForm';
import { Portal } from 'components/Portal/Portal';
import { useState } from 'react';
import { Add, ArrowLeft } from '@carbon/icons-react';

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
              <ArrowLeft size={16} />
              <Text pl={2}>{t('columns.back')}</Text>
            </Button>
          </Link>
          <Button colorScheme="blue" size="sm" onClick={handleTogglePortal}>
            <Text pr={2}>{t('columns.create')}</Text>
            <Add size={16} />
          </Button>
        </Flex>
        <Flex gap={4}></Flex>
      </Box>
      <Portal title={t('columns.create')} isOpen={isCreateColumn} handleClose={handleTogglePortal}>
        <CreateColumnForm handleClose={handleTogglePortal} />
      </Portal>
    </>
  );
};
