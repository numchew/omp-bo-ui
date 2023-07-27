import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Checkbox, FormControlLabel, Typography, IconButton, Button } from '@mui/material';
import { BUpdate, HName, ColorSelect, Search, TStatus, TypeProduct } from '../../Common';
import { primary } from '../../../Styles/Theme';
import { Trim } from '../../../Libs/Extensions/String.extension';
import { IProduct, DProduct } from '../../../Libs/Models/IProduct.model';
import { IColor } from '../../../Libs/Models/IColor.model';
import ColorService from '../../../Libs/Services/Color.service';
import ProductService from '../../../Libs/Services/Product.service';


export function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<IProduct>(DProduct());
    const [colors, SetColors] = useState<IColor[]>();

    useEffect(() => {
        ColorService.getContentAll().then(res => {
            SetColors(res.reverse());
        }).catch((e) => { });

        if (id) {
            ProductService.getContent(id).then(res => {
                setData(JSON.parse(JSON.stringify(res)));
            }).catch((e) => { });
        }

    }, []);

    function findColor(_id: string) {
        var c = colors?.find(e => e._id === _id);
        return c ? c.name : '';
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onChangeNameHandler = (value: string) => {
        setData((pre) => ({ ...pre, name: value }));
    }

    const onChangeEventHandler = (value: string) => {
        setData((pre) => ({ ...pre, type: value }));
    }

    const onChangeActivate = (e: any) => {
        setData((pre) => ({ ...pre, activate: e.target.checked }));
    }

    const onChangeQuantityHandler = (value: string) => {
        setData((pre) => ({ ...pre, quantity: Number(value) }));
    }

    const onChangePriceHandler = (value: string) => {
        setData((pre) => ({ ...pre, price: Number(value) }));
    }

    const onChangeHandler = (c: IColor | null) => {
        setData((pre) => ({ ...pre, color: c ? c._id : "" }));
    }

    const onChangeSizeHandler = (value: string) => {
        setData((pre) => ({ ...pre, size: value.toUpperCase() }));
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    const handleAddQuantity = () => {
        setData((pre) => ({ ...pre, quantity: Number(data.quantity + 1) }));
    };
    const handleDivideQuantity = () => {
        var quantity = Number(data.quantity - 1);
        if (quantity < 0) quantity = 0;
        setData((pre) => ({ ...pre, quantity: quantity }));
    };

    const handleAddPrice = () => {
        setData((pre) => ({ ...pre, price: Number(data.price + 1) }));
    };
    const handleDividePrice = () => {
        var price = Number(data.price - 1);
        if (price < 0) price = 0;
        setData((pre) => ({ ...pre, price: price }));
    };

    //--------------------------------------------------//
    //--------------------------------------------------//
    const onConfirm = async () => {
        var res: IProduct = await ProductService.create(data) as IProduct;
        setData(res);
        navigate(-1);
    };

    const onCancel = () => {
        //<<--back
        navigate(-1);
    }

    const onDelete = async () => {
        //<<--back
        await ProductService.deleteContent(data._id);
        navigate(-1);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Box sx={{ p: 2 }}>
            <HName label={"STOCK"} isCanDelete={data._id !== ""} onDelete={onDelete} />
            <Divider color={primary} />
            <Box id="DETAIL" className="flex-row flex-m" sx={{ pt: 2 }}>
                <Search type="fill" lable="NAME" value={data.name} onChangeHandler={onChangeNameHandler} />
                <TStatus title="ID" msg={data._id} hStyle={{ width: 10 }} msgStyle={{ width: 200 }} />
                <FormControlLabel control={<Checkbox checked={data.activate} />} label="ACTIVATE" onChange={onChangeActivate} />
            </Box>

            <Box className="flex-row flex-m" sx={{ py: 1 }}>
                <Typography variant='h6' sx={{ pr: 4, mt: -1 }}>TYPE</Typography>
                <TypeProduct value={data.type} disabled={false} onChangeEventHandler={onChangeEventHandler} />
            </Box>

            {data.type.toLowerCase() === 'shirt' &&
                <Box className="flex-row flex-m" sx={{ pb: 2 }}>
                    <Search type="fill" lable="SIZE" value={data.size}
                        sx={{ width: 146 }}
                        onChangeHandler={onChangeSizeHandler} />
                </Box>
            }

            <Box id="QUANTITY & PRICE" className="flex-row flex-m">
                <Search type="fill" lable="QUANTITY" sx={{ width: 110 }}
                    value={data.quantity.toString()}
                    onChangeHandler={onChangeQuantityHandler} />
                <IconButton disableRipple onClick={handleDivideQuantity} color='error' sx={{ mx: -2 }} ><RemoveCircleIcon /></IconButton>
                <IconButton disableRipple onClick={handleAddQuantity} color='success'><AddCircleIcon /></IconButton>
                <Box sx={{ pl: 5 }}>
                    <Search type="fill" lable="PRICE" sx={{ width: 110 }}
                        value={data.price.toString()}
                        onChangeHandler={onChangePriceHandler} />

                </Box>
                <IconButton disableRipple onClick={handleDividePrice} color='error' sx={{ mx: -2 }}><RemoveCircleIcon /></IconButton>
                <IconButton disableRipple onClick={handleAddPrice} color='success'><AddCircleIcon /></IconButton>
            </Box>

            <Box id="COLOR" className="flex-row flex-m" sx={{ py: 2 }}>
                <Typography variant='h6' sx={{ pr: 2, mt: -1 }}>COLOR</Typography>
                <ColorSelect value={findColor(data.color)}
                    options={colors ? colors : []}
                    onChangeHandler={onChangeHandler}></ColorSelect>
            </Box>

            <BUpdate disabled={Trim(data.name).length < 1 || data.type === "" || data.color === ""}
                onCancel={onCancel} onComfirm={onConfirm}
            />
            <Divider color={primary} />
        </Box>
    )
    //--------------------------------------------------//
    //--------------------------------------------------//
}
