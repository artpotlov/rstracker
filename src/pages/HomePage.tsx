import { useEffect } from 'react';
import { PageGuard } from 'hoc/PageGuard';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getAllBoardsThunk } from 'store/boards/boards.thunk';
import { Container, Divider } from '@chakra-ui/react';
import { TitlePage } from 'components/TitilePage/TitlePage';
import { BoardsList } from 'components/BoardsList/BoardsList';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <PageGuard>
      <Container maxW="8xl">
        <TitlePage title={t('boards.title')} />
        <Divider />
        <BoardsList />
      </Container>
    </PageGuard>
  );
};
