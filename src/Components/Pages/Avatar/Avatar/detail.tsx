import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Checkbox, Divider, FormControlLabel, Typography, Paper } from '@mui/material';
import { primary } from '../../../../Styles/Theme';
import { IAvatar, DThumbnail, DAvatar, IThumbnail, CompareAvatars } from '../../../../Libs/Models/IAvatar.model';
import AvatarService from '../../../../Libs/Services/Avatar.service';
import { getIcon, getSize } from '../../../../Libs/Constants/size';
import { MergeImages, ResizeImage } from '../../../../Libs/Extensions/Image.extension';
import { BUpdate, TypeEvent, TStatus, HName } from '../../../Common';
import { PartDefault, Part2Item, PartColor } from './'
import env from '../../../../Libs/Services/env';
import { ThumbnailContainer } from '../../../Common/Thumbnail';

export function AvatarDetail() {
    const navigate = useNavigate();
    const { body, id } = useParams();
    const iconS = getIcon(String(body));
    const sizeS = getSize(String(body));

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
        } else {  /*new avatar*/ }
    }, [id])

    useEffect(() => {
        setUpdated(!CompareAvatars(data, contentD));
        /* console.log(data);
        console.log("---------------");
        console.log('logo', logo);
        console.log('newThumb', newThumb);
        console.log('newThumbBG', newThumbBG);
        console.log('newIcon', newIcon);
        console.log("---------------"); */

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
        onUpdateLogo(null);
    }

    const onResetThumb = (index: number) => {
        onUpdateThumb(null, index);
    }

    const onRemoveThumb = (index: number) => {
        onUpdateThumb(null, index);
        const thumbs = [...data.thumbnail];
        thumbs.splice(index, 1);
        setData(pre => ({ ...pre, thumbnail: thumbs }));
    }

    const onResetThumbBG = (index: number) => {
        onUpdateThumbBG(null, index);
    }

    //--------------------------------------------------// 
    //--------------------------------------------------// 
    ///// UPDATE -THUMBNAIL /////
    const onUpdateLogo = (value: File | null) => {
        if (value === null) {
            setLogo(null);
            setData(pre => ({ ...pre, icon: "" }));
        } else {
            ResizeImage(value, iconS.w, iconS.h, (resize: File) => {
                setLogo(resize);
                setData(pre => ({ ...pre, icon: URL.createObjectURL(resize) }));
            });
        }
    }

    const onUpdateIcon = (value: File | null, index: number) => {
        if (value) {
            ResizeImage(value, iconS.w, iconS.h, (resize: File) => {
                const ic = [...newIcon];
                if (ic.length > index) {
                    ic[index] = resize;
                    setIcon(ic);
                } else {
                    setIcon([...newIcon, value]);
                }
            });
        }

    }

    const UpdateData = (thumbs: IThumbnail[], index: number, url: string, bg: string, color: string) => {
        thumbs[index].url = url;
        thumbs[index].bg = bg;
        thumbs[index].color = color;
        if (thumbs[index].url === "" && thumbs[index].bg === "") {
            thumbs.splice(index, 1);
        }

        setData(pre => ({ ...pre, thumbnail: thumbs }));
        console.log('*****UpdateData*****');
        if (bg !== "" && url !== "") {
            MergeImages([bg, url], iconS.w, iconS.h,
                (icon: File) => {
                    const ic = [...newIcon];
                    if (ic.length > index) {
                        ic[index] = icon;
                        setIcon(ic);
                    } else {
                        setIcon([...newIcon, icon]);
                    }

                    thumbs[index].icon = URL.createObjectURL(icon);
                    setData(pre => ({ ...pre, thumbnail: thumbs }));
                });
        }
    }

    const onUpdateThumb = (value: File | null, index: number, color: string = "") => {
        const th = [...newThumb];
        const thumbs = [...data.thumbnail];
        if (value) { //ADD
            if (data.icon === "") {
                onUpdateLogo(value);    //น่าจะไม่ใช้
            }
            if (count === 1) {
                onUpdateIcon(value, index);
            }
            ResizeImage(value, sizeS.w, sizeS.h, (resize: File) => {
                th[index] = resize;
                setThumb(th);
                if (thumbs.length <= index) {
                    thumbs[index] = DThumbnail();
                }
                UpdateData(thumbs, index,
                    URL.createObjectURL(resize), thumbs[index].bg, color);
            });
        } else {    //REMOVE
            th.splice(index, 1);
            setThumb(th);

            var url = "";
            if (contentD.thumbnail.length > index) {
                url = contentD.thumbnail[index].url;
            }
            UpdateData(thumbs, index, url, thumbs[index].bg, color);
        }
    }

    const onUpdateThumbBG = (value: File | null, index: number, color: string = "") => {
        const th = [...newThumb];
        const thumbs = [...data.thumbnail];
        if (value) { //ADD
            ResizeImage(value, sizeS.w, sizeS.h, (resize: File) => {
                th[index] = resize;
                setThumbBG(th);
                if (thumbs.length <= index) {
                    thumbs[index] = DThumbnail();
                }
                UpdateData(thumbs, index,
                    thumbs[index].url, URL.createObjectURL(resize), color);
            });
        } else {   //REMOVE
            th.splice(index, 1);
            setThumbBG(th);

            var bg = "";
            if (contentD.thumbnail.length > index) {
                bg = contentD.thumbnail[index].bg;
            }
            UpdateData(thumbs, index, thumbs[index].url, bg, color);
        }
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    ///// Button /////, 
    const onConfirm = async () => {
        //setIsUploadImg(true);
        AvatarService.uploads(body ? body : "", logo, newThumb, newThumbBG, newIcon).then((res: any) => {
            //{ logo: logoUrl, thumbs: fileUrls, icons: iconsUrls, bgs: bgUrls };
            const _d_ = { ...data };
            _d_.part = body ? body : "";
            _d_.icon = res.logo ? res.logo : _d_.icon;

            var u: number = 0, b: number = 0, c: number = 0;
            for (var i = 0; i < _d_.thumbnail.length; i++) {
                if (_d_.thumbnail[i].url.indexOf('blob:') > -1) {
                    _d_.thumbnail[i].url = res.thumbs[u++];
                    _d_.thumbnail[i].bg = res.bgs[b++];
                    _d_.thumbnail[i].icon = res.icons[c++];
                }
            }

            if (_d_.id && _d_.id > 0) {
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
        });
    };
    const onCancel = () => {
        //<<--back
        navigate(-1);
    }

    const onDelete = async () => {
        //<<--back
        await AvatarService.deleteContent(data._id);
        navigate(-1);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    const GraphicsView = (part: string) => {
        switch (part) {
            ////////////////////////////////////
            case "background": return (
                <>
                    <Box>
                        <Typography variant="h6" >THUMNAIL</Typography>
                        {/* <canvas ref={mergedCanvasRef}
                            width={150} height={150}
                            style={{ border: '1px solid black', display: 'block' }}
                        >
                        </canvas> */}
                        <Box className='flex-l-m'>
                            {data.thumbnail && data.thumbnail.length > 0 && data.thumbnail[0].icon &&
                                <Paper className='flex-c-m'>
                                    <img alt="Thumbnail" width={150} height={'auto'}
                                        src={
                                            data.thumbnail && data.thumbnail[0].icon.indexOf('blob') > -1 ?
                                                `${data.thumbnail[0].icon}` :
                                                `${env.APP_API_HOST}/${data.thumbnail[0].icon}`
                                        }
                                    />
                                </Paper>
                            }
                        </Box>
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
                        <Box id="LOGO" className="flex-row" sx={{ py: 0 }}>
                        </Box>}
                        <PartColor part={part} count={count}
                            data={data.thumbnail}
                            onReset={onRemoveThumb}
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
                            MAX_WIDTH={iconS.w} MAX_HEIGHT={iconS.h}
                            VW={150} VH={150}
                            src={data && (
                                data.icon ? data.icon
                                    : data.thumbnail[0] && data.thumbnail[0].icon
                            )} isCanRemove={logo !== null}
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
            <BUpdate disabled={!isUpdated || (data.thumbnail && data.thumbnail.length < 1)}
                onCancel={onCancel} onComfirm={onConfirm}
            />
            <Divider color={primary} />
        </Box>
    )
    //--------------------------------------------------//
    //--------------------------------------------------//
}
