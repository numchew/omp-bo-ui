import { IThumbnail } from './IAvatar.model';

export interface ICollab {
    id: number;
    _id: string;    //cl_id
    name: string;
    type: string;
    icon: string;
    /* date_start: string;
    date_expire: string; */
    sticker: boolean;
    mug: boolean;
    shirt: boolean;
    totebag: boolean;
    activate: boolean;
    thumbnail: IThumbnail[];
}

/* export interface ICollab_Thumbnail {
    id: number;
    name: string;
    icon: string;
    url: string;
    color: string;
}
 */
export const DCollab = (): ICollab => {
    return {
        id: 0,
        _id: "",
        name: "",
        type: "normal",
        icon: "",
        sticker: true,
        mug: true,
        shirt: true,
        totebag: true,
        activate: true,
        thumbnail: []
    }
}

/* export const DCollab_Thumbnail = (): Partial<ICollab_Thumbnail> => {
    return {
        id: 0,
        name: "",
        icon: "",
        url: "",
        color: "",
    }
} */