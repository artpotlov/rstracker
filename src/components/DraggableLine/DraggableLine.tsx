import { Box } from '@chakra-ui/react';
import { DraggableProvided } from '@hello-pangea/dnd';

export const DraggableLine = (props: DraggableProvided) => {
  return (
    <Box
      mb={1}
      h="3"
      minH="3"
      backgroundColor="blue.500"
      borderRadius="md"
      position="relative"
      cursor="grab"
      _before={{
        content: '""',
        width: '40%',
        height: '2px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
      }}
      {...props.dragHandleProps}
    />
  );
};
