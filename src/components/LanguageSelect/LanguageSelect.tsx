import { useState } from 'react';
import { Menu, MenuItem, Button, ListItemIcon } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import flagRu from 'assets/images/header/flag_ru.svg';
import flagEn from 'assets/images/header/flag_en.svg';
import { LanguageSelectBox } from './LanguageSelect.styled';

const languageItems = [
  {
    flag: flagEn,
    country: { value: 'English', code: 'en' },
  },
  {
    flag: flagRu,
    country: { value: 'Russian', code: 'ru' },
  },
];

type TLanguage = typeof languageItems[0];

export const LanguageSelect = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectLang, setSelectLang] = useState(languageItems[0]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectLanguage = (lang: TLanguage) => {
    setSelectLang(lang);
    handleClose();
  };

  return (
    <LanguageSelectBox>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<img src={selectLang.flag} />}
        endIcon={<KeyboardArrowDownIcon />}
      />
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {languageItems.map((lang) => (
          <MenuItem onClick={() => selectLanguage(lang)} key={lang.country.code}>
            <ListItemIcon>
              <img src={lang.flag} />
            </ListItemIcon>
            {lang.country.value}
          </MenuItem>
        ))}
      </Menu>
    </LanguageSelectBox>
  );
};
