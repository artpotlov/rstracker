import { useToast } from '@chakra-ui/react';

type TToastStatus = 'success' | 'warning' | 'error' | 'info';
type TToastArgs = {
  status: TToastStatus;
  title?: string;
  description?: string;
};

export const useAppToast = () => {
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'bottom',
  });

  return ({ status, title, description }: TToastArgs) => {
    toast({
      status,
      title,
      description,
    });
  };
};
