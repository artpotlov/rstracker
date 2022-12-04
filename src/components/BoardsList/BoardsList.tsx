import { MouseEvent } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Portal } from 'components/Portal/Portal';
import { useTranslation } from 'react-i18next';
import {
  selectAllBoards,
  selectDeletedBoard,
  selectIsLoadingBoards,
} from 'store/boards/boards.selectors';
import { TBoardSuccess } from 'types/types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { boardsActions } from 'store/boards/boards.slice';
import { useNavigate } from 'react-router-dom';
import { pathRoutes } from 'router/router';
import { deleteBoardThunk } from 'store/boards/boards.thunk';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';

export const BoardsList = () => {
  const { t } = useTranslation();
  const isLoadingBoards = selectIsLoadingBoards();
  const allBoards = selectAllBoards();
  const deletedBoard = selectDeletedBoard();
  const dispatch = useAppDispatch();
  const { setDeletedBoard } = boardsActions;
  const navigate = useNavigate();

  const deleteBoard = (event: MouseEvent<HTMLButtonElement>, board: TBoardSuccess) => {
    event.stopPropagation();
    dispatch(setDeletedBoard(board));
  };

  const handleCloseConfirm = () => {
    dispatch(setDeletedBoard(null));
  };

  const handleClickBoard = (boardId: string) => {
    navigate(`/${pathRoutes.boards}/${boardId}`);
  };

  const confirmDeleteBoard = () => {
    if (deletedBoard) {
      dispatch(deleteBoardThunk(deletedBoard));
    }
  };

  return (
    <Stack spacing="4" mt={4}>
      {allBoards.map((board) => (
        <Card
          key={board._id}
          size="sm"
          cursor={'pointer'}
          onClick={() => handleClickBoard(board._id)}
        >
          <CardHeader pt="1" pb="0">
            <Heading size="sm" color={'blue.400'}>
              {board.title}
            </Heading>
          </CardHeader>
          <CardBody pt={0}>
            <Flex justifyContent={'space-between'}>
              <Box pr={1} fontSize={14} maxW="calc(100% - 85px)" color="gray.700">
                <Text overflow="hidden" textOverflow="ellipsis" sx={{ wordWrap: 'normal' }}>
                  {board.owner}
                </Text>
              </Box>
              <Button
                colorScheme="red"
                opacity={'0.9'}
                minW="78px"
                variant={'outline'}
                size="sm"
                alignSelf={'flex-end'}
                onClick={(event) => deleteBoard(event, board)}
              >
                {t('boards.delete')}
              </Button>
            </Flex>
          </CardBody>
        </Card>
      ))}
      <Portal
        title={`${t('boards.delete')} ${deletedBoard?.title}?`}
        handleClose={handleCloseConfirm}
        isOpen={!!deletedBoard}
      >
        <ConfirmModal confirm={confirmDeleteBoard} isLoading={isLoadingBoards} />
      </Portal>
    </Stack>
  );
};
