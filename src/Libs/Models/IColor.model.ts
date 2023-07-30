export interface IColor {
    id: number;
    _id: string;    //cl_id
    name: string;
    type: string;
    url: string;
    activate: boolean;
}

export const DColor = (): IColor => {
    return {
        id: 0,
        _id: "",
        name: "",
        type: "normal",
        url: "",
        activate: true
    }
}

export function CompareColors(a: IColor, b: IColor): boolean {
    if (
        a.id !== b.id ||
        a._id !== b._id ||
        a.name !== b.name ||
        a.type !== b.type ||
        a.url !== b.url ||
        a.activate !== b.activate
    ) {
        return false;
    }

    return true;
}