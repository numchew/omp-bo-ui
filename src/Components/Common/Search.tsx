import React, { useState } from 'react';
import { IconButton, Paper, SxProps, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
    onChangeHandler?: (e: string) => void;
    type: "search" | "fill" | "text";
    lable: string;
    value?: string;
    sx?: SxProps;
    hStyle?: object;
    loaded?: boolean;
}

export const Search = (props: IProps) => {
    const [txt, setTxt] = useState(props.value);

    React.useEffect(() => { setTxt(props.value); }, [props.value])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.type !== 'text') {
            setTxt(e.target.value);
            props.onChangeHandler && props.onChangeHandler(e.target.value)
        }
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <div className="flex-m p-r-20">
            <Typography variant="h6" sx={{ pr: 1, ...props.hStyle }}>{props.lable}</Typography>
            <Paper
                component="form" elevation={0} variant="outlined"
                sx={{ p: '2px 0px', display: 'flex', alignItems: 'center', width: 250, border: 0, ...props.sx }}>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    size="small"
                    onChange={onChangeHandler}
                    variant="outlined"
                    sx={{ px: 0, borderWidth: 0 }}
                    InputProps={{ sx: { height: 35 } }}
                    value={txt}
                //placeholder={props.value}
                //defaultValue={txt}
                />
                {props.type === "search" ?
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton> : <></>}
            </Paper>
        </div>
    )
}