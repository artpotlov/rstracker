import { forwardRef } from 'react';
import { IconButton, IconButtonProps } from '@chakra-ui/react';

export const IconButtonBase = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  return (
    <IconButton
      colorScheme="whiteAlpha"
      variant="ghost"
      size="xs"
      p="0"
      color={'gray.500'}
      _hover={{ color: 'blue.500' }}
      {...props}
      ref={ref}
    />
  );
});
