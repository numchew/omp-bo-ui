import {
    AppBar,
    IconButton,
    Toolbar,
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
import { DProfile, IProfile } from '../../Libs/Models/IProfile.model';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface IProps {
    onCloseHandler: () => void;
}

export function CreateNewUser(props: IProps) {
    const [inputs, setInputs] = useState({
        password: "",
        showPassword: false,
    });
    const [isDisabled, setDisabled] = useState(true);
    const [newUser, setNewUser] = useState<IProfile>(DProfile())

    useEffect(() => {
        setDisabled(!(
            newUser.email.length > 0 &&
            validatePassword(inputs.password) &&
            newUser.fname.length > 0 &&
            newUser.lname.length > 0
        ));
    }, [inputs.password, newUser])
    //--------------------------------------------------//
    //--------------------------------------------------//
    //validate password ยาวอย่างน้อย 4 ตัว ไม่มีช่องว่างs
    const validatePassword = (password: string) => {
        const regex = /^(?!.*\s).{4,}$/;
        return regex.test(password);
    };

    //--------------------------------------------------//
    //--------------------------------------------------//
    const handleChangePassword = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleChangeUsername = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewUser((values) => ({ ...values, [name]: value }));
    };

    const handleClickShowPassword = () => {
        setInputs({
            ...inputs,
            showPassword: !inputs.showPassword,
        });
    };

    const createHandler = () => {
        UserProfileService.create(newUser, inputs.password)
        props.onCloseHandler();
    }


    const onChangeRoleEventHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setNewUser((values) => ({ ...values, roles: value }));
    }
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
                    <Button autoFocus color="inherit" onClick={createHandler} disabled={isDisabled}>
                        CREATE
                    </Button>
                </Toolbar>
            </AppBar>

            <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                <Container component="main" maxWidth="xs">
                    <Box id="USERNAME" component="form" noValidate autoComplete="off"
                        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <FormControl variant="outlined" fullWidth focused>
                            <FormHelperText style={{ fontSize: 16 }}>Email</FormHelperText>
                            <OutlinedInput
                                id="outlined-size-username"
                                name="email"
                                value={newUser.email || ""}
                                onChange={handleChangeUsername}
                            />
                        </FormControl>
                        <FormControl variant="outlined" fullWidth focused>
                            <FormHelperText style={{ fontSize: 18 }}>Password*</FormHelperText>
                            <OutlinedInput
                                id="outlined-size-password"
                                name="password"
                                type={inputs.showPassword ? "text" : "password"}
                                value={inputs.password || ""}
                                onChange={handleChangePassword}
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
                        <FormControl variant="outlined" fullWidth focused>
                            <FormHelperText style={{ fontSize: 18 }}>Firstname*</FormHelperText>
                            <OutlinedInput
                                id="outlined-size-fname"
                                name="fname"
                                value={newUser.fname || ""}
                                onChange={handleChangeUsername}
                            />
                        </FormControl>
                        <FormControl variant="outlined" fullWidth focused>
                            <FormHelperText style={{ fontSize: 18 }}>Lastname*</FormHelperText>
                            <OutlinedInput
                                id="outlined-size-lname"
                                name="lname"
                                value={newUser.lname || ""}
                                onChange={handleChangeUsername}
                            />
                        </FormControl>
                        <div id="ROLE" style={{ alignSelf: 'center' }}>
                            <RadioGroup row value={newUser.roles} onChange={onChangeRoleEventHandler}>
                                <FormControlLabel control={<Radio />} label="All Access" value="allaccess" />
                                <FormControlLabel control={<Radio />} label="Asset" value="asset" />
                                <FormControlLabel control={<Radio />} label="Cashier" value="cashier" />
                            </RadioGroup>
                        </div>
                    </Box>
                </Container>
            </div>
        </>
    );
}
