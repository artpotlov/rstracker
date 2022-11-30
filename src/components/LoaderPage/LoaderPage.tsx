import { Box, Spinner } from '@chakra-ui/react';

export const LoaderPage = () => (
  <Box textAlign="center" mt="50px">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      margin="0 auto"
    />
  </Box>
);
