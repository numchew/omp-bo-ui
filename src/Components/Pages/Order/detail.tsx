import React, { useState } from 'react';
import { useParams } from "react-router-dom";
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
    //const dispatch = useDispatch();
    //const order = useSelector((state: RootStore) => state.order);
    const [data, setData] = useState<IOrder>(DOrder());
    const [isOpenView, setIsOpenView] = useState(false);
    const [productView, setProductView] = useState<IOrderProduct>();
    const [color, setColor] = useState<IColor[]>();
    React.useEffect(() => {
        ColorService.getContentAll().then(res => {
            setColor(res);
        })
    }, [])
    React.useEffect(() => {
        if (id) {
            OrderService.getContent(id).then(res => {
                setData(JSON.parse(JSON.stringify(res)));
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
            case 'playment waiting': status = OrderStatus.PAYMENT_FAILED; break;
            case 'playment success': status = OrderStatus.CANCEL; break;
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
            case 'playment waiting': status = OrderStatus.PAYMENT_SUCCESS; break;
            case 'playment success': status = OrderStatus.DELIVERY_WAITING; break;
            case 'delivery waiting': status = OrderStatus.DELIVERY; break;
            case 'delivery': status = OrderStatus.SUCCESSFUL; break;
            default: status = OrderStatus.SUCCESSFUL; break;
        }
        OrderService.updateContent(data._id, { status: status }).then(
            (res) => { setData(res) }
        );
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    const BStatus = ({ status }: any) => {
        var label = "";
        var cancel = "";
        switch (status) {
            case "playment waiting": label = "playment success"; cancel = "playment failed"; break;
            case "playment success": label = "delivery waiting"; cancel = "cancel"; break;

            case "delivery waiting": label = "delivery"; cancel = "delivery failed"; break;
            case "delivery": label = "successful"; cancel = "cancel"; break;
        }
        return (
            <div className='dis-flex flex-row' style={{ paddingLeft: 500 }}>
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
            <Box id="DETAIL" sx={{ px: 2, py: 2 }} >
                <div className="dis-flex flex-row flex-m" >
                    <TStatus title={'ชื่อ-นามสกุล'} msg={data.customer.email}></TStatus>
                    <TStatus title={'STATUS'} msg={data.status.toString().toUpperCase()}></TStatus>
                </div>
                <div className="dis-flex flex-row flex-m">
                    <TStatus title={'Order Date'} msg={day(data.date_ordered)}></TStatus>
                    <TStatus title={'Update Date'} msg={day(data.date_updated)}></TStatus>
                </div>
                <div className="dis-flex flex-row flex-m">
                    <TStatus title={'Ship'} msg={data.shipping}></TStatus>
                    { }
                    <TStatus title={'Tracking No.'} msg={data.tracking} msg_disabled={true}></TStatus>
                    <Search type="fill" lable="" value={data.tracking} onChangeHandler={onChangeTackingHandler} />
                </div>
                <div className="dis-flex flex-row">
                    <TStatus title={'ที่อยู่'} msg={data.address}></TStatus>
                </div>
            </Box>

            <Box id="TABEL" sx={{ px: 1, py: 3 }} >
                <TableContainer component={Paper} elevation={0}>
                    <Table size="small" sx={{ minWidth: maxWidth }} aria-label="customized table">
                        <HTable cells={headerCells} />
                        <TableBody>
                            {data.product.map((row: IOrderProduct, index) => (
                                <TableRow key={row._id}>
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
                                    {/* <TableCell align="center">{row.color}</TableCell> */}
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
            <Box id="BUTTON" sx={{ px: 1, py: 8 }} >
                <div className="dis-flex flex-row flex-m" >
                    {/* <Button variant="contained"
                        sx={{ width: 110 }}
                        color='info'
                        onClick={() => { onClickPrint(); }}>
                        <Typography variant="body1" >PRINT</Typography>
                    </Button> */}
                    {
                        data.status.toLowerCase() === OrderStatus.CANCEL ||
                            data.status.toLowerCase() === OrderStatus.FAILED ||
                            data.status.toLowerCase() === OrderStatus.DELIVERY_FAILED ||
                            data.status.toLowerCase() === OrderStatus.SUCCESSFUL ?
                            <></> : <BStatus status={data.status.toLowerCase()} />
                    }

                </div>
            </Box>
        </div >
    )
}

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

