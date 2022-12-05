import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer';
import { Box, Flex } from '@chakra-ui/react';

export const App = () => {
  return (
    <Flex minH="100vh" flexDirection="column">
      <Header />
      <Box as="main" flexGrow="1" position="relative">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};
