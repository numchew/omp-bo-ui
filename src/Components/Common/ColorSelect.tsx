import React, { useState, useEffect, useRef } from 'react';
import { FormControl, MenuItem, Select, IconButton, Stack } from '@mui/material';
import { IColor } from '../../Libs/Models/IColor.model';
import { ThumbnailView, ThumbnailViewRef } from './Thumbnail';

import DeleteIcon from '@mui/icons-material/Delete';
import env from '../../Libs/Services/env';

interface ColorSelectProps {
    value?: string;
    options: IColor[];
    onChangeHandler?: (color: IColor | null) => void;
}

export const ColorSelect = (props: ColorSelectProps) => {
    const [cl_id, setColor] = useState<string>(String(props.value));
    useEffect(() => {
        setColor(String(props.value));
    }, [props.value])

    const onClick = (c: IColor | null) => {
        if (c) {
            setColor(c.name as string);
            props.onChangeHandler && props.onChangeHandler(c);
        } else {
            setColor("");
            props.onChangeHandler && props.onChangeHandler(null);
        }

    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <FormControl fullWidth variant="outlined" sx={{ maxWidth: 150 }} size="small">
            <Select id="demo-simple-select" inputProps={{ 'aria-label': 'Without label' }}
                value={cl_id} //onChange={handleChange}
            >
                <MenuItem value="" onClick={() => onClick(null)}></MenuItem>
                {props.options.map((option) => (
                    <MenuItem key={option.id} value={option.name} onClick={() => onClick(option)}
                        style={{ display: 'flex', flexDirection: 'row' }}
                    >
                        {/* <Paper className='flex-r-m' elevation={1}
                            style={{ marginRight: 8, width: 25, height: 25 }} >
                            <img src={`${env.APP_API_HOST}/${option.url}`} alt={option.name}
                            /></Paper> */}
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
// สำหรับ hair ให้เลือกสีแล้วใส่ภาพ
interface ColorAvatarProps {
    index: number;
    color?: string;
    src?: string;
    options: IColor[];
    count: number;      //จำนวน thumbnail ที่จะ match เช่น ผมหน้าหลัง
    onChangeColorHandler?: (color: IColor | null, index: number) => void;
    onChangeThumbHandler?: (value: File | null, index: number) => void;
}

export const ColorAvatar = (props: ColorAvatarProps) => {
    const [cl_id, setColor] = useState(props.color);
    //const [thumbnail, setThumbnail] = useState<File | null>(null);

    useEffect(() => {
        setColor(props.color);
    }, [props.color])
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onChangeHandler = (value: IColor | null) => {
        if (value) {
            setColor(value._id);
            props.onChangeColorHandler && props.onChangeColorHandler(value, props.index);
        }
    }

    const onUpdateHandler = (value: File | null) => {
        //setThumbnail(value);
        props.onChangeThumbHandler && props.onChangeThumbHandler(value, props.index);
    }

    const onDeleteHandler = () => {
        //setThumbnail(null);
        //props.onUpdate?.(null);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//

    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Stack direction="row" spacing={1} sx={{ py: 1 }}>
            <ColorSelect options={props.options}
                onChangeHandler={onChangeHandler}
                value={cl_id}
            />
            {cl_id && cl_id !== "" ?
                <>
                    <OnView onUpdateHandler={onUpdateHandler}
                        src={props.src}
                    />
                    <IconButton aria-label="delete" size="medium" color="primary" onClick={onDeleteHandler}>
                        <DeleteIcon />
                    </IconButton>
                    {/* {props.count > 1 &&
                        <ThumbnailView ref={thumbRef2}
                            caption={
                                <div className='flex-m flex-c'
                                    style={{ width: 50, height: 50, textAlign: 'center' }} >
                                    <label htmlFor="thumbnail-input">
                                        ( Drag & Drop )
                                    </label>
                                </div>}
                            VW={100} VH={100}
                        />
                    } 
                    <div style={{ width: 20, height: 20 }}>
                        <IconButton aria-label="delete" size="medium" color="primary" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </div>*/}
                </> : <></>}
        </Stack>
    );
};

//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
interface IView {
    onUpdateHandler: (value: File | null) => void;
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

//--------------------------------------------------//
//--------------------------------------------------//