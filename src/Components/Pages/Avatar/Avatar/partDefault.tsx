import React from 'react'
import { ThumbnailContainer } from '../../../Common/Thumbnail';
import Box from '@mui/material/Box';
import { getSize } from '../../../../Libs/Constants/size';

interface IDefault {
    onReset?: (index: number) => void;
    onClear?: (index: number) => void;
    onUpdate?: (value: File | null, index: number) => void;
    src: string;
    part: string;
    label?: string;
    VW?: number;
    VH?: number;
}
export const PartDefault = (props: IDefault) => {
    const size = getSize(props.part);

    return (
        <Box id="THUMBNAIL" className="flex-row">
            <ThumbnailContainer
                onReset={() => { props.onReset && props.onReset(0); }}
                onClear={() => { props.onClear && props.onClear(0); }}
                onUpdate={(file: File | null) => { props.onUpdate && props.onUpdate(file, 0) }}
                MAX_WIDTH={size.w} MAX_HEIGHT={size.h}
                VW={props.VW && props.VW} VH={props.VH && props.VH}
                src={props.src} label={props.label ? props.label : "GRAPHIC"}
            />
        </Box>
    )
}