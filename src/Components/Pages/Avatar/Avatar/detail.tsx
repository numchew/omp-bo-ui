import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import { primary } from '../../../../Styles/Theme';
import { IAvatar, DThumbnail, DAvatar, IThumbnail } from '../../../../Libs/Models/IAvatar.model';
import AvatarService from '../../../../Libs/Services/Avatar.service';
import { getSize } from '../../../../Libs/Constants/size';
import { resizeImage, MergeImages, GetFileImages } from '../../../../Libs/Extensions/Image.extension';
import { BUpdate, TypeEvent, TStatus, HName } from '../../../Common';
import { PartDefault, Part2Item, PartColor } from './'
import env from '../../../../Libs/Services/env';
import { ThumbnailContainer } from '../../../Common/Thumbnail';

/* function isAddColor(part: string): boolean {
    if (part.indexOf('hair') > -1) {
        return true;
    }
    return false;
} */

export function AvatarDetail() {
    const navigate = useNavigate();
    const { body, id } = useParams();
    const size = getSize("thumb");

    const [data, setData] = useState<IAvatar>(DAvatar());
    const [contentD, setContentD] = useState<IAvatar>(DAvatar());

    const [logo, setLogo] = useState<File | null>(null);
    const [newThumb, setThumb] = useState<(File | null)[]>([]);
    const [newIcon, setIcon] = useState<(File | null)[]>([]);

    //const [isUploadImg, setIsUploadImg] = useState(false);
    const [isUpdated, setUpdated] = useState(false);
    const [isMarge, setIsMarge] = useState(false);
    const mergedCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (id) {   //avatar update
            AvatarService.getContent(id).then(res => {
                setData(JSON.parse(JSON.stringify(res)));
                setContentD(JSON.parse(JSON.stringify(res)));
            }).catch((e) => { });
        } else {
            //new avatar
        }
    }, [])
    useEffect(() => {
        const keys1 = Object.keys(data) as (keyof IAvatar)[];
        //const keys2 = Object.keys(contentD) as (keyof IAvatar)[];
        setUpdated(!(keys1.every((key) => data[key] === contentD[key])));

        if (data.thumbnail[0] && data.thumbnail[1]) {
            setIsMarge(data.thumbnail[0].url !== "" && data.thumbnail[1].url !== "");
        } else {
            setIsMarge(false);
        }

        if (mergedCanvasRef.current)
            MergeImages(`${env.APP_API_HOST}/${data.icon}`, "", mergedCanvasRef.current, (url) => {

            });
    }, [data]);


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
    const onUpdateColor = (thumbs: IThumbnail[]) => {
        setData((pre) => ({ ...pre, thumbnail: thumbs }));
    }
    //--------------------------------------------------//
    //--------------------------------------------------//    
    ///// THUMBNAIL /////
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
    }

    //--------------------------------------------------//  
    const onUpdateLogo = (value: File | null) => {
        setLogo(value);
        setData(pre => ({ ...pre, icon: value ? URL.createObjectURL(value) : "" }));
    }

    const onUpdateThumb = (value: File | null, index: number) => {
        if (value) {
            resizeImage(value, size.w, size.h, (resizedImage) => {
                if (/* !logo &&  */data.icon === "") {
                    onUpdateLogo(resizedImage);
                }
                const ic = [...newIcon];
                if (ic.length > index) {
                    ic[index] = value;
                    setIcon(ic);
                } else {
                    setIcon([...newIcon, resizedImage]);
                }
                onUpdateImage_Data(value, index, resizedImage);
            });

            const th = [...newThumb];
            if (th.length > index) {
                th[index] = value;
                setThumb(th);
            } else {
                setThumb([...newThumb, value]);
            }
        } else {
            const th = [...newThumb];
            th.splice(index, 1);
            setThumb(th);
        }
    }

    const onUpdateImage_Data = (value: File | null, index: number, iconImg: File | null) => {
        const thumbs = [...data.thumbnail];
        if (!thumbs[index]) {
            thumbs[index] = DThumbnail();
        }

        thumbs[index].url = value ? URL.createObjectURL(value) : "";
        thumbs[index].icon = iconImg ? URL.createObjectURL(iconImg) : "";
        setData((pre) => ({ ...pre, thumbnail: thumbs }));
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

    const handleMergeImages = async () => {
        var url1 = data.thumbnail[1].url;
        var url2 = data.thumbnail[0].url;
        if (url1.indexOf('blob:') < 0) url1 = `${env.APP_API_HOST}/${url1}`;
        if (url2.indexOf('blob:') < 0) url2 = `${env.APP_API_HOST}/${url2}`;

        MergeImages(url1, url2, mergedCanvasRef, (url) => {
            setData((pre) => ({ ...pre, icon: url }));
            GetFileImages(mergedCanvasRef, (file) => {
                setLogo(file);
            })
        });
    };
    //--------------------------------------------------//
    const GraphicsView = (part: string) => {
        switch (part) {
            case "background": return (
                <>
                    <Box>
                        <Typography variant="h6" >THUMNAIL</Typography>
                        <canvas ref={mergedCanvasRef}
                            width={150} height={150}
                            style={{ border: '1px solid black', display: 'block' }}
                        >
                            <img src={data.icon.indexOf("blob:") > -1 ? data.icon : `${env.APP_API_HOST}/${data.icon}`} alt="icon" />
                        </canvas>
                        {/*  {`${env.APP_API_HOST}/${data.icon}`}
                {data.icon && <img src={data.icon.indexOf("blob:") > -1 ? data.icon : `${env.APP_API_HOST}/${data.icon}`} alt="icon" />}
                 */}
                        {isMarge ? <Box sx={{ py: 1 }}>
                            <Button variant="contained" sx={{ width: 150 }}
                                color='info'
                                onClick={handleMergeImages}>
                                <Typography variant="body1">Merge Images</Typography>
                            </Button>
                        </Box> : <></>}
                    </Box>

                    <Part2Item part={part}
                        onReset={onResetThumb}
                        onUpdate={onUpdateThumb}
                        src={data.thumbnail[0] && data.thumbnail[0].url}
                        src2={data.thumbnail[1] && data.thumbnail[1].url} />
                </>
            );
            case "eye": case "mouth": case "hair": case "cheek": return (
                <>
                    <Box id="LOGO" className="flex-row" sx={{ py: 2 }}>
                        <ThumbnailContainer onUpdate={onUpdateLogo} onReset={onResetLogo}
                            MAX_WIDTH={size.w} MAX_HEIGHT={size.h}
                            VW={150} VH={150}
                            src={data.icon} isCanRemove={logo !== null}
                            ref={mergedCanvasRef}
                        />
                    </Box>
                    <PartColor part={part} count={1}
                        data={data.thumbnail}
                        onReset={onResetThumb}
                        onUpdate={onUpdateThumb}
                        onUpdateColor={onUpdateColor}
                        src={data.thumbnail[0] && data.thumbnail[0].url} />
                </>
            );
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

            {GraphicsView(String(body))}
            {/* GRAPHIC */}
            {/*{colorList && data && (
                <Box sx={{ py: 2 }}>
                    <div className='flex-g'>
                        <Typography variant="h6">GRAPHIC</Typography>
                         {data.thumbnail.map((row: IThumbnail, index: number) => (
                                <><ColorAvatar index={index} options={colorList} count={1}
                                    onChangeColorHandler={onChangeColor}
                                    onChangeThumbHandler={onUpdateGraphic}
                                    src={row.url} color={row.color}
                                />{console.log(row)
                                    }</>
                            ))} 
                        <ColorAvatar index={-1} options={colorList} count={1}
                            onChangeColorHandler={onChangeColor}
                            onChangeThumbHandler={onUpdateGraphic}
                            color={newThumb.color}
                        />
                    </div>
                </Box>
            )}*/}
            <BUpdate disabled={!isUpdated}
                onCancel={onCancel} onComfirm={onConfirm}
            />
            <Divider color={primary} />
        </Box>
    )
    //--------------------------------------------------//
    //--------------------------------------------------//
}
