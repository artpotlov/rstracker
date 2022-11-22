import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { ReactComponent as RSTrackerSVG } from '../../../assets/images/logotypes/rstracker.svg';

export const RSTrackerLogo = (props: BoxProps) => {
  return (
    <Box {...props}>
      <RSTrackerSVG />
    </Box>
  );
};
