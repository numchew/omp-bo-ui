export interface IAvatar {
    id: number;
    _id: string;    //av_id
    name: string;
    part: string;
    icon: string;
    color: string;
    type: string;
    date_start: string;
    date_expire: string;
    activate: boolean;
    thumbnail: IThumbnail[]
}
export interface IThumbnail {
    id: number;
    name: string;
    icon: string;
    url: string;
    color: string;
}

export const DAvatar = (): IAvatar => {
    return {
        id: 0,
        _id: "",
        name: "",
        part: "",
        icon: "",
        color: "",
        type: "normal",
        date_start: "",
        date_expire: "",
        activate: true,
        thumbnail: []
    }
}

export function DThumbnail(): IThumbnail {
    return {
        id: 0,
        name: "",
        icon: "",
        url: "",
        color: ""
    }
}
