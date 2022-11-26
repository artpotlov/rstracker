import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Divider, Flex } from '@chakra-ui/react';
import { pathRoutes } from 'router/router';
import { GroupObjectsNew } from '@carbon/icons-react';
import { RSTrackerLogo } from 'components/Logotype';
import { LanguageSelect } from 'components/LanguageSelect/LanguageSelect';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { Searching } from 'components/Searching/Searching';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  //todo replace auth into redux
  const [isAuth, setAuth] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isBoardPage = new RegExp(`^/${pathRoutes.boards}`).test(pathname);

  const handleLogout = () => {
    setAuth(false);
    navigate(pathRoutes.welcome);
  };

  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        gap={{ base: 2, sm: 4 }}
        p={4}
        position={'relative'}
      >
        <Flex alignItems="center" gap={{ base: 2, sm: 4 }}>
          <Link to={pathRoutes.welcome}>
            <RSTrackerLogo h={6} />
          </Link>
          <LanguageSelect />
        </Flex>
        <Flex alignItems="center" gap={{ base: 2, sm: 4 }}>
          {isBoardPage ? (
            <>
              <Searching />
              <IconButtonBase aria-label="add board" icon={<GroupObjectsNew size="24" />} />
            </>
          ) : (
            <Link to={isAuth ? pathRoutes.boards : pathRoutes.auth}>
              <Button colorScheme="blue" size="sm">
                {isAuth ? t('header.boards') : t('header.auth')}
              </Button>
            </Link>
          )}
          {isAuth && <UserMenu handleLogout={handleLogout} />}
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};
