import { Outlet, useLocation } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer';
import { Box, Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { pathRoutes } from './router/router';

export const App = () => {
  const [isNotBoardPage, setBoardPage] = useState(true);
  const matchPath = useLocation();
  const checkPage = useCallback((path: string) => {
    const match = new RegExp(pathRoutes.boards + '/\\w+$', 'i');
    return !match.test(path);
  }, []);

  useEffect(() => {
    setBoardPage(checkPage(matchPath.pathname));
  }, [matchPath, checkPage]);

  return (
    <Flex minH="100vh" flexDirection="column">
      <Header />
      <Box as="main" flexGrow="1" position="relative">
        <Outlet />
      </Box>
      {isNotBoardPage && <Footer />}
    </Flex>
  );
};
