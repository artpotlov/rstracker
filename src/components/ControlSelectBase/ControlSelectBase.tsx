import { Select, Props } from 'chakra-react-select';
import { UseControllerProps, useController } from 'react-hook-form';

type TControlSelectProps = UseControllerProps & Props;

export const ControlSelectBase = ({ name, rules, ...props }: TControlSelectProps) => {
  const { field } = useController({ name, rules });

  return <Select size="sm" errorBorderColor="red.300" {...field} {...props} />;
};
