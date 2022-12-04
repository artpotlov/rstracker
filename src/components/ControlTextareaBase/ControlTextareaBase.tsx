import { Textarea, TextareaProps } from '@chakra-ui/react';
import { useController, UseControllerProps } from 'react-hook-form';

type TControlTextareaBaseProps = UseControllerProps & TextareaProps;

export const ControlTextareaBase = ({ name, rules, ...inputProps }: TControlTextareaBaseProps) => {
  const { field } = useController({ name, rules });

  return (
    <Textarea
      size="sm"
      errorBorderColor="red.300"
      _focus={{ borderColor: 'blue.500' }}
      {...field}
      {...inputProps}
    />
  );
};
