import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { SignInForm } from 'components/SignInForm/SignInForm';
import { SignUpForm } from 'components/SignUpForm/SignUpForm';
import { selectCreatedUserSign, selectErrorSign } from 'store/sign/sign.selectors';
import { pathRoutes } from 'router/router';
import { selectAuthUser } from 'store/user/user.selectors';
import { useTranslation } from 'react-i18next';
import { useAppToast } from 'hooks/useAppToast';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { signActions } from 'store/sign/sign.slice';

export const signTabs = {
  signIn: { tab: 'signIn', label: 'Sign In', value: 0 },
  signUp: { tab: 'signUp', label: 'Sign Up', value: 1 },
};

export const SignPage = () => {
  const { t } = useTranslation();
  const createdUser = selectCreatedUserSign();
  const errorSign = selectErrorSign();
  const authUser = selectAuthUser();
  const [tabIndex, setTabIndex] = useState(signTabs.signIn.value);
  const toast = useAppToast();
  const dispatch = useAppDispatch();
  const { setError } = signActions;

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (createdUser) {
      handleTabsChange(signTabs.signIn.value);
    }
  }, [createdUser]);

  useEffect(() => {
    if (errorSign) {
      toast('error', t(`errors.${errorSign}`));
      dispatch(setError(''));
    }
  }, [errorSign, toast, t, dispatch, setError]);

  if (authUser) {
    return <Navigate to={`/${pathRoutes.boards}`} replace />;
  }

  return (
    <Container mt="50px" mb="50px" display="flex" justifyContent="center" alignItems="center">
      <Box w="100%" maxW="500px" px="10px" boxShadow="md" rounded="md">
        <Tabs index={tabIndex} onChange={handleTabsChange} variant="enclosed-colored">
          <TabList>
            <Tab fontWeight="medium">{t('forms.signIn')}</Tab>
            <Tab fontWeight="medium">{t('forms.signUp')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignInForm />
            </TabPanel>
            <TabPanel>
              <SignUpForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
