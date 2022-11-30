import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageGuard } from 'hoc/PageGuard';
import { KanbanHeader } from 'components/KanbanHeader/KanbanHeader';
import { Container } from '@chakra-ui/react';
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
      <Container maxW="8xl">
        <KanbanHeader />
        <KanbanColumns />
      </Container>
    </PageGuard>
  );
};
