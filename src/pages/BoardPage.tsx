import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageGuard } from 'hoc/PageGuard';
import { KanbanHeader } from 'components/KanbanHeader/KanbanHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getAllColumnsThunk } from 'store/columns/columns.thunk';
import { KanbanColumns } from 'components/KanbanColumns/KanbanColumns';
import { useTranslation } from 'react-i18next';
import { useAppToast } from 'hooks/useAppToast';
import { selectErrorBoards } from 'store/boards/boards.selectors';
import { selectErrorColumns } from 'store/columns/columns.selectors';
import { selectErrorTasks } from 'store/tasks/tasks.selectors';
import { boardsActions } from 'store/boards/boards.slice';
import { columnsActions } from 'store/columns/columns.slice';
import { tasksActions } from 'store/tasks/tasks.slice';
import { getAllTasksBoardThunk } from 'store/tasks/tasks.thunk';

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const toast = useAppToast();
  const errorBoards = selectErrorBoards();
  const errorColumns = selectErrorColumns();
  const errorTasks = selectErrorTasks();

  useEffect(() => {
    if (id) {
      dispatch(getAllColumnsThunk(id));
      dispatch(getAllTasksBoardThunk(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (errorBoards) {
      toast('error', t(`errors.${errorBoards}`));
      dispatch(boardsActions.setError(''));
    }
    if (errorColumns) {
      toast('error', t(`errors.${errorColumns}`));
      dispatch(columnsActions.setError(''));
    }
    if (errorTasks) {
      toast('error', t(`errors.${errorTasks}`));
      dispatch(tasksActions.setError(''));
    }
  }, [errorBoards, errorColumns, errorTasks, toast, t, dispatch]);

  return (
    <PageGuard>
      <Box position="absolute" top={0} bottom={0} left={0} right={0}>
        <Flex px={4} pt={4} flexDirection="column" height="100%">
          <KanbanHeader />
          <Box position="relative" flexGrow={1}>
            <Box position="absolute" top={0} bottom={0} left={0} right={0}>
              <KanbanColumns />
            </Box>
          </Box>
        </Flex>
      </Box>
    </PageGuard>
  );
};
