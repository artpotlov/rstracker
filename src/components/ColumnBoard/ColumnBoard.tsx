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
import { useAppDispatch } from 'hooks/useAppDispatch';
import { columnsActions } from 'store/columns/columns.slice';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { TColumnSuccess } from 'types/types';

type TColumnBoardProps = {
  column: TColumnSuccess;
};

export const ColumnBoard = ({ column }: TColumnBoardProps) => {
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
      <Card py={2} w="288px" minW="288px" maxH="100%" backgroundColor="gray.100">
        <CardHeader p={0} pb={1} px={2}>
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Editable size="md" flexGrow={1} defaultValue={column.title}>
              <EditablePreview />
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
        <CardFooter p={0} pt={2} px={2}>
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
    </Box>
  );
};
