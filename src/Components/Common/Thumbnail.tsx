import React, { useState, useEffect, useRef, DragEvent, forwardRef } from 'react';
import { Button, Box, Paper, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import env from '../../Libs/Services/env';
import { ResizeImage } from '../../Libs/Extensions/Image.extension';

interface IProps {
    id?: number;
    MAX_WIDTH?: number;
    MAX_HEIGHT?: number;
    VW?: number;    //view image(height)
    VH?: number;    //view image(width)
    src?: string;
    label?: string;
    caption?: React.ReactNode;
    disabled?: boolean;
    isCanRemove?: boolean;
    onReset?: () => void;
    onUpdate?: (value: File | null) => void;
    onChange?: (value: File | null, icon: File | null, id: number) => void;
}

/*/////////////////////////////////////////////////////
THUMBNAIL

[ Drag and drop an image here, ... ]

File PNG {MAX_WIDTH}x{MAX_HEIGHT} Pixel
/////////////////////////////////////////////////////*/

export const ThumbnailContainer = forwardRef((props: IProps, ref) => {
    const thumbRef = useRef<ThumbnailViewRef>(null);
    const [isUpdated, setIsUpdate] = useState(false);

    //--------------------------------------------------//
    //--------------------------------------------------//
    const onUpdate = (value: File | null) => {
        setIsUpdate(true);
        props.onUpdate && props.onUpdate(value);
    }

    const onRemove = () => {
        thumbRef.current?.remove();
        setIsUpdate(false);
        props.onReset?.();
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <div>
            <Typography variant="h6" >{props.label ? props.label : 'THUMBNAIL'}</Typography>
            <ThumbnailView ref={thumbRef}
                id={props.id ? props.id : 0}
                {...props}
                onUpdate={onUpdate}
                onReset={props.onReset}
                src={props.src && `${props.src}`}
            />
            <Typography color="text.disabled" sx={{ fontStyle: 'italic' }}>
                {`File PNG or JPEG ${props.MAX_WIDTH} x ${props.MAX_HEIGHT} Pixel`}
            </Typography>
            {props?.isCanRemove || isUpdated ?
                <Box sx={{ py: 2 }}>
                    <Button variant="contained" color="error" onClick={onRemove}>
                        REMOVE
                    </Button>
                </Box> : <></>
            }
        </div>
    );
});

//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
//--------------------------------------------------//
export interface ThumbnailViewRef {
    remove: () => void;
}

export const ThumbnailView = forwardRef<ThumbnailViewRef, IProps>((props, ref) => {
    //const [thumbnail, setThumbnail] = useState<File | null>(null);
    //const [icon, setIcon] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("");
    //const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        setPreviewImage(props.src ? props.src : "");
    }, [props]);

    //--------------------------------------------------//
    //--------------------------------------------------//
    /* const handleThumbnailChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            ResizeImage(file, props.MAX_WIDTH, props.MAX_HEIGHT, (resizedImage) => {
                console.log('Resized Image:', resizedImage);
                //setThumbnail(resizedImage);
                props.onUpdate?.(resizedImage);
            });
        }
    }; */

    const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (props.disabled && props.disabled) {
            return;
        }
        const file = event.dataTransfer.files?.[0];
        if (file) {
            //setIsUpdated(true);
            ////// resize to icon //////
            /* ResizeImage(file, thumbWidth, thumbHeight, (resizedImage) => {
                setIcon(resizedImage);
            }); */
            ////// resize to thumbnail //////
            ResizeImage(file, props.MAX_WIDTH, props.MAX_HEIGHT, (resizedImage) => {
                //setThumbnail(resizedImage);
                props.onUpdate?.(resizedImage);
            });
        }
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Grid item xs={1} key={props.id}>
            <Box className='flex-c-m'
                my={1} sx={{ borderWidth: 2, p: 1 }}
                border="dotted"
                borderRadius={1}
                borderColor="primary.main"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {previewImage !== "" /* || icon */ ?
                    <Paper className='flex-c-m'>
                        <img alt="Thumbnail"
                            style={{ maxWidth: props.VW ? props.VW : '100%', height: 'auto' }}
                            src={/* thumbnail
                                ? URL.createObjectURL(thumbnail)
                                : */ previewImage.indexOf('blob') > -1 ?
                                    previewImage : `${env.APP_API_HOST}/${previewImage}`
                            }
                        />
                    </Paper>
                    : props.caption ? props.caption :
                        <div className='flex-c'>
                            <label htmlFor={`input-${props.id}`}>
                                Drag and drop an image here
                            </label>
                        </div>
                }

                {/* <input type="file"
                    id={`input-${props.id}`}
                    accept="image/png, image/jpeg"
                    onChange={handleThumbnailChange}
                    style={{ display: 'none' }}
                    //disabled={props.disabled}
                    disabled={true}
                /> */}
            </Box>
        </Grid>
    )
    //--------------------------------------------------//
    //--------------------------------------------------//
});

//--------------------------------------------------//
//--------------------------------------------------//