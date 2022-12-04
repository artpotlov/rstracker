import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageGuard } from 'hoc/PageGuard';
import { useTranslation } from 'react-i18next';
import { EditProfileForm } from '../components/EditProfileForm/EditProfileForm';

export const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <PageGuard>
      <Container pt="50px" ml={{ base: 'auto', md: '10%' }}>
        <Box maxW="500px" p="26px" boxShadow="md" rounded="md">
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
