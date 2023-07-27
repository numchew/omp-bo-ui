import React from 'react'
import logo from '../../Assets/img/error.svg';
import { Typography } from '@mui/material';

export function Error() {
    return (
        <div className="dis-flex flex-col flex-c-m " style={{ height: "100vh", width: "100vw" }}>
            <img src={logo} alt="Logo" />
            <Typography variant='h3' color="text.secondary">Access Denied</Typography>
            <Typography variant='h6' color="text.secondary">Sorry about that, but don't have permission to access this page</Typography>
        </div>
    )
}

//Please check your internet connection.