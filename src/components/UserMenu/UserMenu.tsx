import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Edit, Exit } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';

type TUserMenuProps = {
  handleLogout: () => void;
};

export const UserMenu = ({ handleLogout }: TUserMenuProps) => {
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" cursor="pointer" />
      <MenuList>
        <MenuItem icon={<Edit size="24" />}>{t('header.edit')}</MenuItem>
        <MenuItem icon={<Exit size="24" />} onClick={handleLogout}>
          {t('header.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
