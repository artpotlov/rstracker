import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { ReactComponent as RSSLogoSVG } from '../../../assets/images/logotypes/rsslogo.svg';

export const RSSLogo = (props: BoxProps) => {
  return (
    <Box {...props}>
      <RSSLogoSVG />
    </Box>
  );
};
