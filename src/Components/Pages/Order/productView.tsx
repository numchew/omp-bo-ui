import React from 'react'
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
    bgcolor: 'background.paper',
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
        <div style={{ maxWidth: 'auto', height: '700px', overflow: 'hidden' }}>
            <img src={imageUrl} alt="img"
                style={{
                    width: 'auto', height: '600px',
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }} />
        </div>
    );
}

export function ProductView(props: IProps) {
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
                <Typography variant="h6">{props.data && props.data.name}</Typography>
                <div>
                    <PreviewImageComponent imageUrl={`${env.APP_API_HOST}/${props.data?.imgbg}`} />
                </div>
                <div>
                    <Button variant="contained"
                        sx={{ width: 110 }}
                        color='info'
                        onClick={() => downloadImage(`${env.APP_API_HOST}/${props.data?.imgbg}`, "image.jpg")}
                    ><Typography variant="body1">PRINT</Typography>
                    </Button></div>
            </Box>
        </>
    )
}
