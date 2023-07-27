import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserProfile from "../../Libs/Services/UserProfile.service";

interface IProps {
  logoutCallback?: () => void;
  newPasswordCallback: () => void;
}

export default function HAppBar(props: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(UserProfile.getUserName());
  }, []);
  //--------------------------------------------------//
  //--------------------------------------------------//
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      elevation={0}
      color="secondary"
    >
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1 }}></Box>
        <Typography variant="h6" p={1} color="#fff">
          {`WELCOME`}
        </Typography>
        <Button
          key={"username"}
          sx={{ color: "#fff" }}
          onClick={handleMenu}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Typography variant="h6" noWrap color="#fff">
            {username}
          </Typography>
        </Button>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { handleClose(); props.newPasswordCallback(); }}>
            Change Password
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); props.logoutCallback && props.logoutCallback(); }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
