import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { primary } from '../../../../Styles/Theme';
import { IColor, DColor, CompareColors } from '../../../../Libs/Models/IColor.model';
import ColorService from '../../../../Libs/Services/Color.service';
import { getSize } from '../../../../Libs/Constants/size';

import { BUpdate, HName, Search, TStatus, ThumbnailContainer, TypeEvent } from '../../../Common';

export function ColorDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<IColor>(DColor());
    const [contentD, setContentD] = useState<IColor>(DColor());
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const size = getSize('color');

    const [isUpdated, setUpdated] = useState(false);

    useEffect(() => {
        if (id) {
            ColorService.getContent(id).then(res => {
                setData(JSON.parse(JSON.stringify(res)));
                setContentD(JSON.parse(JSON.stringify(res)));
            }).catch((e) => { });
        }
    }, [id])
    useEffect(() => {
        setUpdated(!CompareColors(data, contentD));
    }, [data, contentD]);

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

    //--------------------------------------------------//
    //--------------------------------------------------//
    const onResetThumb = () => {
        setThumbnail(null);
        setData((pre) => ({ ...pre, url: contentD.url }));
    }
    const onUpdateThumb = (value: File | null) => {
        setThumbnail(value);
        setData((pre) => ({ ...pre, url: value ? URL.createObjectURL(value) : "" }));
    }
    const onDelete = async () => {
        //<<--back
        await ColorService.deleteContent(data._id);
        navigate(-1);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onConfirm = async () => {
        await ColorService.create(data, thumbnail) as IColor;
        navigate(-1);
    };

    const onCancel = () => {
        //<<--back
        navigate(-1);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Box sx={{ p: 2 }}>
            <HName label={"COLOR"} isCanDelete={data._id !== ""} onDelete={onDelete} />
            <Divider color={primary} />
            <Box id="DETAIL" className="flex-row flex-m" sx={{ pt: 2 }}>
                <Search type="fill" lable="NAME" value={data.name} onChangeHandler={onChangeNameHandler} />
                <TStatus title="ID" msg={data._id} hStyle={{ width: 10 }} msgStyle={{ width: 200 }} />
                <FormControlLabel control={<Checkbox checked={data.activate} />} label="ACTIVATE" onChange={onChangeActivate} />
            </Box>

            <TypeEvent value={data.type} onChangeEventHandler={onChangeEventHandler} />

            <Box id="THUMBNAIL" sx={{ py: 2, display: 'flex' }}>
                <ThumbnailContainer MAX_WIDTH={size.w} MAX_HEIGHT={size.h}
                    onUpdate={onUpdateThumb} onReset={onResetThumb}
                    src={data.url}
                />
            </Box>
            <BUpdate disabled={!isUpdated || data.name.trim().length < 1
                || (thumbnail === null && data.url.length < 1)}
                onCancel={onCancel} onComfirm={onConfirm}
            />
            <Divider color={primary} />
        </Box>
    )
    //--------------------------------------------------//
    //--------------------------------------------------//
}
