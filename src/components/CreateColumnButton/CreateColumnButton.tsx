import { Button, useDisclosure } from '@chakra-ui/react';
import { Portal } from '../Portal/Portal';
import { useTranslation } from 'react-i18next';
import { CreateColumnForm } from '../CreateColumnForm/CreateColumnForm';

export const CreateColumnButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  return (
    <>
      <Button colorScheme="blue" size="sm" onClick={onOpen}>
        {t('addColumnButton')}
      </Button>
      <Portal title={t('createColumnModal.title')} handleClose={onClose} isOpen={isOpen}>
        <CreateColumnForm onClose={onClose} />
      </Portal>
    </>
  );
};
