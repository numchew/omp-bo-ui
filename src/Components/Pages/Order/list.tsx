import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import { PPagination, Search } from '../../Common';
import OrderService from '../../../Libs/Services/Order.service';
import { IOrder } from '../../../Libs/Models/IOrder.model';
import { TableList } from '.';

export function OrderList() {
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [curPage, setCurPage] = useState(1);
    const [dataServ, setDataServ] = useState<IOrder[]>([]);
    const [data, setData] = useState<IOrder[]>([]);

    useEffect(() => {
        OrderService.getContentAll().then(res => {
            setDataServ(res.reverse());
            setData(res.reverse());
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

    const onSearchChangeHandler = (value: string) => {
        const v = value.toLocaleLowerCase();
        setData(dataServ?.filter((item: IOrder) =>
            (item._id && item._id.toString().toLocaleLowerCase().indexOf(v) > -1) ||
            (item.date_ordered && item.date_ordered.toString().toLocaleLowerCase().indexOf(v) > -1) ||
            (item.customer.username && item.customer.username.toString().toLocaleLowerCase().indexOf(v) > -1) ||
            (item.shipping && item.shipping.toString().toLocaleLowerCase().indexOf(v) > -1) ||
            (item.total && item.total.toString().toLocaleLowerCase().indexOf(v) > -1) ||
            (item.status && item.status.toString().toLocaleLowerCase().indexOf(v) > -1) ||
            (item.tracking && item.tracking.toString().toLocaleLowerCase().indexOf(v) > -1)
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
