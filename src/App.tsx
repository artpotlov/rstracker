import { Outlet } from 'react-router-dom';
import { Footer } from 'components/Footer';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <ChakraProvider>
      <Flex minH="100vh" flexDirection="column">
        <Header />
        <Box as="main" flexGrow="1" position="relative">
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};
