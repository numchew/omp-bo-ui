import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  TextField
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Loading } from '../../Common';
import { AuthContext } from '../../../Libs/Contexts/index';
import UserProfile from "../../../Libs/Services/UserProfile.service";
import { IProfile } from "../../../Libs/Models/IProfile.model";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

interface IProps {
  loginCallback: () => void;
  logoutCallback: () => void;
}

export const Auth = (props: IProps) => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const isLogin = useContext(AuthContext);
  const [isOpenBackdrop, setOpenBackdrop] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setOpenBackdrop(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //--------------------------------------------------//
  ///// Login /////
  const handleSubmit = (event: any) => {
    event.preventDefault();
    //setOpenBackdrop(true);
    UserProfile.login(inputs.username, inputs.password)
      .then((res: IProfile) => {
        setOpenBackdrop(false);
        MySwal.fire({
          html: <i>{"สำเร็จ"}</i>,
          icon: "success",
        }).then(() => {
          props.loginCallback();
        });
      })
      .catch((e) => {
        setOpenBackdrop(false);
        MySwal.fire({
          html: <i>{e}</i>,
          icon: "error",
        }).then(() => {
          props.logoutCallback();
        });
      });
  };

  //--------------------------------------------------//
  ///// Forget Password /////
  const handleForgetPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpenBackdrop(true);
    UserProfile.forgotPassword(inputs.username)
      .then((res) => {
        setOpenBackdrop(false);
        MySwal.fire({
          html: <i>{res}</i>,
          icon: "success",
        });
      })
      .catch((e) => {
        setOpenBackdrop(false);
        MySwal.fire({
          html: <i>{e}</i>,
          icon: "error",
        });
      });
  };

  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <>
      {!isLoading ? (
        <div className="Auth-body">
          <div className="Auth-bar">
            <div style={{ display: "flex" }}>
              <Typography variant="h5" color="#fff" sx={{ flexGrow: 1 }}>
                Diagnosis app
              </Typography>
              <Typography variant="h5" color="#fff">
                ADMIN
              </Typography>
            </div>
            <div className="a"></div>
          </div>
          <div className="Auth-dialog">
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={inputs.username || ""}
                    onChange={handleChange}
                    placeholder="EMAIL*"
                  />
                  <FormControl
                    sx={{ mt: 1 }}
                    //variant="outlined"
                    required
                    fullWidth
                  >
                    <OutlinedInput
                      id="password"
                      name="password"
                      type={inputs.showPassword ? "text" : "password"}
                      value={inputs.password || ""}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="primary"
                          >
                            {inputs.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="PASSWORD*"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, color: "#fff" }}
                  >
                    LOG IN
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleForgetPassword}
                      sx={{ color: "#fff" }}
                    >
                      ลืมรหัสผ่าน
                    </Button>
                  </div>
                </Box>
              </Box>
            </Container>
          </div>

        </div>
      ) :
        <Loading open={isOpenBackdrop} />}
    </>
  );
};
