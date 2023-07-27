import { IconButton, Paper, SxProps, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
    onChangeHandler?: (e: string) => void;
    type: "search" | "fill";
    lable: string;
    value?: string;
    sx?: SxProps;
}

export const Search = (props: IProps) => {
    return (
        <div className="flex-m p-r-20">
            <Typography variant="h6" sx={{ pr: 1 }}>{props.lable}</Typography>
            <Paper
                component="form" elevation={0} variant="outlined"
                sx={{ p: '2px 0px', display: 'flex', alignItems: 'center', width: 250, border: 0, ...props.sx }}
            >
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    size="small"
                    onChange={(e) => props.onChangeHandler && props.onChangeHandler(e.target.value)}
                    variant="outlined"
                    sx={{ px: 0, borderWidth: 0 }}
                    InputProps={{ sx: { height: 35 } }}
                    value={props.value && props.value}
                />
                {props.type === "search" ?
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton> : <></>}
            </Paper>
        </div>
    )
}