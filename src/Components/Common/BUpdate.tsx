import { Box, Button } from '@mui/material';

interface IProps {
    disabled?: boolean;
    onCancel?: () => void;
    onComfirm?: () => void;
}

export const BUpdate = (props: IProps) => {
    const onCancel = () => {
        props.onCancel && props.onCancel()
    }

    const onComfirm = () => {
        props.onComfirm && props.onComfirm();
    }

    return (
        <Box sx={{ py: 2 }} className="flex-m">
            <Button variant="contained" color="error" onClick={onCancel}
                sx={{ width: 100 }}
            >
                BACK
            </Button>
            <Box sx={{ px: 1 }}></Box>
            <Button variant="contained" color="secondary" onClick={onComfirm}
                disabled={props.disabled}
                sx={{ width: 100 }}
            >
                SAVE
            </Button>
        </Box>
    )
}
