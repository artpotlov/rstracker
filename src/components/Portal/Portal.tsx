import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

type TPortalProps = {
  children: JSX.Element;
  title: string;
  handleClose: <T>(args?: T) => void;
  isOpen: boolean;
};

export const Portal = ({ children, title, handleClose, isOpen }: TPortalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent mx="5px">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
};
