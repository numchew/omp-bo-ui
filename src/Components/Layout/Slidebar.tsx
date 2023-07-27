import React, { useState } from "react";
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
export function Slidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  //const { sub } = useParams();
  const [open, setOpen] = useState(false);

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

  const CollapseMenu = ({ label }: any) => {
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
            <MenuBtn value="order" />
            <MenuBtn value="customer" />
            <MenuBtn value="avatar" />
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" >
                <CollapseMenu label={"COLOR"} />
              </List>
              <List component="div" >
                <CollapseMenu label={"SKIN"} />
                <CollapseMenu label={"EYE"} />
                <CollapseMenu label={"NOSE"} />
                <CollapseMenu label={"MOUTH"} />
                <CollapseMenu label={"HAIR"} />
                <CollapseMenu label={"CHEEK"} />
              </List>
              <List component="div" >
                <CollapseMenu label={"SHIRT"} />
                <CollapseMenu label={"TROUSERS"} />
                <CollapseMenu label={"DRESS"} />
                <CollapseMenu label={"SOCK"} />
                <CollapseMenu label={"SHOE"} />
              </List>
              <List component="div" >
                <CollapseMenu label={"HEADBAND"} />
                <CollapseMenu label={"EARRING"} />
                <CollapseMenu label={"BRACELET"} />
                <CollapseMenu label={"BAG"} />
                <CollapseMenu label={"PROP"} />
              </List>
              <List component="div" >
                <CollapseMenu label={"BACKGROUND"} />
              </List>
            </Collapse>

            <MenuBtn value="character" />
            <MenuBtn value="product list" />
          </RadioGroup>
        </FormControl>


        {/* <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            กรุณาเลือกนักศึกษา!
          </Alert>
        </Snackbar> */}
      </Box>
    </Drawer>
  );
}
