import React, { Component } from 'react'
import { Box, Checkbox, FormControlLabel, Typography, IconButton, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface IProps {
    isCanDelete?: boolean;
    label?: string;
    onDelete?: () => void;
}

export const HName = (props: IProps) => {
    return (
        <Box className="flex-row flex-m" sx={{ height: 50 }}>
            <Typography variant='h6' sx={{ flex: 1 }}>{props.label}</Typography>
            {props.isCanDelete &&
                <IconButton onClick={props.onDelete}>
                    <DeleteForeverIcon sx={{ fontSize: 30, color: "#424242" }} />
                </IconButton>
            }
        </Box>
    )
}
