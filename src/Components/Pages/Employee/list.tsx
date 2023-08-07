import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PPagination } from '../../Common';
import { TableList } from '.';
import UserProfileService from '../../../Libs/Services/UserProfile.service';
import { IProfile } from '../../../Libs/Models/IProfile.model';
import { Search } from '../../Common/Search';
import { RowsPerPage } from '../../../Libs/Constants/size';

export function EmployeeList() {
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(RowsPerPage);
    const [curPage, setCurPage] = useState(1);
    const [dataServ, setDataServ] = useState<IProfile[]>([]);
    const [data, setData] = useState<IProfile[]>([]);

    useEffect(() => {
        UserProfileService.findAll().then(res => {
            setDataServ(res);
            setData(res.slice(0, RowsPerPage));
        }).catch((e) => { });
    }, []);

    //--------------------------------------------------//
    //--------------------------------------------------//
    const handleChangeRowsPerPage = (value: string) => {
        setRowsPerPage(Number(value));
        setCurPage(1);
    };

    const handleChangePage = (value: number) => {
        setCurPage(value);
        setData(dataServ.slice(
            (curPage - 1) * rowsPerPage,
            (curPage - 1) * rowsPerPage + rowsPerPage));
    };

    const onNewItem = () => {
        navigate(`/employee/newemployee`);
    }

    const onSearchChangeHandler = (value: string) => {
        const v = value.toLocaleLowerCase();
        setData(dataServ?.filter((item: IProfile) =>
            item._id.toString().toLocaleLowerCase().indexOf(v) > -1 ||
            item.email.toString().toLocaleLowerCase().indexOf(v) > -1 ||
            item.username.toString().toLocaleLowerCase().indexOf(v) > -1 ||
            item.phonenumber.toString().toLocaleLowerCase().indexOf(v) > -1 ||
            item.roles.toString().toLocaleLowerCase().indexOf(v) > -1
        ));
    }
    //--------------------------------------------------//
    //--------------------------------------------------//

    return (
        <Box id="detail" sx={{ px: 1, py: 1 }}>
            <Box sx={{ py: 1 }}>
                <Button variant="contained" color="secondary" onClick={onNewItem}
                    sx={{ px: 2 }} startIcon={<AddIcon />} >
                    {`NEW EMPLOYEE`}
                </Button>
            </Box>
            <Box sx={{ px: 2 }}>
                <Search type="search" lable="Search" onChangeHandler={onSearchChangeHandler} />
            </Box>
            <TableList data={data}
                /* data.slice(
                    (curPage - 1) * rowsPerPage,
                    (curPage - 1) * rowsPerPage + rowsPerPage)} */
                isCanSort={true}
                isCanView={true}
            />
            <div className="p-t-20">
                <PPagination
                    quantity={dataServ.length}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    onChagePage={handleChangePage}
                />
            </div>
        </Box>
    )
}

