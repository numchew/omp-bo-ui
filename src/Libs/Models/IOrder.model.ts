import { ICustomer, DCustomer } from './ICustomer.model';
export interface IOrder {
    id: number;
    _id: string; //or_id
    /* cm_id: string;
    cm_name: string; */
    total: number;
    date_ordered: string;
    date_updated: string;
    status: string;
    shipping: string;
    address: string;
    tracking: string;

    product: IOrderProduct[];
    customer: ICustomer;
}

export interface IOrderProduct {
    id: number;
    _id: string;  //pd_id
    name: string;
    type: string;
    category: string;
    size: string;
    color: string;
    imgchar: string;
    imgbg: string;
    quantity: number;
    price: number;
}
export const DOrder = (): IOrder => {
    return {
        id: 0,
        _id: "",
        total: 0,
        date_ordered: "",
        date_updated: "",
        status: "",
        shipping: "",
        address: "",
        tracking: "",
        product: [],
        customer: DCustomer()
    }
}

/* export const DCustomer = (): ICustomer => {
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
 */