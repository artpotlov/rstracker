import { Box } from '@chakra-ui/react';

type TEmptyDataTextProps = {
  text: string;
};

export const EmptyDataText = ({ text }: TEmptyDataTextProps) => {
  return (
    <Box py={2} textAlign="center">
      {text}
    </Box>
  );
};
