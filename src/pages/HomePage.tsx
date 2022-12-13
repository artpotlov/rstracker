import { useEffect } from 'react';
import { PageGuard } from 'hoc/PageGuard';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getAllBoardsThunk } from 'store/boards/boards.thunk';
import { Box, Divider } from '@chakra-ui/react';
import { TitlePage } from 'components/TitilePage/TitlePage';
import { BoardsList } from 'components/BoardsList/BoardsList';
import { useTranslation } from 'react-i18next';
import { useAppToast } from 'hooks/useAppToast';
import { selectErrorBoards } from 'store/boards/boards.selectors';
import { boardsActions } from 'store/boards/boards.slice';
import { selectAuthUser } from 'store/user/user.selectors';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const toast = useAppToast();
  const errorBoards = selectErrorBoards();
  const { setError } = boardsActions;
  const userData = selectAuthUser();

  useEffect(() => {
    if (userData) {
      dispatch(getAllBoardsThunk());
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (errorBoards) {
      toast('error', t(`errors.${errorBoards}`));
      dispatch(setError(''));
    }
  }, [errorBoards, toast, t, dispatch, setError]);

  return (
    <PageGuard>
      <Box p={4}>
        <TitlePage title={t('boards.title')} />
        <Divider />
        <BoardsList />
      </Box>
    </PageGuard>
  );
};
