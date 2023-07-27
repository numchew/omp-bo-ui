import React, { useState } from 'react'
import { ThumbnailContainer } from '../../../Common/Thumbnail';

interface IProps {
    MAX_WIDTH: number;
    MAX_HEIGHT: number;
    VW: number;
    VH: number;
    src: string;
    onUpdate?: (value: File | null) => void;
}

export function thumbOne(props: IProps) {
    const [logo, setLogo] = useState<File | null>(null);

    //--------------------------------------------------//  
    const onUpdateLogo = (value: File | null) => {
        setLogo(value);
        props.onUpdate?.(value);
    }

    const onResetLogo = (index: number = 0) => {
        setLogo(null);
        props.onUpdate?.(null);
    }

    //--------------------------------------------------//  
    return (
        <ThumbnailContainer onUpdate={onUpdateLogo} onReset={onResetLogo}
            MAX_WIDTH={props.MAX_WIDTH} MAX_HEIGHT={props.MAX_HEIGHT}
            VW={props.VW} VH={props.VH}
            src={props.src} isCanRemove={logo !== null}
        />
    )
}

//--------------------------------------------------//
//--------------------------------------------------//  