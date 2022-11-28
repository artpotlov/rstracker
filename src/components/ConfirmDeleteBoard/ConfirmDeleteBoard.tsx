import { Button, ModalFooter } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { selectDeletedBoard, selectIsLoadingBoards } from 'store/boards/boards.selectors';
import { deleteBoardThunk } from 'store/boards/boards.thunk';

export const ConfirmDeleteBoard = () => {
  const { t } = useTranslation();
  const isLoadingBoards = selectIsLoadingBoards();
  const deletedBoard = selectDeletedBoard();
  const dispatch = useAppDispatch();

  const deleteBoard = () => {
    if (deletedBoard) {
      dispatch(deleteBoardThunk(deletedBoard));
    }
  };

  return (
    <ModalFooter>
      <Button
        colorScheme="red"
        opacity={'0.9'}
        variant={'outline'}
        size="sm"
        isLoading={isLoadingBoards}
        onClick={deleteBoard}
      >
        {t('boards.delete')}
      </Button>
    </ModalFooter>
  );
};
