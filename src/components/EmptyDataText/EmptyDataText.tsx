import { Box } from '@chakra-ui/react';

type TEmptyDataTextProps = {
  text: string;
};

export const EmptyDataText = ({ text }: TEmptyDataTextProps) => {
  return <Box textAlign="center">{text}</Box>;
};
