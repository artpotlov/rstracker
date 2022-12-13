import { motion, useScroll } from 'framer-motion';
import { Box } from '@chakra-ui/react';

export const ScrollLine = () => {
  const { scrollYProgress } = useScroll();

  return (
    <Box position="absolute" h="2px" bg="gray.100" bottom={0} left={0} right="2px">
      <Box
        as={motion.div}
        style={{ scaleX: scrollYProgress }}
        bg="blue.500"
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="100%"
        transformOrigin={0}
        zIndex={999}
      />
    </Box>
  );
};
