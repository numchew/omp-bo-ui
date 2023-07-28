import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import { primary } from '../../../../Styles/Theme';
import { IAvatar, DThumbnail, DAvatar, IThumbnail } from '../../../../Libs/Models/IAvatar.model';
import AvatarService from '../../../../Libs/Services/Avatar.service';
import { getSize } from '../../../../Libs/Constants/size';
import { resizeImage, MergeImages, GetFileImages } from '../../../../Libs/Extensions/Image.extension';
import { BUpdate, TypeEvent, TStatus, HName } from '../../../Common';
import { PartDefault, Part2Item, PartColor } from './'
import env from '../../../../Libs/Services/env';
import { ThumbnailContainer } from '../../../Common/Thumbnail';

export function AvatarDetail() {
    const navigate = useNavigate();
    const { body, id } = useParams();
    const size = getSize("thumb");

    const [data, setData] = useState<IAvatar>(DAvatar());
    const [contentD, setContentD] = useState<IAvatar>(DAvatar());

    const [logo, setLogo] = useState<File | null>(null);
    const [newThumb, setThumb] = useState<(File | null)[]>([]);
    const [newThumbBG, setThumbBG] = useState<(File | null)[]>([]);
    const [newIcon, setIcon] = useState<(File | null)[]>([]);

    const [isUpdated, setUpdated] = useState(false);
    const [count, setCount] = useState(1);
    const mergedCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setCount(body === 'hair' ? 2 : 1);
    }, [body]);

    useEffect(() => {
        if (id) {   //avatar update
            AvatarService.getContent(id).then(res => {
                setData(JSON.parse(JSON.stringify(res)));
                setContentD(JSON.parse(JSON.stringify(res)));
            }).catch((e) => { });
        } else {
            //new avatar
        }
    }, [id])
    useEffect(() => {
        const keys1 = Object.keys(data) as (keyof IAvatar)[];
        //const keys2 = Object.keys(contentD) as (keyof IAvatar)[];
        setUpdated(!(keys1.every((key) => data[key] === contentD[key])));
        //handleMergeImages(0)
        /* if (data.thumbnail[0]) {
            setIsMarge(data.thumbnail[0].url !== "" && data.thumbnail[0].bg !== "");
        } else {
            setIsMarge(false);
        } */

        /*if (mergedCanvasRef.current)
            MergeImages(`${env.APP_API_HOST}/${data.icon}`, "", mergedCanvasRef.current, (url) => {

            }); 
            handleMergeImages(0)

        console.log(data.thumbnail); */
        //handleMergeImages(0)

    }, [data, contentD]);
    //--------------------------------------------------//
    //--------------------------------------------------//    
    ///// ACTIVATE, TYPE /////
    /* const onChangeNameHandler = (value: string) => {
        setData((pre) => ({ ...pre, name: value }));
    } */
    const onChangeEventHandler = (value: string) => {
        setData((pre) => ({ ...pre, type: value }));
    }
    const onChangeActivate = (e: any) => {
        setData((pre) => ({ ...pre, activate: e.target.checked }));
    }
    const onUpdateColor = (thumb: IThumbnail, index: number) => {
        const thumbs = [...data.thumbnail];
        thumbs[index] = thumb;
        setData((pre) => ({ ...pre, thumbnail: thumbs }));
    }
    //--------------------------------------------------//
    //--------------------------------------------------//    
    ///// RESET -THUMBNAIL /////
    const onResetLogo = (index: number = 0) => {
        setLogo(null);
        setData((pre) => ({ ...pre, icon: contentD.icon }));
    }

    const onResetThumb = (index: number) => {
        onUpdateThumb(null, index);
        const thumbs = [...data.thumbnail];
        if (contentD.thumbnail.length > index) {
            thumbs[index].url = contentD.thumbnail[index].url;
            thumbs[index].icon = contentD.thumbnail[index].icon;
        } else {
            thumbs[index].url = "";
            thumbs[index].icon = "";
        }
        setData((pre) => ({ ...pre, thumbnail: thumbs }));
        //handleMergeImages(index);
        // setLogo(null);
    }

    const onResetThumbBG = (index: number) => {
        onUpdateThumbBG(null, index);
        const thumbs = [...data.thumbnail];
        if (contentD.thumbnail.length > index) {
            thumbs[index].bg = contentD.thumbnail[index].bg;
            thumbs[index].icon = contentD.thumbnail[index].icon;
        } else {
            thumbs[index].bg = "";
            thumbs[index].icon = "";
        }
        setData((pre) => ({ ...pre, thumbnail: thumbs }));
        //handleMergeImages(index);
        //setLogo(null);
    }

    //--------------------------------------------------//  
    //--------------------------------------------------// 
    ///// UPDATE -THUMBNAIL /////
    const onUpdateLogo = (value: File | null) => {
        setLogo(value);
        setData(pre => ({ ...pre, icon: value ? URL.createObjectURL(value) : "" }));
    }

    const onUpdateThumb = (value: File | null, index: number, color: string = "") => {
        if (value) {    //add
            Promise.resolve().then(() => {
                const th = [...newThumb];
                if (th.length > index) {
                    th[index] = value;
                    setThumb(th);
                } else {
                    setThumb([...newThumb, value]);
                }

            }).then(() => { generateIcon(value, index, color, true); })
        } else {   //remove
            const th = [...newThumb];
            th.splice(index, 1);
            setThumb(th);

            const thumb = [...data.thumbnail];
            thumb.splice(index, 1);
            setData((pre) => ({ ...pre, thumbnail: thumb }));
        }
    }
    const onUpdateThumbBG = (value: File | null, index: number, color: string = "") => {
        if (value) {    //add
            Promise.resolve().then(() => {
                const th = [...newThumbBG];
                if (th.length > index) {
                    th[index] = value;
                    setThumbBG(th);
                } else { setThumbBG([...newThumbBG, value]); }
            }).then(() => generateIcon(value, index, color, false))
        } else {    //remove
            const th = [...newThumbBG];
            th.splice(index, 1);
            setThumbBG(th);

            const thumb = [...data.thumbnail];
            thumb.splice(index, 1);
            setData((pre) => ({ ...pre, thumbnail: thumb }));
        }
    }

    const generateIcon = (value: File, index: number, color: string, isURL: boolean) => {
        resizeImage(value, size.w, size.h, (resizedImage) => {
            if (count === 1) {
                if (data.icon === "") {
                    onUpdateLogo(resizedImage);
                }
                const ic = [...newIcon];
                if (ic.length > index) {
                    ic[index] = value;
                    setIcon(ic);
                } else {
                    setIcon([...newIcon, resizedImage]);
                }
            } else {

            }
            onUpdateImage_Data(value, index, resizedImage, color, isURL);
        });
    }

    const onUpdateImage_Data = (value: File | null, index: number, iconImg: File | null, color: string, isURL: boolean) => {
        const thumbs = [...data.thumbnail];
        if (!thumbs[index]) {
            thumbs[index] = DThumbnail();
        }
        isURL ? thumbs[index].url = value ? URL.createObjectURL(value) : ""
            : thumbs[index].bg = value ? URL.createObjectURL(value) : "";
        thumbs[index].icon = iconImg ? URL.createObjectURL(iconImg) : "";
        thumbs[index].color = color;
        setData((pre) => ({ ...pre, thumbnail: thumbs }));

        if (thumbs[index].url !== "" && thumbs[index].bg !== "") {
            handleMergeImages(index);
        }
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    ///// Button /////, 
    const onConfirm = async () => {
        //setIsUploadImg(true);
        AvatarService.uploads(logo, newThumb, newIcon).then((res: any) => {
            //{ logo: logoUrl, thumbs: fileUrls, icons: iconsUrls };
            const _d_ = { ...data };
            _d_.icon = logo ? res.logo : _d_.icon;

            var index: number = 0;
            for (var i = 0; i < _d_.thumbnail.length; i++) {
                if (_d_.thumbnail[i].url.indexOf('blob:') > -1) {
                    _d_.thumbnail[i].url = res.thumbs[index];
                    _d_.thumbnail[i].icon = res.icons[index];
                    index++;
                }
            }
            _d_.part = String(body);

            if (_d_._id !== "") {
                AvatarService.updateContent(_d_._id, _d_).then((res: any) => {
                    setData(JSON.parse(JSON.stringify(res)));
                    setContentD(JSON.parse(JSON.stringify(res)));
                    //setIsUploadImg(false);
                    navigate(-1);
                })
            } else {
                AvatarService.create(_d_).then((res: any) => {
                    setData(JSON.parse(JSON.stringify(res)));
                    setContentD(JSON.parse(JSON.stringify(res)));
                    //setIsUploadImg(false);
                    navigate(-1);

                })
            }

        })
    };
    //--------------------------------------------------//
    const onCancel = () => {
        //<<--back
        navigate(-1);
    }

    const onDelete = async () => {
        //<<--back
        await AvatarService.deleteContent(data._id);
        navigate(-1);
    }

    const handleMergeImages = async (index: number) => {
        console.log(data.thumbnail);

        if (data.thumbnail && data.thumbnail.length > 0) {
            var url1 = data.thumbnail[index].bg;
            var url2 = data.thumbnail[index].url;
            if (url1.indexOf('blob:') < 0) url1 = `${env.APP_API_HOST}/${url1}`;
            if (url2.indexOf('blob:') < 0) url2 = `${env.APP_API_HOST}/${url2}`;



            MergeImages(url1, url2, mergedCanvasRef, (url) => {
                setData((pre) => ({ ...pre, icon: url }));
                GetFileImages(mergedCanvasRef, (file) => {
                    setLogo(file);
                });
            });
        }

    };
    //--------------------------------------------------//
    const GraphicsView = (part: string) => {
        switch (part) {
            ////////////////////////////////////
            case "background": return (
                <>
                    <Box>
                        <Typography variant="h6" >THUMNAIL</Typography>
                        <canvas ref={mergedCanvasRef}
                            width={150} height={150}
                            style={{ border: '1px solid black', display: 'block' }}
                        >
                        </canvas>
                        {/* 
                        {isMarge ? <Box sx={{ py: 1 }}>
                            <Button variant="contained" sx={{ width: 150 }}
                                color='info'
                                onClick={() => handleMergeImages(0)}>
                                <Typography variant="body1">Merge Images</Typography>
                            </Button>
                        </Box> : <></>} */}
                    </Box>
                    <Part2Item part={part}
                        onReset={onResetThumb}
                        onResetBG={onResetThumbBG}
                        onUpdate={onUpdateThumb}
                        onUpdateBG={onUpdateThumbBG}
                        src={data.thumbnail[0] && data.thumbnail[0].url}
                        bg={data.thumbnail[0] && data.thumbnail[0].bg} />
                </>
            );
            ////////////////////////////////////
            case "eye": case "mouth": case "hair": case "cheek": {
                return (
                    <>{count === 1 &&
                        <Box id="LOGO" className="flex-row" sx={{ py: 2 }}>
                            <ThumbnailContainer onUpdate={onUpdateLogo} onReset={onResetLogo}
                                MAX_WIDTH={size.w} MAX_HEIGHT={size.h}
                                VW={150} VH={150}
                                src={data.icon} isCanRemove={logo !== null}
                                ref={mergedCanvasRef}
                            />
                        </Box>}
                        <PartColor part={part} count={count}
                            data={data.thumbnail}
                            onReset={onResetThumb}
                            //onResetBG={onResetThumbBG}
                            onUpdateThumb={onUpdateThumb}
                            onUpdateThumbBG={onUpdateThumbBG}
                            onUpdateColor={onUpdateColor}
                           /*  src={data.thumbnail[0] && data.thumbnail[0].url} */ />
                    </>
                );
            }
            ////////////////////////////////////
            default: return (
                <>
                    <Box id="LOGO" className="flex-row" sx={{ py: 2 }}>
                        <ThumbnailContainer onUpdate={onUpdateLogo} onReset={onResetLogo}
                            MAX_WIDTH={size.w} MAX_HEIGHT={size.h}
                            VW={150} VH={150}
                            src={data.icon} isCanRemove={logo !== null}
                            ref={mergedCanvasRef}
                        />
                    </Box>
                    <PartDefault part={part}
                        onReset={onResetThumb}
                        onUpdate={onUpdateThumb}
                        src={data.thumbnail[0] && data.thumbnail[0].url} />
                </>
            );
            ////////////////////////////////////
        }
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Box sx={{ p: 2 }}>
            <HName label={body?.toUpperCase()} isCanDelete={data._id !== ""} onDelete={onDelete} />
            <Divider color={primary} />
            <Box id="DETAIL" className="flex-row flex-m" sx={{ pt: 2 }}>
                <TStatus title="ID" msg={data._id} hStyle={{ width: 10 }} msgStyle={{ width: 200 }} />
                <FormControlLabel control={<Checkbox checked={data.activate} />} label="ACTIVATE" onChange={onChangeActivate} />
            </Box>

            <TypeEvent value={data.type} onChangeEventHandler={onChangeEventHandler} />

            {/* GRAPHIC */}
            {GraphicsView(String(body))}

            <BUpdate disabled={!isUpdated}
                onCancel={onCancel} onComfirm={onConfirm}
            />
            <Divider color={primary} />
        </Box>
    )
    //--------------------------------------------------//
    //--------------------------------------------------//
}
