import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/system';
import { Tab, Tabs } from '@mui/material';
import { SignInForm } from 'components/SignInForm/SignInForm';
import { SignUpForm } from 'components/SignUpForm/SignUpForm';
import { selectCreatedUserSign } from 'store/sign/sign.selectors';
import { pathRoutes } from 'router/router';
import { selectAuthUser } from 'store/user/user.selectors';

type TLocationState = 'signIn' | 'signUp';

export const signTabs = {
  signIn: { tab: 'signIn', label: 'Sign In', value: '0' },
  signUp: { tab: 'signUp', label: 'Sign Up', value: '1' },
};

export const SignPage = () => {
  const { state } = useLocation();
  const createdUser = selectCreatedUserSign();
  const authUser = selectAuthUser();
  const [tab, setTab] = useState(signTabs.signIn.value);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  useEffect(() => {
    const locationState: TLocationState = state in signTabs ? state : signTabs.signIn.tab;
    setTab(signTabs[locationState].value);
  }, [state]);

  useEffect(() => {
    if (createdUser) {
      setTab(signTabs.signIn.value);
    }
  }, [createdUser]);

  if (authUser) {
    return <Navigate to={`/${pathRoutes.boards}`} replace />;
  }

  return (
    <Container sx={{ paddingTop: '50px' }}>
      <Box sx={{ maxWidth: '500px' }}>
        <Box sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label={signTabs.signIn.label} value={signTabs.signIn.value} />
            <Tab label={signTabs.signUp.label} value={signTabs.signUp.value} />
          </Tabs>
        </Box>
        <div hidden={tab !== signTabs.signIn.value}>
          <SignInForm />
        </div>
        <div hidden={tab !== signTabs.signUp.value}>
          <SignUpForm />
        </div>
      </Box>
    </Container>
  );
};
