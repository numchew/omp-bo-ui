import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Box, Checkbox, FormControlLabel, Typography, Stack, Grid, Paper, Backdrop, Button } from '@mui/material';
import { primary } from '../../../Styles/Theme';
import { ICollab, DCollab } from '../../../Libs/Models/ICollab.model';
import CollabService from '../../../Libs/Services/Collab.service';
import { getSize } from '../../../Libs/Constants/size';

import { BUpdate, HName, Loading, Search, TStatus, TypeProduct, TypeIC, ThumbnailContainer, TypeEvent } from '../../Common';
import { ThumbnailView, ThumbnailViewRef } from '../../Common/Thumbnail';
import { IThumbnail, DThumbnail } from '../../../Libs/Models/IAvatar.model';
import env from '../../../Libs/Services/env';

import { useDrop } from 'react-dnd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';



export function CollabDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const size = getSize('thumb');
    //const collab = useSelector((data: RootStore) => data.collab);

    const [data, setData] = useState<ICollab>(DCollab());
    const [contentD, setContentD] = useState<ICollab>(DCollab());

    const [logo, setLogo] = useState<File | null>(null);
    const [newThumb, setThumb] = useState<(File | null)[]>([]);
    const [newIcon, setIcon] = useState<(File | null)[]>([]);

    const [isUploadImg, setIsUploadImg] = useState(false);
    const [isUpdated, setUpdated] = useState(false);

    useEffect(() => {
        if (id) {
            CollabService.getContent(id).then(res => {
                setData(JSON.parse(JSON.stringify(res)));
                setContentD(JSON.parse(JSON.stringify(res)));
            }).catch((e) => { });
        }
    }, []);

    useEffect(() => {
        const keys1 = Object.keys(data) as (keyof ICollab)[];
        const keys2 = Object.keys(contentD) as (keyof ICollab)[];
        setUpdated(!(keys1.every((key) => data[key] === contentD[key])));
    }, [data]);
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onChangeNameHandler = (value: string) => {
        setData((pre) => ({ ...pre, name: value }));
    }
    const onChangeEventHandler = (value: string) => {
        setData((pre) => ({ ...pre, type: value }));
    }
    const onChangeActivate = (e: any) => {
        setData((pre) => ({ ...pre, activate: e.target.checked }));
    }
    //--------------------------------------------------//
    //--------------------------------------------------//    
    ///// THUMBNAIL /////
    const onResetLogo = (index: number = 0) => {
        setLogo(null);
        setData((pre) => ({ ...pre, icon: contentD.icon }));
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    const onConfirm = async () => {
        //upload icon
        console.log('***** upload ******');
        setIsUploadImg(true);
        await CollabService.uploads(logo, newThumb, newIcon)
            .then((res: any) => {
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

                CollabService.create(data).then(res => {
                    setData(res);
                    navigate(-1);
                }).catch((e) => { return e });

            }).catch((e) => { return []; });
    };


    const onClear = () => {
        data.thumbnail = [];
        setThumb([]);
        setIcon([]);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    const onClickHandler = (label: string) => {
        switch (label) {
            case 'sticker': setData((pre) => ({ ...pre, sticker: !data.sticker })); break;
            case 'mug': setData((pre) => ({ ...pre, mug: !data.mug })); break;
            case 'shirt': setData((pre) => ({ ...pre, shirt: !data.shirt })); break;
            case 'totebag': setData((pre) => ({ ...pre, totebag: !data.totebag })); break;
        }
    }

    const onUpdateLogo = (value: File | null) => {
        setLogo(value);
        setData(pre => ({ ...pre, icon: value ? URL.createObjectURL(value) : "" }));
    }

    const onUpdateThumb = (value: File | null, index: number) => {
        if (value) {
            const th = [...newThumb];
            if (th.length > index) {
                th[index] = value;
                setThumb(th);
            } else {
                setThumb([...newThumb, value]);
            }
            onUpdateImage_Data(value, index, null);
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

        console.log(thumbs);

    }
    //--------------------------------------------------//

    const onCancel = () => {
        //<<--back
        navigate(-1);
    }

    const onDelete = async () => {
        //<<--back
        await CollabService.deleteContent(data._id);
        navigate(-1);
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Box sx={{ p: 2 }}>
            <HName label={""} isCanDelete={data._id !== ""} onDelete={onDelete} />
            <Divider color={primary} />
            <Box id="DETAIL" className="flex-row flex-m" sx={{ pt: 2 }}>
                <Search type="fill" lable="NAME" value={data.name} onChangeHandler={onChangeNameHandler} />
                <TStatus title="ID" msg={data._id} hStyle={{ width: 10 }} msgStyle={{ width: 200 }} />
                <FormControlLabel control={<Checkbox checked={data.activate} />} label="ACTIVATE" onChange={onChangeActivate} />
            </Box>

            <TypeEvent value={data.type} onChangeEventHandler={onChangeEventHandler} />

            <Box id="PRODUCT" className="flex-row flex-m" sx={{ py: 1 }}>
                <Typography variant='h6' sx={{ pr: 4, mt: -1 }}>PRODUCT</Typography>
                <TypeIC value="sticker" disabled={false} selected={data.sticker} onClickHandler={onClickHandler} />
                <TypeIC value="mug" disabled={false} selected={data.mug} onClickHandler={onClickHandler} />
                <TypeIC value="shirt" disabled={false} selected={data.shirt} onClickHandler={onClickHandler} />
                <TypeIC value="totebag" disabled={false} selected={data.totebag} onClickHandler={onClickHandler} />
            </Box>

            <Box id="LOGO" sx={{ py: 2, display: 'flex' }}>
                <ThumbnailContainer onUpdate={onUpdateLogo} onReset={onResetLogo}
                    label='LOGO'
                    MAX_WIDTH={size.w} MAX_HEIGHT={size.h}
                    VW={100} VH={100}
                    src={data.icon} isCanRemove={logo !== null}
                />
            </Box>

            <Box id="THUMBNAIL" sx={{ py: 2 }}>
                <Typography variant='h6' sx={{ pr: 4, mt: -1 }}>THUMBNAIL</Typography>
                <ThumbAdd data={data.thumbnail} onUpdate={onUpdateThumb} />


            </Box>
            {newThumb.length > 0 || data.thumbnail.length > 0 ? (
                <Button variant="contained" color="error" onClick={onClear}
                    sx={{ width: 100 }}>
                    CLEAR
                </Button>) : <></>
            }

            <BUpdate disabled={data.name.trim().length < 1}
                onCancel={onCancel} onComfirm={onConfirm}
            />
            <Divider color={primary} />
        </Box>
    )
    //--------------------------------------------------//
    //--------------------------------------------------//
}

//--------------------------------------------------//
//--------------------------------------------------//
interface IThumbAdd {
    data: IThumbnail[];
    onUpdate: (value: File | null, index: number) => void
}

const ThumbAdd = React.forwardRef((props: IThumbAdd, ref) => {
    const refs = useRef<(ThumbnailViewRef | null)[]>([]);
    const newRef = useRef<ThumbnailViewRef>(null);
    const [data, setData] = useState<IThumbnail[]>([]);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    useEffect(() => {
        refs.current = Array.from({ length: data.length }, (_, index) => refs.current[index] || null);
    }, [data]);

    //--------------------------------------------------//    
    //--------------------------------------------------//
    return (
        <Grid container spacing={1}>
            {props.data && props.data.map((item, index) => (
                <ThumbnailView
                    ref={el => refs.current[index] = el}
                    id={index}
                    src={item?.url}
                    disabled={true}
                />
            ))}
            <ThumbnailView ref={newRef} id={props.data.length} key={props.data.length}
                VW={60} VH={60}
                caption={
                    <div className='flex-c-m' style={{ width: 60, height: 60 }}>+</div>
                }
                onUpdate={(value) => props.onUpdate(value, props.data ? props.data.length : 0)}
            //onChange={(thumb, icon, id) => onChangeThumb(thumb, icon, id)}
            />
        </Grid>
    )
});
//--------------------------------------------------//
//--------------------------------------------------//