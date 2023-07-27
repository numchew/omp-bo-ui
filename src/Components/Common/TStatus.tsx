import React from 'react'
import Typography from '@mui/material/Typography';

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