import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { ColorAvatar } from '../../../Common/ColorSelect';
import { IColor } from '../../../../Libs/Models/IColor.model';
import ColorService from '../../../../Libs/Services/Color.service';
import { IThumbnail, DThumbnail } from '../../../../Libs/Models/IAvatar.model';

interface IDefault {
    onReset?: (index: number) => void;
    onUpdateThumb?: (value: File | null, index: number, color: string) => void;
    //onUpdateThumb?: (value: File | null, index: number) => void
    onUpdateColor?: (thumb: IThumbnail, index: number) => void;
    src: string;
    part: string;
    label?: string;
    VW?: number;
    VH?: number;
    data: IThumbnail[];
    count: number;
}
export const PartColor2Item = (props: IDefault) => {
    //const size = getSize(props.part);
    const [colorList, SetColorList] = useState<IColor[]>();

    //const [newThumb, setThumb] = useState<(File | null)[]>([]);
    const [newThumb, setNewThumb] = useState<IThumbnail>(DThumbnail());


    useEffect(() => {
        ColorService.getContentAll().then(res => {
            SetColorList(res.reverse());
        }).catch((e) => { });
    }, [])
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onChangeColor = (color: IColor | null, index: number) => {
        if (props.data.length > index && index > -1) {
            props.data[index].color = color?._id ? color._id : "";
            props.onUpdateColor?.(props.data[index], index);
        } else {
            var th = DThumbnail();
            //th.id = index; //th.url
            th.color = color?._id ? color._id : "";
            setNewThumb(th);
        }
    }

    const onUpdateGraphic = (value: File | null, index: number) => {
        if (props.data.length > index) {
            props.onUpdateThumb?.(value, index, props.data[index].color);
        } else {
            props.onUpdateThumb?.(value, index, newThumb.color);
        }
        setNewThumb(DThumbnail());
    }

    const onDeleteHandler = (index: number) => {
        props.onUpdateThumb?.(null, index, "");
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Box id="THUMBNAIL">
            {colorList && props.data && (
                <Box sx={{ py: 2 }}>
                    <Typography variant="h6">GRAPHIC</Typography>
                    <Box className="flex-col-l">
                        {props.data.map((row: IThumbnail, index: number) => (
                            <><ColorAvatar index={index} options={colorList} count={props.count}
                                onChangeColorHandler={onChangeColor}
                                onChangeThumbHandler={onUpdateGraphic}
                                onDeleteHandler={onDeleteHandler}
                                src={row.url} color={row.color ? row.color : ""}
                            /></>
                        ))}
                        <ColorAvatar index={props.data.length} options={colorList} count={props.count}
                            onChangeColorHandler={onChangeColor}
                            onChangeThumbHandler={onUpdateGraphic}
                            color={newThumb ? newThumb.color : ""}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}