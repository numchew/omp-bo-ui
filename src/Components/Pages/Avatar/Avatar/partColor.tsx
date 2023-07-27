import React, { useState, useEffect } from 'react'
import { ThumbnailContainer } from '../../../Common/Thumbnail';
import Box from '@mui/material/Box';
import { getSize } from '../../../../Libs/Constants/size';
import { ColorSelect, ColorAvatar } from '../../../Common/ColorSelect';
import { IColor } from '../../../../Libs/Models/IColor.model';
import ColorService from '../../../../Libs/Services/Color.service';
import { IThumbnail, DThumbnail } from '../../../../Libs/Models/IAvatar.model';
import { Typography } from '@mui/material';

interface IDefault {
    onReset?: (index: number) => void;
    onUpdate?: (value: File | null, index: number) => void;
    //onUpdateThumb?: (thumb: IThumbnail) => void
    onUpdateColor?: (thumb: IThumbnail[]) => void
    src: string;
    part: string;
    label?: string;
    VW?: number;
    VH?: number;
    data: IThumbnail[];
    count: number;
}
export const PartColor = (props: IDefault) => {
    const size = getSize(props.part);
    const [colorList, SetColorList] = useState<IColor[]>();

    //const [newThumb, setThumb] = useState<(File | null)[]>([]);
    const [newThumb, setThumb] = useState<IThumbnail>(DThumbnail());


    useEffect(() => {
        ColorService.getContentAll().then(res => {
            SetColorList(res.reverse());
        }).catch((e) => { });
    }, [])
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onChangeColor = (color: IColor | null, index: number) => {
        if (props.data.length > index) {
            props.data[index].color = color?._id ? color._id : "";
            props.onUpdateColor?.(props.data);
        } else {
            var th = DThumbnail();
            //th.id = index; //th.url
            th.color = color?._id ? color._id : "";
            setThumb(th);
        }
    }

    const onUpdateGraphic = (value: File | null, index: number) => {
        if (props.data.length > index) {

        } else {
            var th = props.data.concat(newThumb);
            props.onUpdateColor?.(th);
        }
        props.onUpdate?.(value, index);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Box id="THUMBNAIL">
            {colorList && props.data && (
                <Box sx={{ py: 2 }}>
                    <Typography variant="h6">GRAPHIC</Typography>
                    <Box className="flex-row">
                        {props.data.map((row: IThumbnail, index: number) => (
                            <><ColorAvatar index={index} options={colorList} count={props.count}
                                onChangeColorHandler={onChangeColor}
                                onChangeThumbHandler={onUpdateGraphic}
                                src={row.url} color={row.color}
                            />{console.log(row)}</>
                        ))}
                        <ColorAvatar index={-1} options={colorList} count={props.count}
                            onChangeColorHandler={onChangeColor}
                            onChangeThumbHandler={onUpdateGraphic}
                            color={newThumb.color}
                        />
                    </Box>
                </Box>
            )}
            {/* <ThumbnailContainer
                            onReset={() => { props.onReset && props.onReset(0); }}
                            onUpdate={(file: File | null) => { props.onUpdate && props.onUpdate(file, 0) }}
                            MAX_WIDTH={size.w} MAX_HEIGHT={size.h}
                            VW={props.VW && props.VW} VH={props.VH && props.VH}
                            src={props.src} label={props.label ? props.label : "GRAPHIC"}
                        /> */}
        </Box>
    )
}