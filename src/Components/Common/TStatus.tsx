import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

interface IProps {
    title: string;
    msg: string;
    hStyle?: object;
    msgStyle?: object;
    msg_disabled?: boolean;
}

export function TStatus(props: IProps) {
    return (
        <div className="dis-flex flex-row">
            <Typography variant="h6" sx={{ width: 90, ...props.hStyle }}>{props.title}</Typography>
            {
                !props.msg_disabled ?
                    <Typography variant="h6" sx={{ width: 300, px: 2, ...props.msgStyle }} color="text.secondary">
                        {props.msg}
                    </Typography> : <></>
            }
        </div>
    )
}


//--------------------------------------------------//
//--------------------------------------------------//
interface IAddressProps {
    id: number;
    label?: string;
    dValue?: string;
    onChange?: (id: number, value: string) => void;
}

export interface IAddressRef {
    setValue: (m: string) => void;
}

export const AddressBox = forwardRef<IAddressRef, IAddressProps>(({ id, label, dValue, onChange }, ref) => {
    const [msg, setMsg] = useState("")

    useImperativeHandle(ref, () => ({
        setValue: (m: string) => { setMsg(m); },
    }));

    const showMessage = (e: any) => {
        e.preventDefault();
        setMsg(e.target.value);
        onChange?.(id, e.target.value);
    };

    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <div className="dis-flex flex-row">
            <Typography variant="h6" sx={{ width: 100 }}>{label}</Typography>
            <TextField multiline rows={3}
                defaultValue={dValue} size="small"
                variant="outlined" sx={{ width: 250 }}
                onChange={showMessage}
                value={msg}
            />
        </div>
    )
});

//--------------------------------------------------//
//--------------------------------------------------//