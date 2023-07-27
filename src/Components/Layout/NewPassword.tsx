import {
  AppBar,
  DialogActions,
  IconButton,
  Toolbar,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import Container from "@mui/material/Container";
import UserProfileService from "../../Libs/Services/UserProfile.service";

interface IProps {
  onCloseHandler: () => void;
}

export function NewPassword(props: IProps) {
  const [inputs, setInputs] = useState({
    password: "",
    showPassword: false,
  });
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    // setDisabled(inputs.password.length > 6);
    setDisabled(!validatePassword(inputs.password));
  }, [inputs.password])
  //--------------------------------------------------//
  //--------------------------------------------------//
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleClickShowPassword = () => {
    setInputs({
      ...inputs,
      showPassword: !inputs.showPassword,
    });
  };

  const updateHandler = () => {
    UserProfileService.updatePassword(localStorage.email, inputs.password)
    props.onCloseHandler();
  }

  //validate password ยาวอย่างน้อย 4 ตัว ไม่มีช่องว่างs
  const validatePassword = (password: string) => {
    const regex = /^(?!.*\s).{4,}$/;
    return regex.test(password);
  };

  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.onCloseHandler}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <div style={{ flex: 1 }}></div>
          <Button autoFocus color="inherit" onClick={updateHandler} disabled={isDisabled}>
            UPDATE
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <Container component="main" maxWidth="xs">
          <Box component="form" noValidate autoComplete="off">
            <FormControl variant="outlined" fullWidth focused>
              <FormHelperText style={{ fontSize: 18 }}>New Password*</FormHelperText>
              <OutlinedInput
                id="outlined-size-password"
                name="password"
                type={inputs.showPassword ? "text" : "password"}
                value={inputs.password || ""}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      color="primary"
                    >
                      {inputs.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Container>
      </div>
    </>
  );
}
