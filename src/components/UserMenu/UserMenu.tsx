import { Avatar, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Edit, Exit } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';

type TUserMenuProps = {
  handleLogout: () => void;
  handleEdit: () => void;
};

export const UserMenu = ({ handleLogout, handleEdit }: TUserMenuProps) => {
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" cursor="pointer" />
      <MenuList>
        <MenuItem onClick={handleEdit}>
          <Edit size="24" />
          <Text pl={2}>{t('header.edit')}</Text>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Exit size="24" />
          <Text pl={2}> {t('header.logout')}</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
