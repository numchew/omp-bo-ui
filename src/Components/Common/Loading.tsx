import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material';

interface IProps {
    open: boolean;
}

export function Loading(props: IProps) {
    return (
        <div className="Auth-body">
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
