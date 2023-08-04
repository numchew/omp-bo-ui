import React, { useState } from 'react'
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { IOrderProduct } from '../../../Libs/Models/IOrder.model';
import env from '../../../Libs/Services/env';
import { saveAs } from "file-saver";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'gray',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IProps {
    data: IOrderProduct | undefined;
}

interface Props {
    imageUrl: string;
}

const PreviewImageComponent: React.FC<Props> = ({ imageUrl }) => {
    return (
        <div style={{ maxWidth: 'auto', height: '700px', backgroundColor: 'red' /* , overflow: 'hidden' */ }}>
            <img src={imageUrl} alt="img"
                style={{
                    width: 'auto', height: '500px',
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }} />
        </div>
    );
}

export function ProductView(props: IProps) {
    const [url, setUrl] = useState("");
    React.useEffect(() => {
        var _url = props.data?.imgbg ? props.data?.imgbg : "";
        if (_url === "" || props.data?.type.toString().toLowerCase() === 'mug') {
            _url = props.data?.imgchar ? props.data?.imgchar : "";
        }
        setUrl(_url)
    }, [props])

    const downloadImage = async (imageUrl: string, filename: string) => {
        var url = imageUrl.replace('_uploads/', 'files/');
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            saveAs(blob, filename);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <>
            <Box sx={style} className="flex-col flex-m">
                <Typography variant="h6" color="primary.contrastText">{props.data && props.data.name}</Typography>
                <>
                    <PreviewImageComponent imageUrl={`${env.APP_API_HOST}/${url}`} />
                </>
                <div>
                    <Button variant="contained"
                        sx={{ width: 110 }}
                        color='info'
                        onClick={() => downloadImage(`${env.APP_API_HOST}/${url}`, "image.png")}
                    ><Typography variant="body1">PRINT</Typography>
                    </Button></div>
            </Box>
        </>
    )
}
