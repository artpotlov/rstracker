import { ReactComponent as SVG404 } from 'assets/images/errors/404.svg';
import { Button, Container, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { pathRoutes } from '../router/router';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer';

export const ErrorPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'errorPage' });

  return (
    <Flex flexDirection="column" minH="100vh" justifyContent="space-around">
      <Header />
      <Container flexGrow={1}>
        <Flex justifyContent="center" alignItems="center" flexDirection="column" mt={4} mb={4}>
          <SVG404 />
          <Link to={pathRoutes.welcome}>
            <Button colorScheme="blue" size="md">
              {t('returnButton')}
            </Button>
          </Link>
        </Flex>
      </Container>
      <Footer />
    </Flex>
  );
};
