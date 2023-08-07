import React, { useRef } from 'react';
import { FormControl, MenuItem, Select, IconButton, Stack, Paper, Grid } from '@mui/material';
import { IColor } from '../../Libs/Models/IColor.model';
import { ThumbnailView, ThumbnailViewRef } from './Thumbnail';

import DeleteIcon from '@mui/icons-material/Delete';
import env from '../../Libs/Services/env';
import { Box } from '@mui/system';

interface ColorSelectProps {
    value: string;
    options: IColor[];
    onChangeHandler?: (color: IColor | null) => void;
}

export const ColorSelect = (props: ColorSelectProps) => {
    const onClick = (c: IColor | null) => {
        if (c) {
            props.onChangeHandler && props.onChangeHandler(c);
        } else {
            props.onChangeHandler && props.onChangeHandler(null);
        }
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <FormControl fullWidth variant="outlined" sx={{ width: 120 }} size="small">
            <Select id="demo-simple-select" inputProps={{ 'aria-label': 'Without label' }}
                value={props.value}
            >
                <MenuItem value="" onClick={() => onClick(null)}></MenuItem>
                {props.options.map((option) => (
                    <MenuItem key={option.id} value={option._id} onClick={() => onClick(option)}
                        style={{ display: 'flex', flexDirection: 'row' }}
                    >
                        <img src={`${env.APP_API_HOST}/${option.url}`} alt={option.name}
                            style={{ marginRight: 8, width: 25 }} />
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl >
    );
};

//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
// สำหรับ hair ให้เลือกสีแล้ว -> ใส่ภาพ
interface ColorAvatarProps {
    index: number;
    color: string;
    src?: string;
    bg?: string;
    icon?: string;
    options: IColor[];
    count: number;      //จำนวน thumbnail ที่จะ match เช่น ผมหน้าหลัง
    onChangeColorHandler?: (color: IColor | null, index: number) => void;
    onChangeThumbHandler?: (value: File | null, index: number) => void;
    onChangeThumbBGHandler?: (value: File | null, index: number) => void;
    onDeleteHandler?: (index: number) => void;
}

export const ColorAvatar = (props: ColorAvatarProps) => {
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onChangeHandler = (value: IColor | null) => {
        if (value) {
            props.onChangeColorHandler && props.onChangeColorHandler(value, props.index);
        } else {
            props.onChangeColorHandler && props.onChangeColorHandler(value, props.index);
        }
    }

    const onUpdateHandler = (value: File | null) => {
        props.onChangeThumbHandler && props.onChangeThumbHandler(value, props.index);
    }

    const onUpdateBGHandler = (value: File | null) => {
        props.onChangeThumbBGHandler && props.onChangeThumbBGHandler(value, props.index);
    }

    const onDeleteHandler = () => {
        props?.onDeleteHandler?.(props.index);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//

    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Stack direction="row" spacing={1} sx={{ pb: 2, pr: 2 }}
            className='flex-row flex-c'>
            <Box sx={{ pt: 1 }}>
                <ColorSelect options={props.options}
                    onChangeHandler={onChangeHandler}
                    value={props.color}
                /></Box>
            {
                props.color !== "" ?
                    <Box className='flex-row flex-c'>
                        <OnView onUpdateHandler={onUpdateHandler}
                            src={props.src}
                        />
                        {props.count > 1 &&
                            <>
                                <Box sx={{ pl: 1 }}>
                                    <OnView onUpdateHandler={onUpdateBGHandler}
                                        src={props.bg}
                                    />
                                </Box>
                                <Box sx={{ pl: 1 }}>
                                    <OnPreview src={props.icon} />
                                </Box>
                            </>
                        }
                        <Paper className="flex-b" elevation={0} sx={{ px: 0, pb: 1 }}>
                            <IconButton aria-label="delete" size="medium" color="primary"
                                onClick={onDeleteHandler}>
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    </Box> : <></>
            }
        </Stack >
    );
};

//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
interface IView {
    onUpdateHandler?: (value: File | null) => void;
    src: string | undefined;
}
const OnView = (props: IView) => {
    const ref = useRef<ThumbnailViewRef>(null);
    return (
        <ThumbnailView ref={ref}
            caption={
                <div className='flex-m flex-c'
                    style={{
                        width: 50, height: 50,
                        textAlign: 'center', lineHeight: 1
                    }}>
                    +
                </div>}
            VW={80} VH={80}
            onUpdate={props.onUpdateHandler}
            src={props.src}
        />
    )
}

const OnPreview = (props: IView) => {
    return (
        <Grid item xs={1}>
            <Box className='flex-c-m'
                my={1} sx={{ borderWidth: 2, p: 1 }}
                border="solid"
                borderRadius={1}
                borderColor="#000"
            >
                <Paper className='flex-c-m' elevation={0}>
                    {props.src !== undefined && props.src !== "" ?
                        <img alt="Thumbnail"
                            style={{ maxWidth: 80, height: 'auto' }}
                            src={props.src.indexOf('blob') > -1 ?
                                props.src : `${env.APP_API_HOST}/${props.src}`}
                        /> : <div style={{ width: 80, height: 80 }}></div>}
                </Paper>
            </Box>
        </Grid >
    )
}

//--------------------------------------------------//
//--------------------------------------------------//