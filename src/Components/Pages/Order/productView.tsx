import React from 'react'
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { IOrderProduct } from '../../../Libs/Models/IOrder.model';
import env from '../../../Libs/Services/env';
import { saveAs } from "file-saver";
import axios from 'axios';

function getStylePrint(pd: string) {
    var sty = { style: "" };
    switch (pd) {
        /* case 'sticker': return { style: "max-width: 55%; height: auto;" };;
        case 'mug': return { style: "max-width: 67%; height: auto; transform: rotate(-90deg);" };
        case 'shirt': return { style: "max-width: 100%; height: auto;" };
        case 'totebag': return { style: "max-width: 85%; height: auto;" }; */
        case 'sticker': sty = { style: "max-width: 55%; height: auto;" }; break;
        case 'mug': sty = { style: "max-width: 67%; height: auto; transform: rotate(-90deg);  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)" }; break;
        case 'shirt': sty = { style: "max-width: 100%; height: auto;" }; break;
        case 'totebag': sty = { style: "max-width: 85%; height: auto;" }; break;
    }
    //position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)
    //sty.style = sty.style.concat(" position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)");
    return sty;
}


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
            <img src={imageUrl} alt="Printed Image"
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
