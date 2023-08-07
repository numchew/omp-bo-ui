import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { TableContainer, Paper, Table, Box, TableBody, TableRow, TableCell, TableFooter, Modal } from '@mui/material';
import HTable from '../../Layout/HTable';
import { IHeadTabel } from '../../Layout/HTable';
import { IOrderProduct, IOrder, DOrder } from '../../../Libs/Models/IOrder.model';
import { day } from '../../../Libs/Extensions/Day.extension';
import OrderService from '../../../Libs/Services/Order.service';
import { OrderStatus } from '../../../Libs/Constants/enum'
import { TStatus, TypeIC, Search } from '../../Common';
import { ProductView } from './';
import env from '../../../Libs/Services/env';
import ColorService from '../../../Libs/Services/Color.service';
import { IColor } from '../../../Libs/Models/IColor.model';
import { AddressBox, IAddressRef } from '../../Common/TStatus';
import { IAddress } from '../../../Libs/Models/ICustomer.model';
import CustomerService from '../../../Libs/Services/Customer.service';
import Divider from '@mui/material/Divider';
import { primary } from '../../../Styles/Theme';
import { BUpdate } from '../../Common/BUpdate';
import { HName } from '../../Common/HName';

const headerCells: IHeadTabel[] = [
    { id: "id", label: "", align: "left", sort: false, width: 10 },
    { id: null, label: "PRODUCT", align: "left", sort: false, width: 50 },
    { id: "name", label: "", align: "left", sort: false, width: 200 },
    { id: "type", label: "TYPE", align: "left", sort: false, width: 60 },
    { id: "size", label: "SIZE", align: "left", sort: false, width: 60 },
    { id: "color", label: "COLOR", align: "center", sort: false, width: 60 },
    { id: "quantity", label: "QUANTITY", align: "center", sort: false, width: 100 },
    { id: "price", label: "PRICE/UNIT", align: "right", sort: false, width: 80 },
    { id: "total", label: "TOTAL", align: "right", sort: false, width: 80 },
    { id: null, label: "", align: "left", sort: false },
];

const maxWidth = 860

export function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const ref = useRef<IAddressRef>(null);
    const [data, setData] = useState<IOrder>(DOrder());
    const [address, setAddress] = useState<IAddress[]>();
    const [isOpenView, setIsOpenView] = useState(false);
    const [productView, setProductView] = useState<IOrderProduct>();
    const [color, setColor] = useState<IColor[]>();
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
    const [shipping, setShipping] = useState("");

    React.useEffect(() => {
        ColorService.getContentAll().then(res => {
            setColor(res);
        })
    }, [])
    React.useEffect(() => {
        if (id) {
            OrderService.getContent(id).then(res => {
                setData(JSON.parse(JSON.stringify(res)));
                setShipping(res.shipping);
                ref.current?.setValue(res.shipping);
                //setSelectedAddress(res.shipping);
                CustomerService.getAddress(res.customer.id).then(res2 => {
                    setAddress(res2);
                    var index = res2.findIndex(e => e.address === res.shipping);
                    if (index > -1) {
                        setSelectedAddress(res2[index]);
                    }
                }).catch((e) => { });
            }).catch((e) => { });
        }
    }, [id])

    const getColor = (c: String): string => {
        var res = color?.find(e => e._id === c);
        return res ? res.url : "";
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onClickViewImg = (r: IOrderProduct) => {
        setIsOpenView(true);
        setProductView(r);
    }
    const handleClose = () => {
        setIsOpenView(false);
    }


    const onChangeTackingHandler = (value: string) => {
        setData((pre) => ({ ...pre, tracking: value }));
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onClickCancel = () => {
        //Add modal Cancel *******************--------------------->
        //Add modal Cancel *******************--------------------->
        //Add modal Cancel *******************--------------------->
        var status = "";
        switch (data.status) {
            case 'payment waiting': status = OrderStatus.PAYMENT_FAILED; break;
            case 'payment success': status = OrderStatus.CANCEL; break;
            case 'delivery waiting': status = OrderStatus.DELIVERY_FAILED; break;
            case 'delivery': status = OrderStatus.CANCEL; break;
            default: status = OrderStatus.FAILED; break;
        }
        OrderService.updateContent(data._id, { status: status }).then(
            (res) => { setData(res) }
        );
    }

    const onClickPaid = () => {
        var status = "";
        switch (data.status) {
            case 'payment waiting': status = OrderStatus.PAYMENT_SUCCESS; break;
            case 'payment success': status = OrderStatus.DELIVERY_WAITING; break;
            case 'delivery waiting': status = OrderStatus.DELIVERY; break;
            case 'delivery': status = OrderStatus.SUCCESSFUL; break;
            default: status = OrderStatus.SUCCESSFUL; break;
        }
        OrderService.updateStatus(data._id, status).then(
            (res) => { setData(res) }
        );
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    const BStatus = ({ status }: any) => {
        var label = "";
        var cancel = "";
        switch (status) {
            case "payment waiting": label = "payment success"; cancel = "payment failed"; break;
            case "payment success": label = "delivery waiting"; cancel = "cancel"; break;

            case "delivery waiting": label = "delivery"; cancel = "delivery failed"; break;
            case "delivery": label = "successful"; cancel = "cancel"; break;
        }
        return (
            <div className='dis-flex flex-row' style={{ paddingLeft: 340 }}>
                <Button variant="contained" sx={{ width: 110 }} color='error'
                    onClick={() => { onClickCancel(); }}>
                    <Typography variant="body1">{cancel}</Typography>
                </Button>
                <Box sx={{ px: 1 }}></Box>
                <Button variant="contained" sx={{ width: 110 }} color='secondary'
                    onClick={() => { onClickPaid(); }}>
                    <Typography variant="body1">{label}</Typography>
                </Button>
            </div>

        )
    }

    //--------------------------------------------------//
    const onChangeAddress = (id: number, value: string) => {
        setShipping(value);
    }

    const handleAddressSelect = (address: IAddress) => {
        setSelectedAddress(address);
        ref.current?.setValue(address.address);
        setShipping(address.address);
    };

    const onCancel = () => {
        navigate(-1);
    }

    const onConfirm = () => {
        if (id) {
            OrderService.updateContent(data._id,
                { ...data, shipping: shipping })
                .then((res) => { setData(res) });
        }
    };

    const onDelete = async () => {
        //<<--back
        await OrderService.deleteContent(data._id);
        navigate(-1);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <div className="flex-g">
            <Modal
                open={isOpenView}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProductView data={productView} />
            </Modal>
            <Box id="DETAIL" sx={{ px: 2 }} >
                <HName label={""} isCanDelete={data._id !== ""} onDelete={onDelete} />
                <Divider color={primary} />
            </Box>
            <Box id="DETAIL" sx={{ px: 2, py: 2 }} >
                <div className="dis-flex flex-row flex-m" >
                    <TStatus title={'Order ID'} msg={data && data._id}></TStatus>
                    <TStatus title={'Status'} msg={data && data.status.toString().toUpperCase()}></TStatus>
                </div>
                <div className="dis-flex flex-row flex-m" >
                    <TStatus title={'Name'} msg={data && data.customer.email}></TStatus>
                    <Search type="fill" lable="Tracking No." value={data && data.tracking} hStyle={{ width: 100 }}
                        onChangeHandler={onChangeTackingHandler} />
                </div>
                <div className="dis-flex flex-row flex-m">
                    <TStatus title={'Order Date'} msg={day(data && data.date_ordered)}></TStatus>
                    <TStatus title={'Update Date'} msg={day(data && data.date_updated)}></TStatus>
                </div>
                <div className="dis-flex flex-row flex-m">
                    <AddressBox id={0} label={'Ship'} onChange={onChangeAddress}
                        dValue={shipping} ref={ref}
                    />
                </div>
                <Box className="dis-flex flex-row" sx={{ py: 3 }}>
                    <Typography variant="h6" sx={{ width: 95 }}>{"Address"}</Typography>
                    {address?.map((row: IAddress, index) => (
                        row.address === "" ? <view key={index}></view> :
                            <Button
                                key={index}
                                variant={selectedAddress?.id === row.id ? "contained" : "outlined"}
                                color={selectedAddress?.id === row.id ? 'primary' : 'inherit'}
                                onClick={() => handleAddressSelect(row)}
                                style={{ margin: '5px', width: 200, height: 80 }}
                            >{row.address}
                            </Button>
                    ))}

                </Box>
            </Box>
            <Box id="TABEL" sx={{ px: 1, py: 3 }} >
                <TableContainer component={Paper} elevation={0}>
                    <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
                        <HTable cells={headerCells} />
                        <TableBody>
                            {data.product.map((row: IOrderProduct, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left">
                                        <Paper className='flex-c-m' elevation={1} sx={{ backgroundColor: 'gray', p: 0.5 }}>
                                            <img src={`${env.APP_API_HOST}/${row.icon}`} alt="" width={'auto'} height={40} />
                                        </Paper>
                                    </TableCell>
                                    <TableCell align="left">{row.name.toUpperCase()}</TableCell>
                                    <TableCell align="center" >
                                        <TypeIC value={row.type} disabled={true} selected={true} size={40} />
                                    </TableCell>
                                    <TableCell align="center">{row.size}</TableCell>
                                    <TableCell align="center"><Paper className='flex-c-m' elevation={1} sx={{ width: 40 }} >
                                        <img src={`${env.APP_API_HOST}/${getColor(row.color)}`} alt="Color"
                                            style={{ width: 40, height: 'auto' }}
                                        />
                                    </Paper></TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.price * row.quantity}</TableCell>
                                    <TableCell align="left" colSpan={2}>
                                        <Button variant="contained" size="small" sx={{ px: 2 }} onClick={() => { onClickViewImg(row); }}>
                                            <Typography variant="body1">VIEW IMAGE</Typography>
                                        </Button>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow sx={{ height: 20 }}></TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={headerCells.length - 3}>
                                    <Typography variant='h6' color="primary">TOTAL</Typography>
                                </TableCell>
                                <TableCell align="right" colSpan={2}>{ccyFormat(data.total)}</TableCell>
                                <TableCell align="right" colSpan={2}></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
            <Box className="dis-flex flex-row flex-m" sx={{ px: 2 }}>
                <BUpdate
                    onCancel={onCancel} onComfirm={onConfirm}
                    nLabel={"UPDATE"}
                // disabled={!isUpdated}
                />
                {
                    data.status.toLowerCase() === OrderStatus.CANCEL ||
                        data.status.toLowerCase() === OrderStatus.FAILED ||
                        data.status.toLowerCase() === OrderStatus.DELIVERY_FAILED ||
                        data.status.toLowerCase() === OrderStatus.SUCCESSFUL ?
                        <></> : <BStatus status={data.status.toLowerCase()} />
                }
            </Box>
        </div >
    )
}

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

