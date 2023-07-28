import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { ColorAvatar } from '../../../Common/ColorSelect';
import { IColor } from '../../../../Libs/Models/IColor.model';
import ColorService from '../../../../Libs/Services/Color.service';
import { IThumbnail, DThumbnail } from '../../../../Libs/Models/IAvatar.model';

interface IDefault {
    onReset?: (index: number) => void;
    onUpdateThumb?: (value: File | null, index: number, color: string) => void;
    onUpdateThumbBG?: (value: File | null, index: number, color: string) => void;
    onUpdateColor?: (thumb: IThumbnail, index: number) => void;
    part: string;
    label?: string;
    VW?: number;
    VH?: number;
    data: IThumbnail[];
    count: number;
}
export const PartColor = (props: IDefault) => {
    const [colorList, SetColorList] = useState<IColor[]>();
    const [newThumb, setNewThumb] = useState<IThumbnail>(DThumbnail());
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        ColorService.getContentAll().then(res => {
            SetColorList(res.reverse());
        }).catch((e) => { });
    }, [])

    useEffect(() => {
        if (props.count > 1) {
            if (newThumb.url !== "" && newThumb.bg !== "") {
                setNewThumb(DThumbnail());
                setIsShow(true);
            } else {
                if (newThumb.url === "" && newThumb.bg === "") {
                    setIsShow(true);
                } else {
                    setIsShow(false);
                }
            }
        } else {
            if (newThumb.url !== "") {
                setNewThumb(DThumbnail());
                setIsShow(false);
            } else {
                setIsShow(true);
            }
        }
    }, [props.data, props.count, newThumb]);
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onChangeColor = (color: IColor | null, index: number) => {
        console.log(props.data.length, index);

        if (props.data.length > index && index > -1) {
            props.data[index].color = color?._id ? color._id : "";
            props.onUpdateColor?.(props.data[index], index);
        } else {
            var th = DThumbnail();
            th.id = index;
            th.color = color?._id ? color._id : "";
            setNewThumb(th);
        }
    }

    const onUpdateGraphic = (value: File | null, index: number) => {
        setNewThumb(pre => ({ ...pre, url: "new" }));
        if (props.data.length > index) {
            props.onUpdateThumb?.(value, index, props.data[index].color);
        } else {
            props.onUpdateThumb?.(value, index, newThumb.color);
        }
    }

    const onUpdateBG = (value: File | null, index: number) => {
        setNewThumb(pre => ({ ...pre, bg: "new" }));
        if (props.data.length > index) {
            props.onUpdateThumbBG?.(value, index, props.data[index].color);
        } else {
            props.onUpdateThumbBG?.(value, index, newThumb.color);
        }
    }

    const onDeleteHandler = (index: number) => {
        props.onUpdateThumb?.(null, index, "");
        if (newThumb.id === index) {
            setNewThumb(pre => ({ ...pre, url: "", bg: "" }));
        }
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Box id="THUMBNAIL">
            {colorList && props.data && (
                <Box sx={{ py: 2 }}>
                    <Typography variant="h6">GRAPHIC</Typography>
                    <Box className="flex-w flex-row-l">
                        {props.data.map((row: IThumbnail, index: number) => (
                            <><ColorAvatar index={index} options={colorList} count={props.count}
                                onChangeColorHandler={onChangeColor}
                                onChangeThumbHandler={onUpdateGraphic}
                                onChangeThumbBGHandler={onUpdateBG}
                                onDeleteHandler={onDeleteHandler}
                                src={row.url} bg={row.bg} icon={row.icon}
                                color={row.color ? row.color : ""}
                            /></>
                        ))}
                        {isShow ?
                            <ColorAvatar index={props.data.length} options={colorList} count={props.count}
                                onChangeColorHandler={onChangeColor}
                                onChangeThumbHandler={onUpdateGraphic}
                                onChangeThumbBGHandler={onUpdateBG}
                                color={newThumb ? newThumb.color : ""}
                            /> : <></>}
                    </Box>
                </Box>
            )}
        </Box>
    )
}