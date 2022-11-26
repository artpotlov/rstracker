import { Input, InputProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type TControlInputBaseProps = {
  name: string;
  rules: Record<string, string>;
};

export const ControlInputBase = ({
  name,
  rules,
  ...inputProps
}: TControlInputBaseProps & InputProps) => {
  const { register } = useFormContext();

  return (
    <Input
      size="sm"
      errorBorderColor="red.300"
      _focus={{ borderColor: 'blue.500' }}
      {...register(name, rules)}
      {...inputProps}
    />
  );
};
