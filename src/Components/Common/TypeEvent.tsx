import React, { useEffect } from 'react'
import { Box, FormControl, FormControlLabel, Paper, Typography, RadioGroup, Radio } from '@mui/material';

import sticker0 from '../../Assets/img/ic_sticker0.png';
import sticker1 from '../../Assets/img/ic_sticker1.png';
import mug0 from '../../Assets/img/ic_mug0.png';
import mug1 from '../../Assets/img/ic_mug1.png';
import shirt0 from '../../Assets/img/ic_shirt0.png';
import shirt1 from '../../Assets/img/ic_shirt1.png';
import totebag0 from '../../Assets/img/ic_totebag0.png';
import totebag1 from '../../Assets/img/ic_totebag1.png';

interface IProps {
    value: string;
    disabled?: boolean;
    onChangeEventHandler?: (value: string) => void;
}
//--------------------------------------------------//
//--------------------------------------------------//
export const TypeEvent = (props: IProps) => {

    const onChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        props.onChangeEventHandler && props.onChangeEventHandler(e.target.value)
    }

    return (
        <Box className="flex-row flex-m" sx={{ py: 1 }}>
            <Typography variant='h6' sx={{ pr: 2 }}>TYPE</Typography>
            <FormControl>
                <RadioGroup row aria-label="position" value={props.value}
                    onChange={onChangeEventHandler}>
                    <FormControlLabel
                        control={<Radio />}
                        label="NORMAL"
                        value="normal"
                    />
                    <FormControlLabel
                        control={<Radio />}
                        label="EVENT"
                        value="event"
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

//--------------------------------------------------//
//--------------------------------------------------//
export const TypeProduct = (props: IProps) => {
    const [type, setType] = React.useState("");

    useEffect(() => {
        setType(props.value);
    }, [props.value])

    const onChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        /* setType(e.target.value);
        props.onChangeEventHandler && props.onChangeEventHandler(e.target.value) */
    }

    const onClickHandler = (label: string) => {
        setType(label);
        props.onChangeEventHandler && props.onChangeEventHandler(label)
    }

    return (
        <FormControl>
            <RadioGroup row value={type} onChange={onChangeEventHandler}>
                <TypeIC value="sticker" disabled={props.disabled} selected={type === "sticker"} onClickHandler={onClickHandler} />
                <TypeIC value="mug" disabled={props.disabled} selected={type === "mug"} onClickHandler={onClickHandler} />
                <TypeIC value="shirt" disabled={props.disabled} selected={type === "shirt"} onClickHandler={onClickHandler} />
                <TypeIC value="totebag" disabled={props.disabled} selected={type === "totebag"} onClickHandler={onClickHandler} />
            </RadioGroup>
        </FormControl>
    )
}

//--------------------------------------------------//
//--------------------------------------------------//
interface IType {
    value: string;
    selected: boolean;
    disabled?: boolean;
    size?: number;
    onClickHandler?: (label: string) => void
    style?: React.CSSProperties;
}

export const TypeIC = (props: IType) => {
    const onClick = (e: any) => {
        e.preventDefault();
        props.onClickHandler?.(props.value)
    }
    return (
        <FormControlLabel sx={{ p: 0.2 }}
            onClick={onClick}
            value={props.value}
            disabled={props?.disabled}
            control={<Radio style={{ display: 'none' }} />} // Hide the default radio button
            label={
                <Paper className='flex-c-m' elevation={1}
                    /* style={{ backgroundColor: 'transparent' }} */>
                    <img src={getImagePath(props.value, props.selected)} alt="Type"
                        style={{ width: props?.size, height: 'auto' }}
                    />
                </Paper >
            }
        />
    )
}


const getImagePath = (value: string, selected: boolean) => {
    switch (value) {
        case 'sticker':
            return selected ? sticker1 : sticker0;
        case 'mug':
            return selected ? mug1 : mug0;
        case 'shirt':
            return selected ? shirt1 : shirt0;
        case 'totebag':
            return selected ? totebag1 : totebag0;
        default:
            return '';
    }
};
//--------------------------------------------------//
//--------------------------------------------------//