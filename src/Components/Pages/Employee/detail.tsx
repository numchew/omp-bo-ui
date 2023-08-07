import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, FormControlLabel, RadioGroup, Radio, IconButton } from '@mui/material';
import { BUpdate, Search, TStatus } from '../../Common';
import { IProfile, DProfile, UserRole } from '../../../Libs/Models/IProfile.model';
import UserProfileService from '../../../Libs/Services/UserProfile.service';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export function EmployeeDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<IProfile>(DProfile());
    const [_id, setID] = useState("");
    const [password, setPassword] = useState("");
    const [newEmployee, setNewEmployee] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (id) {
            if (id.indexOf('newemployee') < 0) {
                setNewEmployee(false);
                UserProfileService.findOne(id).then(res => {
                    setData(JSON.parse(JSON.stringify(res)));
                    setID(res._id);
                }).catch((e) => { });
            } else {
                setNewEmployee(true);
            }
        }
    }, [id]);

    useEffect(() => {
        var _u = false;
        if (newEmployee) {
            _u = data.fname !== "" && data.lname !== "" && data.email !== "" &&
                data.phonenumber !== "" && password !== "";
        } else {
            _u = data.fname !== "" && data.lname !== "" && data.email !== "" &&
                data.phonenumber !== "";
        }
        setIsUpdated(_u);
    }, [data, newEmployee, password])
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onChangeFNameHandler = (value: string) => {
        setData((pre) => ({ ...pre, fname: value }));
    }

    const onChangeLNameHandler = (value: string) => {
        setData((pre) => ({ ...pre, lname: value }));
    }

    const onChangePhoneHandler = (value: string) => {
        setData((pre) => ({ ...pre, phonenumber: value }));
    }

    const onChangeEmailHandler = (value: string) => {
        setData((pre) => ({ ...pre, email: value }));
    }

    const onChangeRoleEventHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setData((values) => ({ ...values, roles: value }));
    }

    const onChangePasswordHandler = (value: string) => {
        setPassword(value);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onConfirm = async () => {
        UserProfileService.updateData(_id, data)
            .then(() => navigate(-1));
    };

    const onCreate = async () => {
        UserProfileService.create(data, password)
            .then(() => {
                navigate(-1);
            });
    };

    const onCancel = () => {
        navigate(-1);
    }

    const onDelete = async () => {
        UserProfileService.deleteOne(data._id).then(() => navigate(-1));
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <div className="flex-g" style={{ backgroundColor: '#F4F4F4' }}>
            <Box id="detail" sx={{ px: 2, pt: 2 }} >
                <Box className="flex-row flex-m" sx={{ height: 50 }}>
                    <div style={{ flex: 1 }}>
                        <TStatus title={'CUSTOMER ID'} msg={data._id} hStyle={{ width: 120 }}></TStatus>
                    </div>
                    {newEmployee ? <></> :
                        <IconButton onClick={onDelete}>
                            <DeleteForeverIcon sx={{ fontSize: 30, color: "#424242" }} />
                        </IconButton>}
                </Box>
                <Search lable={'Firstname'} value={data.fname} type={"fill"} hStyle={{ width: 120 }}
                    onChangeHandler={onChangeFNameHandler}
                ></Search>
                <Search lable={'Surname'} value={data.lname} type={"fill"} hStyle={{ width: 120 }}
                    onChangeHandler={onChangeLNameHandler}
                ></Search>
                <Search lable={'Phone Number'} value={data.phonenumber} type={"fill"} hStyle={{ width: 120 }}
                    onChangeHandler={onChangePhoneHandler}></Search>
                <Search lable={'Email'} value={data.email} type={"fill"} hStyle={{ width: 120 }}
                    onChangeHandler={onChangeEmailHandler}
                ></Search>
                {(newEmployee) ? <Search lable={'Passsword'} value={""} type={"fill"} hStyle={{ width: 120 }}
                    onChangeHandler={onChangePasswordHandler}
                ></Search> : <></>}

                <div id="ROLE" style={{ alignSelf: 'center', marginLeft: 120, marginTop: 10 }}>
                    <RadioGroup row value={data.roles} onChange={onChangeRoleEventHandler}>
                        <FormControlLabel control={<Radio />} label={UserRole.C.toUpperCase()} value={UserRole.C} />
                        <FormControlLabel control={<Radio />} label={UserRole.B.toUpperCase()} value={UserRole.B} />
                        <FormControlLabel control={<Radio />} label={UserRole.A.toUpperCase()} value={UserRole.A} />
                    </RadioGroup>
                </div>
            </Box >
            <Box sx={{ p: 2 }}>
                {(newEmployee) ?
                    <BUpdate
                        onCancel={onCancel} onComfirm={onCreate}
                        nLabel={"CREATE"}
                        disabled={!isUpdated}
                    /> :
                    <BUpdate
                        onCancel={onCancel} onComfirm={onConfirm}
                        nLabel={"UPDATE"}
                        disabled={!isUpdated}
                    />
                }
            </Box>
        </div >
    )
    //--------------------------------------------------//
    //--------------------------------------------------//
}
