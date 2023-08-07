import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, TableContainer, Paper, Table, Box, TableBody, TableRow, TableCell, Stack } from '@mui/material';
import HTable from '../../Layout/HTable';
import { IHeadTabel } from '../../Layout/HTable';
import { day } from '../../../Libs/Extensions/Day.extension';
import { TStatus } from '../../Common';
import { ICustomer, IAvatar, DCustomer, IAddress, DAddress } from '../../../Libs/Models/ICustomer.model';
import env from '../../../Libs/Services/env';
import CustomerService from '../../../Libs/Services/Customer.service';
import { IOrder } from '../../../Libs/Models/IOrder.model';
import { Search } from '../../Common/Search';
import { BUpdate } from '../../Common/BUpdate';
import { AddressBox } from '../../Common/TStatus';


const headerCells: IHeadTabel[] = [
    { id: "_id", label: "ORDER ID", align: "left", sort: false, width: 115 },
    { id: "date_ordered", label: "DATE", align: "center", sort: false, width: 100 },
    { id: "shipping", label: "SHIP", align: "center", sort: false, width: 220 },
    { id: "total", label: "PRICE", align: "center", sort: false, width: 80 },
    { id: "status", label: "STATUS", align: "center", sort: false, width: 150 },
    { id: null, label: "", align: "left", sort: false },
];

const maxWidth = 700

export function CustomerDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<ICustomer>(DCustomer());
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isUpdated, setIsUpdated] = useState(false);

    const updatedAddresses = React.useRef(["", "", "", ""]);

    useEffect(() => {
        if (id) {
            CustomerService.getContent(id).then(res => {
                setData(JSON.parse(JSON.stringify(res)));
                setIsUpdated(true);
                setOrders(res.orders.reverse());
            }).catch((e) => { });
        }
    }, [id])

    useEffect(() => {
        updatedAddresses.current = data.address.map((item: IAddress) => item.address);
    }, [data])

    //--------------------------------------------------//
    //--------------------------------------------------//
    const onClickView = (value: IOrder) => {
        navigate(`/order/` + value._id);
    };

    const onChangeAddress = (id: number, value: string) => {
        updatedAddresses.current[id - 1] = value;
    }

    const onChangeNameHandler = (value: string) => {
        setData((pre) => ({ ...pre, username: value }));
    }
    const onChangePhoneHandler = (value: string) => {
        setData((pre) => ({ ...pre, phonenumber: value }));
    }
    const onChangeEmailHandler = (value: string) => {
        setData((pre) => ({ ...pre, email: value }));
    }

    const onConfirm = () => {
        if (id) {
            var newAddress = [...data.address];
            for (var i = 0; i < updatedAddresses.current.length; i++) {
                if (!newAddress[i]) {
                    newAddress[i] = DAddress();
                }
                newAddress[i].address = updatedAddresses.current[i];
                newAddress[i]._id = i + 1;
            }

            CustomerService.updateAddress(id, newAddress[0]).then(() => {
                CustomerService.updateAddress(id, newAddress[1]).then(() => {
                    CustomerService.updateAddress(id, newAddress[2]).then(() => {
                        CustomerService.updateAddress(id, newAddress[3]).then(() => {
                            CustomerService.updateContent(id, data);
                        }).then(() => { navigate(-1); })
                    })
                })
            });
        }
        //setIsOpen(true);
    };

    const onCancel = () => {
        navigate(-1);
    }

    //--------------------------------------------------//
    /* const onOK = () => {
        setIsOpen(false);
        if (id) {
            CustomerService.updateContent(id, data);
        }

    } */
    //--------------------------------------------------//
    //--------------------------------------------------//
    //data.address[3] ? `${data.address[3].address} ${data.address[3].postcode}` : ""
    return (
        <div className="flex-g" style={{ backgroundColor: '#F4F4F4' }}>
            {/* <DialogComfirm isOpen={isOpen} onClose={() => setIsOpen(false)} onOK={onOK} /> */}
            <Box id="detail" sx={{ px: 2, pt: 2 }} >
                <Stack direction="column" spacing={1}>
                    <TStatus title={'Customer ID'} msg={data._id} hStyle={{ width: 100 }}></TStatus>
                    <Search type="fill" lable="Name" hStyle={{ width: 100 }}
                        value={data.username} onChangeHandler={onChangeNameHandler}
                    />
                    <Search type="fill" lable="Phone number" hStyle={{ width: 100 }}
                        value={data.phonenumber} onChangeHandler={onChangePhoneHandler}
                    />
                    <Search type="fill" lable="Email" hStyle={{ width: 100 }}
                        value={data.email} onChangeHandler={onChangeEmailHandler}
                    />
                    <AddressBox id={1} label={'Address #1'} onChange={onChangeAddress}
                        dValue={data.address[0] ? `${data.address[0].address}` : ""}
                    />
                    <AddressBox id={2} label={'Address #2'} onChange={onChangeAddress}
                        dValue={data.address[1] ? `${data.address[1].address}` : ""}
                    />
                    <AddressBox id={3} label={'Address #3'} onChange={onChangeAddress}
                        dValue={data.address[2] ? `${data.address[2].address}` : ""}
                    />
                    <AddressBox id={4} label={'Address #4'} onChange={onChangeAddress}
                        dValue={data.address[3] ? `${data.address[3].address}` : ""}
                    />
                </Stack>
            </Box >
            <Box sx={{ p: 2 }}>
                <BUpdate
                    onCancel={onCancel} onComfirm={onConfirm}
                    nLabel={"UPDATE"}
                    disabled={!isUpdated}
                />
            </Box>
            <Box className='flex-g  flex-l' id="character" sx={{ px: 2, pt: 2 }}>
                {data.avatars.map((row: IAvatar, index) => (
                    <Paper className='flex-c-m' elevation={2}
                        sx={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                        <img alt="img" src={row.url_bg !== "" ? `${env.APP_API_HOST}/${row.url_bg}` : `${env.APP_API_HOST}/${row.url}`} width={120} height={'auto'} />
                    </Paper>
                ))}
            </Box>
            <Box id="order" sx={{ px: 2, py: 2 }} >
                <TableContainer component={Paper} elevation={0}>
                    <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
                        <HTable cells={headerCells} cellStyle={{ backgroundColor: '#F4F4F4' }} />
                        <TableBody>
                            {orders.map((row: IOrder, index) => (
                                <TableRow key={index}>
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