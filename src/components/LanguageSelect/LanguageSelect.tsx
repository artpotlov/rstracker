import { useState } from 'react';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ReactComponent as FlagRu } from 'assets/images/header/flag_ru.svg';
import { ReactComponent as FlagEn } from 'assets/images/header/flag_en.svg';

const languageItems = [
  {
    flag: FlagEn,
    value: 'English',
    code: 'en',
  },
  {
    flag: FlagRu,
    value: 'Русский',
    code: 'ru',
  },
];

type TLanguage = typeof languageItems[0];

export const LanguageSelect = () => {
  const [selectLang, setSelectLang] = useState(languageItems[0]);

  const selectLanguage = (lang: TLanguage) => {
    setSelectLang(lang);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<selectLang.flag />}
        colorScheme="whiteAlpha"
        variant="ghost"
        size="sm"
      />
      <MenuList ml="2">
        {languageItems.map((lang) => (
          <MenuItem icon={<lang.flag />} onClick={() => selectLanguage(lang)} key={lang.code}>
            {lang.value}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
