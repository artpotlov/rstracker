import { Divider, Flex, Link } from '@chakra-ui/react';
import { RSSLogo, RSTrackerLogo } from '../Logotype';
import { LogoGithub } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import { GITHUB_LINKS } from '../../shared/consts';
import { pathRoutes } from '../../router/router';

export const Footer = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });

  return (
    <>
      <Divider />
      <Flex
        as="footer"
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        gap={4}
        p={4}
        bg="gray.50"
      >
        <Link href={pathRoutes.welcome}>
          <RSTrackerLogo h={6} />
        </Link>
        <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'center' }} gap={4}>
          <LogoGithub size={24} />
          <Link href={GITHUB_LINKS.artpotlov} color="gray.700" _hover={{ color: 'blue.500' }}>
            {t('github.artpotlov')}
          </Link>
          <Link href={GITHUB_LINKS.tonKristall} color="gray.700" _hover={{ color: 'blue.500' }}>
            {t('github.tonKristall')}
          </Link>
          <Link href={GITHUB_LINKS.slavaShchipunov} color="gray.700" _hover={{ color: 'blue.500' }}>
            {t('github.slavaShchipunov')}
          </Link>
          <Link href="https://rs.school/js" target="_blank">
            <RSSLogo h={6} />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
