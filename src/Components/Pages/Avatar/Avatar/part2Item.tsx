import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PartDefault } from './partDefault';

interface IDefault {
    onReset?: (index: number) => void;
    onResetBG?: (index: number) => void;
    onUpdate?: (value: File | null, index: number) => void;
    onUpdateBG?: (value: File | null, index: number) => void;

    src: string;
    bg: string;
    part: string;

    id?: number;
    MAX_WIDTH?: number;
    MAX_HEIGHT?: number;
    VW?: number;    //view image(height)
    VH?: number;    //view image(width)
    label?: string;
    caption?: React.ReactNode;
    disabled?: boolean;
    isCanRemove?: boolean;
    onChange?: (value: File | null, icon: File | null, id: number) => void;
}


export const Part2Item = (props: IDefault) => {
    //const size = getSize(props.part);
    //const [isUpdated, setIsUpdate] = useState(false);

    //--------------------------------------------------//
    //--------------------------------------------------//
    const onUpdate1 = (value: File | null) => {
        props.onUpdate && props.onUpdate(value, 0)
    }
    const onReset1 = (index: number = 0) => {
        props.onReset && props.onReset(0);
    }

    const onUpdate2 = (value: File | null) => {
        props.onUpdateBG && props.onUpdateBG(value, 0)
    }
    const onReset2 = (index: number = 1) => {
        props.onResetBG && props.onResetBG(0);

    }
    //--------------------------------------------------//
    //--------------------------------------------------//
    return (
        <Box sx={{ py: 2 }}>
            <Typography variant="h6" >GRAPHIC</Typography>
            <div className='flex-row'>
                <Box id="FRONT" className="flex-row">
                    <PartDefault
                        src={props.src}
                        part={props.part}
                        onReset={onReset1}
                        onUpdate={onUpdate1}
                        VW={200} VH={200}
                        label='-- Front --' />

                </Box>
                <Box id="BACK" sx={{ px: 2 }}>
                    <PartDefault
                        src={props.bg}
                        part={props.part}
                        onReset={onReset2}
                        onUpdate={onUpdate2}
                        VW={200} VH={200}
                        label='-- Back --' />
                </Box>
            </div>
        </Box>
    )
}
//--------------------------------------------------//
//--------------------------------------------------//