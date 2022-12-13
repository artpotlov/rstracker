import { useToast } from '@chakra-ui/react';

type TToastStatus = 'success' | 'warning' | 'error' | 'info';

export const useAppToast = () => {
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'bottom',
  });

  return (status: TToastStatus, title?: string, description?: string) => {
    toast({
      status,
      title,
      description,
    });
  };
};
