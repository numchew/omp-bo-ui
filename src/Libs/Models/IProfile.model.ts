// Employee Profile //
export interface IProfile {
    id?: number;
    email: string;
    //password: string;
    phonenumber: string;
    fname: string;
    lname: string;
    date_created: Date;
    date_updated: Date;
    role: UserRole;
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
    A = 'allaccess',  //All access
    B = 'asset',      //Asset
    C = 'cashier',    //Cashier
}