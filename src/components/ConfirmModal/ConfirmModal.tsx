import { Button, ModalFooter } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type TConfirmModalProps = {
  confirm: () => void;
  isLoading: boolean;
};

export const ConfirmModal = ({ confirm, isLoading }: TConfirmModalProps) => {
  const { t } = useTranslation();

  return (
    <ModalFooter>
      <Button
        colorScheme="red"
        opacity={'0.9'}
        variant={'outline'}
        size="sm"
        isLoading={isLoading}
        onClick={confirm}
      >
        {t('boards.delete')}
      </Button>
    </ModalFooter>
  );
};
