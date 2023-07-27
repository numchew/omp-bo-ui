import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  Dialog,
  IconButton,
  Slide,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { TransitionProps } from "react-transition-group/Transition";
import { RootStore } from "../../Libs/Redux";
import { AuthContext } from "../../Libs/Contexts";
import HAppBar from "./HAppBar";
import { Slidebar } from "./Slidebar";
import { NewPassword } from "./NewPassword";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  logoutCallback?: () => void;
}

export default function Layout(props: IProps) {
  const navigate = useNavigate();
  const loading = useSelector((state: RootStore) => state.loader.loading);
  const isLogin = useContext(AuthContext);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openNewPass, setOpenNewPass] = useState(false);
  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <div className="app__body">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={loading}
      >
        <CircularProgress color="primary" thickness={6} />
      </Backdrop>
      <CssBaseline />
      <HAppBar
        logoutCallback={props.logoutCallback}
        newPasswordCallback={() => setOpenNewPass(true)}
      />
      <Slidebar />
      <Outlet />

      <IconButton
        onClick={() => setOpenAdd(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 40,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        color="primary"
        disableRipple={true}
      >
        <AddCircleRoundedIcon sx={{ fontSize: 50 }} />
      </IconButton>
      {/*        <Dialog fullScreen open={openAdd} TransitionComponent={Transition}>
        <CreateStudent onCloseHandler={() => setOpenAdd(false)} />
      </Dialog> */}
      <Dialog fullScreen open={openNewPass} TransitionComponent={Transition}>
        <NewPassword onCloseHandler={() => setOpenNewPass(false)} />
      </Dialog> {/* */}
    </div>
  );
}
