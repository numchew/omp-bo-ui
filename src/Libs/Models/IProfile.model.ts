// Employee Profile //
export interface IProfile {
    id?: number;
    _id: string;
    email: string;
    //password: string;
    phonenumber: string;
    fname: string;
    lname: string;
    username: string;
    date_created: string;
    date_updated: string;
    roles: string;
}

export const DProfile = (): IProfile => {
    return {
        id: 0,
        _id: "",
        email: "",
        phonenumber: "",
        fname: "",
        lname: "",
        username: "",
        date_created: "",
        date_updated: "",
        roles: "cashier"
    };
}

export enum UserRole {
    /*  OWNER = 'owner',
     MANAGER = 'manager',
     DEVELOPER = 'developer',
     SALES = 'sales',
     ADMIN = 'admin',
     ACCOUNTANT = 'accountant',
     USER = 'user', */
    S = 'developer',  //Developer
    A = 'all access',  //All access
    B = 'asset',      //Asset
    C = 'cashier',    //Cashier
}