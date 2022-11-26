import { useState } from 'react';
import { Fade, Input } from '@chakra-ui/react';
import { Search, Close } from '@carbon/icons-react';
import { IconButtonBase } from 'components/IconButtonBase/IconButtonBase';
import { useTranslation } from 'react-i18next';

export const Searching = () => {
  const [isOpenSearch, setOpenSearch] = useState(false);
  const { t } = useTranslation();

  const handleOpenSearch = () => {
    setOpenSearch((prev) => !prev);
  };

  return (
    <>
      <Fade in={isOpenSearch}>
        <Input
          color="black"
          rounded="md"
          placeholder={t('header.search')}
          p={isOpenSearch ? '0 30px 0 16px' : 0}
          w={
            isOpenSearch ? { base: 'calc(100% - 100px)', sm: 'calc(100% - 118px)', lg: '500px' } : 0
          }
          position="absolute"
          right={{ base: '85px', sm: '100px' }}
          top="12px"
          bg="#ffffff"
        />
      </Fade>
      <IconButtonBase
        aria-label="add board"
        position={'relative'}
        zIndex="10"
        onClick={handleOpenSearch}
        icon={isOpenSearch ? <Close size="24" /> : <Search size="24" />}
      />
    </>
  );
};
