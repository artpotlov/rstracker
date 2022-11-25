import { IconButton, IconButtonProps } from '@chakra-ui/react';

export const IconButtonBase = (props: IconButtonProps) => {
  return (
    <IconButton
      colorScheme="whiteAlpha"
      variant="ghost"
      size="xs"
      p="0"
      color={'gray.500'}
      _hover={{ color: 'blue.500' }}
      {...props}
    />
  );
};
