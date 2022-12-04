import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageGuard } from 'hoc/PageGuard';
import { KanbanHeader } from 'components/KanbanHeader/KanbanHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getAllColumnsThunk } from 'store/columns/columns.thunk';
import { KanbanColumns } from 'components/KanbanColumns/KanbanColumns';

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getAllColumnsThunk(id));
    }
  }, [id, dispatch]);

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
