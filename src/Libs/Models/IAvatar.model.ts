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
    bg: string;
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
        bg: "",
        color: ""
    }
}


export function CompareAvatars(a: IAvatar, b: IAvatar): boolean {
    // Compare the simple properties of IAvatar
    if (
        a.id !== b.id ||
        a._id !== b._id ||
        a.name !== b.name ||
        a.part !== b.part ||
        a.icon !== b.icon ||
        a.color !== b.color ||
        a.type !== b.type ||
        a.date_start !== b.date_start ||
        a.date_expire !== b.date_expire ||
        a.activate !== b.activate
    ) {
        return false;
    }

    // Compare the thumbnail arrays
    if (a.thumbnail.length !== b.thumbnail.length) {
        return false;
    }

    for (let i = 0; i < a.thumbnail.length; i++) {
        const thumbnailA: IThumbnail = a.thumbnail[i];
        const thumbnailB: IThumbnail = b.thumbnail[i];

        if (
            thumbnailA.id !== thumbnailB.id ||
            thumbnailA.name !== thumbnailB.name ||
            thumbnailA.icon !== thumbnailB.icon ||
            thumbnailA.url !== thumbnailB.url ||
            thumbnailA.bg !== thumbnailB.bg ||
            thumbnailA.color !== thumbnailB.color
        ) {
            return false;
        }
    }

    return true;
}