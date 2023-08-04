import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import { PPagination, Search } from '../../Common';
import CustomerService from '../../../Libs/Services/Customer.service';
import { ICustomer } from '../../../Libs/Models/ICustomer.model';
import { TableList } from '.';

export function CustomerList() {
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [curPage, setCurPage] = useState(1);
    const [dataServ, setDataServ] = useState<ICustomer[]>([]);
    const [data, setData] = useState<ICustomer[]>([]);

    useEffect(() => {
        CustomerService.getContentAll().then(res => {
            setDataServ(res);
            setData(res);
        }).catch((e) => { });
    }, [])

    //--------------------------------------------------//
    //--------------------------------------------------//
    const handleChangeRowsPerPage = (value: string) => {
        setRowsPerPage(Number(value));
        setCurPage(1);
    };

    const handleChangePage = (value: number) => {
        setCurPage(value);
    };

    /* const selectDetail = (id: number, row: ISituation) => {
        dispatch(StudentAction.setReport({ index: id, situlation: dataFocus }));
        navigate(location.pathname + "/report");
    }; */

    const onSearchChangeHandler = (value: string) => {
        const v = value.toLocaleLowerCase();
        setData(dataServ?.filter((item: ICustomer) =>
            item._id.toString().toLocaleLowerCase().indexOf(v) > -1 ||
            item.username.toString().toLocaleLowerCase().indexOf(v) > -1 ||
            item.phonenumber.toString().toLocaleLowerCase().indexOf(v) > -1 ||
            item.orders[item.orders.length - 1].shipping.toString().toLocaleLowerCase().indexOf(v) > -1 ||
            item.orders[item.orders.length - 1].status.toString().toLocaleLowerCase().indexOf(v) > -1
        ));
    }
    //--------------------------------------------------//
    //--------------------------------------------------//

    return (
        <Box id="detail" sx={{ px: 1, py: 1 }}>
            <Box sx={{ px: 2 }}>
                <Search type="search" lable="ค้นหา" onChangeHandler={onSearchChangeHandler} />
            </Box>
            <TableList data={
                data.slice(
                    (curPage - 1) * rowsPerPage,
                    (curPage - 1) * rowsPerPage + rowsPerPage)}
                isCanSort={true}
                isCanView={true}
            />
            <div className="p-t-20">
                <PPagination
                    quantity={data.length}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    onChagePage={handleChangePage}
                />
            </div>
        </Box>
    )
}
