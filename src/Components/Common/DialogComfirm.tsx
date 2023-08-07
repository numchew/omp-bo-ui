import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
    onOK?: () => void;
}

export default function DialogComfirm(props: IProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(props.isOpen);

    React.useEffect(() => {
        setOpen(props.isOpen);
    }, [props.isOpen])

    const handleClickOK = () => {
        setOpen(true);
        props.onOK && props.onOK();
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose && props.onClose();
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"You want to delete?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You will never be able to go back.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Disagree
                </Button>
                <Button onClick={handleClickOK} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}
