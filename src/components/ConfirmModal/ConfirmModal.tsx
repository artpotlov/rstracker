import { Button, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type TConfirmModalProps = {
  confirm: () => void;
  isLoading: boolean;
  question: string;
  handleClose: () => void;
};

export const ConfirmModal = ({ confirm, isLoading, question, handleClose }: TConfirmModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <ModalBody>
        <Text>{question}</Text>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="red"
          opacity={'0.9'}
          variant={'outline'}
          size="sm"
          isLoading={isLoading}
          onClick={confirm}
        >
          {t('forms.delete')}
        </Button>
        <Button
          colorScheme="blue"
          variant="outline"
          ml="2"
          size="sm"
          disabled={isLoading}
          onClick={handleClose}
        >
          {t('forms.cancel')}
        </Button>
      </ModalFooter>
    </>
  );
};
