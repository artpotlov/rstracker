import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Divider, Flex } from '@chakra-ui/react';
import { GroupObjectsNew } from '@carbon/icons-react';
import { RSTrackerLogo } from 'components/Logotype';
import { LanguageSelect } from 'components/LanguageSelect/LanguageSelect';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { Searching } from 'components/Searching/Searching';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { useTranslation } from 'react-i18next';
import { pathRoutes } from 'router/router';
import { selectAuthUser } from 'store/user/user.selectors';
import { userActions } from 'store/user/user.slice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { Portal } from 'components/Portal/Portal';
import { CreateBoardForm } from 'components/CreateBoardForm/CreateBoardForm';
import { getAllUsersThunk } from 'store/users/users.thunk';

export const Header = () => {
  const { t } = useTranslation();
  const [isCreateBoard, setCreateBoard] = useState(false);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isBoardPage = new RegExp(`^/${pathRoutes.boards}`).test(pathname);
  const { logoutUser } = userActions;
  const authUser = selectAuthUser();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleCreateBoard = () => {
    if (!isCreateBoard) {
      dispatch(getAllUsersThunk());
    }
    setCreateBoard((prev) => !prev);
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
              <IconButtonBase
                aria-label="add board"
                icon={<GroupObjectsNew size="24" />}
                onClick={toggleCreateBoard}
              />
            </>
          ) : (
            <Link to={authUser ? pathRoutes.boards : pathRoutes.sign}>
              <Button colorScheme="blue" size="sm">
                {authUser ? t('header.boards') : t('header.auth')}
              </Button>
            </Link>
          )}
          {!!authUser && <UserMenu handleLogout={handleLogout} />}
        </Flex>
      </Flex>
      <Divider />
      <Portal title="Create board" handleClose={toggleCreateBoard} isOpen={isCreateBoard}>
        <CreateBoardForm />
      </Portal>
    </>
  );
};
