import { Input, InputProps } from '@chakra-ui/react';
import { useController, UseControllerProps } from 'react-hook-form';

type TControlInputBaseProps = UseControllerProps & InputProps;

export const ControlInputBase = ({ name, rules, ...inputProps }: TControlInputBaseProps) => {
  const { field } = useController({ name, rules });

  return (
    <Input
      size="sm"
      errorBorderColor="red.300"
      _focus={{ borderColor: 'blue.500' }}
      {...field}
      {...inputProps}
    />
  );
};
