import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageGuard } from 'hoc/PageGuard';
import { useTranslation } from 'react-i18next';
import { EditProfileForm } from '../components/EditProfileForm/EditProfileForm';

export const ProfilePage = () => {
  const { t } = useTranslation();

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
