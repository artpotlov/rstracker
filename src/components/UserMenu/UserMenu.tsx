import { useState } from 'react';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { AccountCircle, Edit, Logout } from '@mui/icons-material';

type TUserMenuProps = {
  handleLogout: () => void;
};

export const UserMenu = ({ handleLogout }: TUserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="large" onClick={handleMenu}>
        <AccountCircle fontSize="large" color="inherit" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose} onClick={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};
