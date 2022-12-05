import { useState } from 'react';
import { AddAlt, TrashCan } from '@carbon/icons-react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Text } from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { columnsActions } from 'store/columns/columns.slice';
import { editColumnTitleThunk } from 'store/columns/columns.thunk';
import { TColumnSuccess } from 'types/types';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { DraggableLine } from 'components/DraggableLine/DraggableLine';
import { EditableHead } from 'components/EditableHead/EditableHead';
import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';
import { useTranslation } from 'react-i18next';
import { Portal } from 'components/Portal/Portal';
import { TasksList } from 'components/TasksList/TasksList';

type TColumnBoardProps = {
  column: TColumnSuccess;
  index: number;
};

export const ColumnBoard = ({ column, index }: TColumnBoardProps) => {
  const [isOpenTaskModal, setOpenTaskModal] = useState(false);
  const dispatch = useAppDispatch();
  const { setDeletedColumn } = columnsActions;
  const { t } = useTranslation();

  const deleteColumn = () => {
    dispatch(setDeletedColumn(column));
  };

  const editColumnTitle = (title: string) => {
    dispatch(editColumnTitleThunk({ ...column, title, index }));
  };

  const handleToggleTaskModal = () => {
    setOpenTaskModal((prev) => !prev);
  };

  return (
    <Box mb="10px">
      <Draggable draggableId={column._id} index={index}>
        {(provided) => (
          <Card
            pb={1}
            w="288px"
            minW="288px"
            maxH="100%"
            backgroundColor="gray.200"
            shadow="md"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <DraggableLine {...provided} />
            <CardHeader p={0} pb={1} px={2}>
              <Flex justifyContent="space-between" alignItems="center" gap={2}>
                <EditableHead title={column.title} handleSubmit={editColumnTitle} />
                <IconButtonBase aria-label="delete column" onClick={deleteColumn}>
                  <TrashCan size={24} />
                </IconButtonBase>
              </Flex>
            </CardHeader>
            <CardBody px={0} py={2} overflowX="hidden" overflowY="auto">
              <TasksList columnId={column._id} />
            </CardBody>
            <CardFooter p={2}>
              <Button
                variant="ghost"
                w="100%"
                h="auto"
                p={0}
                color="gray.500"
                _hover={{ color: 'blue.500' }}
                onClick={handleToggleTaskModal}
              >
                <AddAlt size={24} />
                <Text pl={2}>{t('tasks.addButton')}</Text>
              </Button>
            </CardFooter>
          </Card>
        )}
      </Draggable>
      <Portal
        title={t('tasks.createTitle')}
        handleClose={handleToggleTaskModal}
        isOpen={isOpenTaskModal}
      >
        <CreateTaskForm handleClose={handleToggleTaskModal} columnId={column._id} />
      </Portal>
    </Box>
  );
};
