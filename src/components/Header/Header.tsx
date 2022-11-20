import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { LanguageSelect } from 'components/LanguageSelect/LanguageSelect';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { Logo } from 'components/Logo/Logo';
import { HeaderAppBar, HeaderContainer } from './Header.styled';
import { pathRoutes } from 'router/router';

export const Header = () => {
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
    <HeaderAppBar position="static" color="transparent">
      <HeaderContainer>
        <Logo />
        <LanguageSelect />
        {!isAuth ? (
          <>
            <NavLink to={pathRoutes.auth}>
              <Button variant="contained" sx={{ marginRight: '30px' }}>
                Sign In
              </Button>
            </NavLink>
            <NavLink to={pathRoutes.registration}>
              <Button variant="contained">Sign Up</Button>
            </NavLink>
          </>
        ) : (
          <>
            {isBoardPage ? (
              <Button
                variant="contained"
                startIcon={<AddCircleOutline />}
                sx={{ marginRight: '30px' }}
              >
                New board
              </Button>
            ) : (
              <Link to={pathRoutes.boards}>
                <Button variant="contained" sx={{ marginRight: '30px' }}>
                  Go to Main Page
                </Button>
              </Link>
            )}
            <UserMenu handleLogout={handleLogout} />
          </>
        )}
      </HeaderContainer>
    </HeaderAppBar>
  );
};
