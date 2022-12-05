import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { pathRoutes } from '../router/router';
import {
  Column,
  IbmCloudDirectLink_1DedicatedHosting,
  UserCertification,
} from '@carbon/icons-react';

import { ReactComponent as AvatarArtpotlov } from 'assets/images/welcome/artpotlov.svg';
import { ReactComponent as AvatarTonKristall } from 'assets/images/welcome/tonKristall.svg';
import { ReactComponent as AvatarSlava } from 'assets/images/welcome/slava.svg';
import { useTranslation } from 'react-i18next';
import { PersonCard } from '../components/PersonCard/PersonCard';
import { selectAuthUser } from '../store/user/user.selectors';

export const WelcomePage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'welcome' });
  const authUser = selectAuthUser();

  return (
    <Container mt="50px" mb="50px" maxW="5xl" color="gray.700" centerContent>
      <Box as="section">
        <Flex gap={4} flexDirection="column" alignItems="center">
          <Heading size={{ base: '2xl' }} lineHeight="1.5" textAlign="center">
            {t('sectionOne.title')}
            <Text color="teal.500">RS Tracker</Text>
          </Heading>
          <Image
            src="https://images.ctfassets.net/rz1oowkt5gyp/3ZjLCD2fANfXYSN3ar9WpE/dc84a408c6a3ee89bee4a646ff6d5966/Lists_2x.png?w=1140&fm=webp"
            alt="RS Tracker"
          />
          <Flex justifyContent="center" gap={4}>
            <Link
              href={authUser ? pathRoutes.boards : pathRoutes.sign}
              _hover={{ textDecoration: 'none' }}
            >
              <Button colorScheme="green" size="lg">
                {t('sectionOne.buttonStart')}
              </Button>
            </Link>
            <Link
              href="https://github.com/artpotlov/rstracker"
              _hover={{ textDecoration: 'none' }}
              target="_blank"
            >
              <Button colorScheme="gray" size="lg">
                Github
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>

      <Box as="section" margin="80px 0" maxW="lg">
        <Stack spacing={4} textAlign="center">
          <Heading size="lg">{t('sectionTwo.title')}</Heading>
          <Text fontSize="lg">{t('sectionTwo.description')}</Text>
        </Stack>
      </Box>

      <Box as="section">
        <Flex flexWrap="wrap" gap={4} justifyContent="center">
          <Card maxW="314px">
            <CardHeader>
              <Stack spacing={4}>
                <IbmCloudDirectLink_1DedicatedHosting size={32} />
                <Heading size="md">{t('sectionThree.featureOne.title')}</Heading>
              </Stack>
            </CardHeader>
            <CardBody color="gray.500">
              <Text>{t('sectionThree.featureOne.description')}</Text>
            </CardBody>
          </Card>
          <Card maxW="314px">
            <CardHeader>
              <Stack spacing={4}>
                <Column size={32} />
                <Heading size="md">{t('sectionThree.featureTwo.title')}</Heading>
              </Stack>
            </CardHeader>
            <CardBody color="gray.500">
              <Text>{t('sectionThree.featureTwo.description')}</Text>
            </CardBody>
          </Card>
          <Card maxW="314px">
            <CardHeader>
              <Stack spacing={4}>
                <UserCertification size={32} />
                <Heading size="md">{t('sectionThree.featureThree.title')}</Heading>
              </Stack>
            </CardHeader>
            <CardBody color="gray.500">
              <Text>{t('sectionThree.featureThree.description')}</Text>
            </CardBody>
          </Card>
        </Flex>
      </Box>

      <Box as="section" mt="50px" maxW="lg" textAlign="center">
        <Stack spacing={4}>
          <Text fontSize="lg">{t('sectionFour.blockOne')}</Text>
          <Text fontSize="lg">
            <Text as="b">RS School</Text>
            {t('sectionFour.blockTwo')}
          </Text>
        </Stack>
      </Box>

      <Box as="section" textAlign="center" mt="50px">
        <Heading size="lg" mb="30px">
          {t('sectionFive.title')}
        </Heading>
        <Flex gap={4} flexWrap="wrap" justifyContent="center">
          <PersonCard
            name={t('sectionFive.teams.artpotlov.name')}
            position={t('sectionFive.teams.artpotlov.position')}
            avatar={<AvatarArtpotlov />}
            githubNick="artpotlov"
            githubLink="https://github.com/artpotlov"
            description={t('sectionFive.teams.artpotlov.description')}
          />
          <PersonCard
            name={t('sectionFive.teams.tonKristall.name')}
            position={t('sectionFive.teams.tonKristall.position')}
            avatar={<AvatarTonKristall />}
            githubNick="tonKristall"
            githubLink="https://github.com/tonKristall"
            description={t('sectionFive.teams.tonKristall.description')}
          />
          <PersonCard
            name={t('sectionFive.teams.slavaShchipunov.name')}
            position={t('sectionFive.teams.slavaShchipunov.position')}
            avatar={<AvatarSlava />}
            githubNick="Slava-Shchipunov"
            githubLink="https://github.com/Slava-Shchipunov"
            description={t('sectionFive.teams.slavaShchipunov.description')}
          />
        </Flex>
      </Box>
    </Container>
  );
};
