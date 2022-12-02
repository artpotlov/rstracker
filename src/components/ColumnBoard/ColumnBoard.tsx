import { GroupObjectsNew, TrashCan } from '@carbon/icons-react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { columnsActions } from 'store/columns/columns.slice';
import { TColumnSuccess } from 'types/types';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { DraggableLine } from 'components/DraggableLine/DraggableLine';

type TColumnBoardProps = {
  column: TColumnSuccess;
  index: number;
};

export const ColumnBoard = ({ column, index }: TColumnBoardProps) => {
  const dispatch = useAppDispatch();
  const { setDeletedColumn } = columnsActions;

  const deleteColumn = () => {
    dispatch(setDeletedColumn(column));
  };

  const toggleCreateCard = () => {
    console.log('create card');
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
            backgroundColor="gray.100"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <DraggableLine {...provided} />
            <CardHeader p={0} pb={1} px={2}>
              <Flex justifyContent="space-between" alignItems="center" gap={2}>
                <Editable size="md" flexGrow={1} defaultValue={column.title}>
                  <EditablePreview fontWeight="bold" />
                  <EditableInput
                    px={1}
                    backgroundColor="white"
                    _focus={{ boxShadow: '0 0 0 1px #3182ce', border: '1px solid #3182ce' }}
                  />
                </Editable>
                <IconButtonBase
                  aria-label="delete column"
                  icon={<TrashCan size={24} />}
                  onClick={deleteColumn}
                />
              </Flex>
            </CardHeader>
            <CardBody px={0} py={2} overflowX="hidden" overflowY="auto">
              <Stack spacing="4" px={2}>
                <Card p={2} backgroundColor="white">
                  <Heading size="sm">Summary</Heading>
                  <Text pt="2" fontSize="sm">
                    View a summary of all your clients over the last month.
                  </Text>
                </Card>
                <Card p={2} backgroundColor="white">
                  <Heading size="sm">Overview</Heading>
                  <Text pt="2" fontSize="sm">
                    Check out the overview of your clients.
                  </Text>
                </Card>
                <Card p={2} backgroundColor="white">
                  <Heading size="sm">Analysis</Heading>
                  <Text pt="2" fontSize="sm">
                    See a detailed analysis of all your business clients.
                  </Text>
                </Card>
              </Stack>
            </CardBody>
            <CardFooter p={2}>
              <Button
                variant="ghost"
                p={0}
                h="auto"
                color="gray.500"
                _hover={{ color: 'blue.500' }}
                leftIcon={<GroupObjectsNew size="24" />}
                onClick={toggleCreateCard}
              >
                Добавить задачу
              </Button>
            </CardFooter>
          </Card>
        )}
      </Draggable>
    </Box>
  );
};
