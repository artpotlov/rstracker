import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Edit, Exit } from '@carbon/icons-react';

type TUserMenuProps = {
  handleLogout: () => void;
};

export const UserMenu = ({ handleLogout }: TUserMenuProps) => {
  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" cursor="pointer" />
      <MenuList>
        <MenuItem icon={<Edit size="24" />}>Edit profile</MenuItem>
        <MenuItem icon={<Exit size="24" />} onClick={handleLogout}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
