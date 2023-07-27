export interface IProduct {
    id: number;
    _id: string;  //pd_id
    name: string;
    type: string;   //sticker, totebag, shirt, mug
    size: string;
    color: string;
    quantity: number;
    price: number;
    activate: boolean;
}

export const DProduct = (): IProduct => {
    return {
        id: 0,
        _id: "",
        name: "",
        type: "",
        size: "",
        color: "",
        quantity: 0,
        price: 0,
        activate: true
    }
}