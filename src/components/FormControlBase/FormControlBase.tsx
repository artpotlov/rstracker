import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

type TFormControlBaseProps = {
  children: JSX.Element;
  label: string;
  errorMessage?: string;
};

export const FormControlBase = ({ children, label, errorMessage }: TFormControlBaseProps) => {
  return (
    <FormControl pb="3" isInvalid={!!errorMessage}>
      <FormLabel mb="0" fontSize={'sm'} color="gray.700">
        {label}
      </FormLabel>
      {children}
      <FormErrorMessage mt="0" position="absolute" right="0">
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
};
