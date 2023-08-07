import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  FormControl,
  List,
  ListItemButton,
  RadioGroup,
  Toolbar,
  Typography,
} from "@mui/material";

import { drawerWidth } from "../../Libs/Constants/size";
import { primary } from '../../Styles/Theme';
import { UserRole } from '../../Libs/Models/IProfile.model';
export function Slidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<string | null>(null);

  useEffect(() => {
    setRoles(localStorage.getItem("roles"))
  }, [])

  //--------------------------------------------------//
  //--------------------------------------------------//
  function handleRadioChange(value: string) {
    //const modifiedString = originalString.replace(/\s/g, "");
    var path = value.replace(/\s/g, "").toLowerCase();
    if (path === "avatar") {
      setOpen(!open);
    } else {
      setOpen(path.indexOf("avatar") > -1);
      navigate(`/${path}`);
    }
  }

  const MenuBtn = ({ value }: any) => {
    var path = value.replace(/\s/g, "").toLowerCase();
    return (
      <>
        <ListItemButton dense onClick={() => handleRadioChange(path)}>
          <Typography
            variant="h6"
            color={location.pathname.indexOf('/' + path) > -1 ? "primary" : "text.secondary"}
            sx={{ display: 'flex', alignItems: 'flex-end', marginY: -0.5 }}
          >
            {value.toUpperCase()}
          </Typography>
        </ListItemButton>
        <Divider color={location.pathname.indexOf('/' + path) > -1 ? primary : "#FAFAFA"} />
      </>
    )
  }

  const CollapseMenu = ({ label, value }: any) => {
    return (
      <ListItemButton sx={{ height: 25, justifyContent: 'center' }}
        onClick={(event) => { handleRadioChange(`avatar/${label}`) }} >
        <Typography variant="subtitle1"
          color={location.pathname.toLowerCase().indexOf(label.toLowerCase()) > -1 ? "primary" : "text.secondary"}
          sx={{ right: 10, position: 'absolute' }}>
          {label}
        </Typography>
      </ListItemButton >
    )
  }
  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar variant="dense" />
      <Box sx={{ overflow: "auto", pl: 2/* , overflowY: 'hidden' */ }}>
        <FormControl fullWidth sx={{ mt: 4.5 }} margin="normal">
          <RadioGroup defaultValue={0} name="radio-buttons-group1">
            {(roles === UserRole.S || roles === UserRole.A || roles === UserRole.C) &&
              <><MenuBtn value="order" />
                <MenuBtn value="customer" /></>}
            {(roles === UserRole.S || roles === UserRole.A || roles === UserRole.B) &&
              <><MenuBtn value="avatar" />
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" >
                    <CollapseMenu label={"COLOR"} />
                  </List>
                  <List component="div" >
                    <CollapseMenu label={"SKIN"} value={"SKIN"} />
                    <CollapseMenu label={"EYE"} value={"EYE"} />
                    <CollapseMenu label={"NOSE"} value={"NOSE"} />
                    <CollapseMenu label={"MOUTH"} value={"MOUTH"} />
                    <CollapseMenu label={"HAIR"} value={"HAIR"} />
                    <CollapseMenu label={"CHEEK"} value={"CHEEK"} />
                  </List>
                  <List component="div" >
                    <CollapseMenu label={"SHIRT"} value={"SHIRT"} />
                    <CollapseMenu label={"OVERCOAT"} value={"OVERCOAT"} />
                    <CollapseMenu label={"PANT"} value={"TROUSERS"} />
                    <CollapseMenu label={"DRESS"} value={"DRESS"} />
                    <CollapseMenu label={"SOCK"} value={"SOCK"} />
                    <CollapseMenu label={"SHOE"} value={"SHOE"} />
                  </List>
                  <List component="div" >
                    <CollapseMenu label={"HEADBAND"} value={"HEADBAND"} />
                    <CollapseMenu label={"EARRING"} value={"EARRING"} />
                    <CollapseMenu label={"BRACELET"} value={"BRACELET"} />
                    <CollapseMenu label={"BAG"} value={"BAG"} />
                    <CollapseMenu label={"PROP"} value={"PROP"} />
                  </List>
                  <List component="div" >
                    <CollapseMenu label={"BACKGROUND"} value={"BACKGROUND"} />
                  </List>
                </Collapse>

                <MenuBtn value="character" />
                <MenuBtn value="product list" />
                {(roles === UserRole.S || roles === UserRole.A) && <MenuBtn value="employee" />}
              </>}
          </RadioGroup>
        </FormControl>
      </Box>
    </Drawer>
  );
}
