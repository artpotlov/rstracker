import { useEffect, useState } from 'react';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ReactComponent as FlagRu } from 'assets/images/header/flag_ru.svg';
import { ReactComponent as FlagEn } from 'assets/images/header/flag_en.svg';
import { useTranslation } from 'react-i18next';

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
  const { i18n } = useTranslation();

  const selectLanguage = (lang: TLanguage) => {
    i18n.changeLanguage(lang.code);
    setSelectLang(lang);
  };

  useEffect(() => {
    const currentLang = languageItems.find((lang) => lang.code === i18n.language);
    if (currentLang) {
      setSelectLang(currentLang);
    }
    // eslint-disable-next-line
  }, []);

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
