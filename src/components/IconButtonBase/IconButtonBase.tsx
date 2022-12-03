import { forwardRef } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

type TIconButtonProps = ButtonProps & { children: JSX.Element };

export const IconButtonBase = forwardRef<HTMLButtonElement, TIconButtonProps>((props, ref) => {
  return (
    <Button
      colorScheme="whiteAlpha"
      variant="ghost"
      size="xs"
      p="0"
      color={'gray.500'}
      _hover={{ color: 'blue.500' }}
      {...props}
      ref={ref}
    >
      {props.children}
    </Button>
  );
});
