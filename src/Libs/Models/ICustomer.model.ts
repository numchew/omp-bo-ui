import { IOrder } from './IOrder.model';
export interface ICustomer {
    id: number;
    _id: string;    //cm_id
    email: string;
    username: string;
    fname: string;
    lname: string;
    phonenumber: string;
    date_created: string;
    date_updated: string;
    address: IAddress[];
    avatars: IAvatar[];
    orders: IOrder[];
}

export interface IAddress {
    id: number;
    _id: number;    //index
    name: string;
    phonenumber: string;
    address: string;
    postcode: number;
}

export interface IAvatar {
    id: number;
    _id: number;    //index
    url: string;
    url_bg: string;
    face: IFace;
    clothing: IClothing;
    accessories: IAccessories;
    background: IBackground;
}

export interface IFace {
    id: number;
    skin: string;    //id skin
    eye: string;
    nose: string;
    mouth: string;
    hair: string;
    cheek: string;
}

export interface IClothing {
    id: number;
    shirt: string;
    pants: string;
    dress: string;
    sock: string;
    shoe: string;
    bag: string;
}

export interface IAccessories {
    id: number;
    headband: string;
    earring: string;
    necklace: string;
    bracelet: string;
    handbag: string;
}

export interface IBackground {
    id: number;
    bg: string;
    fg: string;
}

export const DCustomer = (): ICustomer => {
    return {
        id: 0,
        _id: "",    //cm_id
        email: "",
        username: "",
        fname: "",
        lname: "",
        phonenumber: "",
        date_created: "",
        date_updated: "",
        address: [],
        avatars: [],
        orders: []
    }
}
