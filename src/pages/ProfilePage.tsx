import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageGuard } from 'hoc/PageGuard';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppToast } from 'hooks/useAppToast';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { selectErrorSign } from 'store/sign/sign.selectors';
import { signActions } from 'store/sign/sign.slice';
import { EditProfileForm } from '../components/EditProfileForm/EditProfileForm';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const toast = useAppToast();
  const errorSign = selectErrorSign();
  const { setError } = signActions;

  useEffect(() => {
    if (errorSign) {
      toast('error', t(`errors.${errorSign}`));
      dispatch(setError(''));
    }
  }, [errorSign, toast, t, dispatch, setError]);

  return (
    <PageGuard>
      <Container mt="50px" mb="50px" display="flex" justifyContent="center" alignItems="center">
        <Box w="100%" maxW="500px" px="10px" boxShadow="md" rounded="md">
          <Tabs variant="enclosed-colored">
            <TabList>
              <Tab fontWeight="medium">{t('forms.edit')}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EditProfileForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </PageGuard>
  );
};
