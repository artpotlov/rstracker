import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { SignInForm } from 'components/SignInForm/SignInForm';
import { SignUpForm } from 'components/SignUpForm/SignUpForm';
import { selectCreatedUserSign } from 'store/sign/sign.selectors';
import { pathRoutes } from 'router/router';
import { selectAuthUser } from 'store/user/user.selectors';
import { useTranslation } from 'react-i18next';

export const signTabs = {
  signIn: { tab: 'signIn', label: 'Sign In', value: 0 },
  signUp: { tab: 'signUp', label: 'Sign Up', value: 1 },
};

export const SignPage = () => {
  const { t } = useTranslation();
  const createdUser = selectCreatedUserSign();
  const authUser = selectAuthUser();
  const [tabIndex, setTabIndex] = useState(signTabs.signIn.value);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (createdUser) {
      handleTabsChange(signTabs.signIn.value);
    }
  }, [createdUser]);

  if (authUser) {
    return <Navigate to={`/${pathRoutes.boards}`} replace />;
  }

  return (
    <Container pt="50px" ml={{ base: 'auto', md: '10%' }}>
      <Box maxW="500px" px="10px" boxShadow="md" rounded="md">
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
