import { CheckmarkOutline, CloseOutline } from '@carbon/icons-react';
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from '@chakra-ui/react';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { useEffect, useState } from 'react';

type TEditebleHeadProps = {
  title: string;
  handleSubmit: (value: string) => void;
};

export const EditableHead = ({ title, handleSubmit }: TEditebleHeadProps) => {
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    setValue(value);
  };

  const checkSubmit = (value: string) => {
    if (value.trim()) {
      handleSubmit(value);
    } else {
      setValue(title);
    }
  };

  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } = useEditableControls();

    return isEditing ? (
      <ButtonGroup
        spacing={0}
        position="absolute"
        top="50%"
        right="5px"
        transform="translate(0, -50%)"
        zIndex={10}
      >
        <IconButtonBase
          _hover={{ color: 'green.500' }}
          icon={<CheckmarkOutline size={20} />}
          {...getSubmitButtonProps()}
        />
        <IconButtonBase icon={<CloseOutline size={20} />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : null;
  };

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <Editable
      size="md"
      flexGrow={1}
      value={value}
      selectAllOnFocus={false}
      onChange={handleChange}
      onSubmit={checkSubmit}
    >
      <EditablePreview fontWeight="bold" wordBreak="break-word" />
      <Box position="relative">
        <EditableInput
          pl={1}
          pr={14}
          backgroundColor="white"
          _focus={{ boxShadow: '0 0 0 1px #3182ce', border: '1px solid #3182ce' }}
        />
        <EditableControls />
      </Box>
    </Editable>
  );
};
