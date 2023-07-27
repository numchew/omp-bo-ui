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