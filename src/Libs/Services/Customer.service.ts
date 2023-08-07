import { HttpClient } from './httpClient';
import { ICustomer, IAddress } from '../Models/ICustomer.model';

import env from "./env";

export interface ICustomerService {
    getContentAll: () => Promise<ICustomer[]>;
    getContent: (id: string) => Promise<ICustomer>;
    updateContent: (id: string, customer: Partial<ICustomer>) => Promise<Boolean>;
}

class CustomerService extends HttpClient implements ICustomerService {
    [x: string]: any;
    /* constructor() {
        super();
    } */

    public async getContentAll(): Promise<ICustomer[]> {
        try {
            const url = `${env.APP_API_HOST}/customers`;
            const response = await this.get(url);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return response.data as ICustomer[];
        } catch (e) {
            throw e;
        }
    }
    public async getContent(id: string): Promise<ICustomer> {
        try {
            const url = `${env.APP_API_HOST}/customers/${id}`;
            const response = await this.get(url);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return response.data as ICustomer;
        } catch (e) {
            throw e;
        }
    }
    public async updateContent(id: string, customer: Partial<ICustomer>): Promise<Boolean> {
        try {
            const url = `${env.APP_API_HOST}/customers/${id}`;
            const response = await this.patch(url, customer);
            return response.data as Boolean
        } catch (e) {
            throw e;
        }
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    public async updateAddress(id: string, address: Partial<IAddress>): Promise<Boolean> {
        try {
            const url = `${env.APP_API_HOST}/customers/${id}/address`;
            const response = await this.post(url, address);
            return response.data as Boolean
        } catch (e) {
            throw e;
        }
    }

    public async getAddress(id: number): Promise<IAddress[]> {
        try {
            const url = `${env.APP_API_HOST}/customers/${id}/address`;
            const response = await this.get(url);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return response.data as IAddress[];
        } catch (e) {
            throw e;
        }
    }
}

const service = new CustomerService();
export default service;