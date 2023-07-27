import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TableContainer, Paper, Table, Box, TableBody, TableRow, TableCell, TableFooter, Grid } from '@mui/material';
import HTable from '../../Layout/HTable';
import { IHeadTabel } from '../../Layout/HTable';
import { RootStore } from '../../../Libs/Redux/index';
import { IOrderProduct, IOrder } from '../../../Libs/Models/IOrder.model';
import { day } from '../../../Libs/Extensions/Day.extension';
import OrderService from '../../../Libs/Services/Order.service';
import { OrderStatus } from '../../../Libs/Constants/enum'
import { TStatus } from '../../Common';
import { ICustomer, IAvatar, DCustomer } from '../../../Libs/Models/ICustomer.model';
import Action from '../../../Libs/Redux/Actions/Action.action';
import env from '../../../Libs/Services/env';
import CustomerService from '../../../Libs/Services/Customer.service';


const headerCells: IHeadTabel[] = [
    { id: "_id", label: "ORDER ID", align: "left", sort: false, width: 115 },
    { id: "date_ordered", label: "DATE", align: "center", sort: false, width: 100 },
    { id: "shipping", label: "SHIP", align: "center", sort: false, width: 80 },
    { id: "total", label: "PRICE", align: "center", sort: false, width: 80 },
    { id: "status", label: "STATUS", align: "center", sort: false, width: 150 },
    { id: null, label: "", align: "left", sort: false },
];

const maxWidth = 700

export function CustomerDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    //const customer = useSelector((state: RootStore) => state.customer);
    const [data, setData] = useState<ICustomer>(DCustomer());

    useEffect(() => {
        if (id) {
            CustomerService.getContent(id).then(res => {
                setData(res);
            }).catch((e) => { });
        }
    }, [])
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onClickView = (value: IOrder) => {
        /* OrderService.getContent(value._id).then(res => {
            dispatch(Action.getOrderDetail(res));
            navigate(`/order/` + value._id);
        }).catch((e) => { }); */
        navigate(`/order/` + value._id);
    };

    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <div className="flex-g" style={{ backgroundColor: '#F4F4F4' }}>

            <Box id="detail" sx={{ px: 2, pt: 2 }} >
                <TStatus title={'CUSTOMER ID'} msg={data._id}></TStatus>
                <TStatus title={'ชื่อ-นามสกุล'} msg={data.username}></TStatus>
                <TStatus title={'โทรศัพท์'} msg={data.phonenumber}></TStatus>
                <TStatus title={'email'} msg={data.email}></TStatus>
            </Box >
            <Box id="address" sx={{ px: 2, pt: 2 }} >
                <TStatus title={'ที่อยู่ #1'} msg={data.address[0] ? `${data.address[0].address} ${data.address[0].postcode}` : ""}></TStatus>
                <TStatus title={'ที่อยู่ #2'} msg={data.address[1] ? `${data.address[1].address} ${data.address[1].postcode}` : ""}></TStatus>
                <TStatus title={'ที่อยู่ #3'} msg={data.address[2] ? `${data.address[2].address} ${data.address[2].postcode}` : ""}></TStatus>
                <TStatus title={'ที่อยู่ #4'} msg={data.address[3] ? `${data.address[3].address} ${data.address[3].postcode}` : ""}></TStatus>
            </Box >
            <Box className='flex-g  flex-l' id="character" sx={{ px: 2, pt: 2 }}>
                {data.avatars.map((row: IAvatar, index) => (
                    <Paper className='flex-c-m' elevation={0}
                        sx={{ width: 140, height: 200, backgroundColor: 'rgba(0,0,0,0)' }}>
                        <img src={`${env.APP_API_HOST}/${row.url_bg}`} width={120} height={'auto'} />
                    </Paper>
                ))}
            </Box>
            <Box id="order" sx={{ px: 2, py: 2 }} >
                <TableContainer component={Paper} elevation={0}>
                    <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
                        <HTable cells={headerCells} cellStyle={{ backgroundColor: '#F4F4F4' }} />
                        <TableBody>
                            {data.orders.map((row: IOrder, index) => (
                                <TableRow key={row._id}>
                                    <TableCell align="left">{row._id}</TableCell>
                                    <TableCell align="center">{day(row.date_ordered)}</TableCell>
                                    <TableCell align="center">{row.shipping}</TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="left" colSpan={2}>
                                        <Button variant="contained" size="small" sx={{ px: 3 }} onClick={() => { onClickView(row); }}>
                                            <Typography variant="body1">VIEW</Typography>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div >
    )
}