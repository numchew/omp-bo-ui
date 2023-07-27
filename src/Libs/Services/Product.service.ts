import { HttpClient } from './httpClient';

import env from "./env";
import { IProduct } from '../Models/IProduct.model';

export interface IProductService {
    create: (product: Partial<IProduct>) => Promise<IProduct>;
    getContentAll: () => Promise<IProduct[]>;
    getContent: (id: string) => Promise<IProduct>;
    updateContent: (id: string, product: Partial<IProduct>) => Promise<Boolean>;
    deleteContent: (id: string) => Promise<Boolean>;
}

class ProductService extends HttpClient implements IProductService {
    [x: string]: any;
    constructor() {
        super();
    }
    public async create(color: Partial<IProduct>) {
        try {
            const url = `${env.APP_API_HOST}/products`;
            const response = await this.post(url, color);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return response.data as IProduct;
        } catch (e) {
            throw e;
        }
    }

    public async getContentAll(): Promise<IProduct[]> {
        try {
            const url = `${env.APP_API_HOST}/products`;
            const response = await this.get(url);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return response.data as IProduct[];
        } catch (e) {
            throw e;
        }
    }
    public async getContent(id: string): Promise<IProduct> {
        try {
            const url = `${env.APP_API_HOST}/products/${id}`;
            const response = await this.get(url);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return response.data as IProduct;
        } catch (e) {
            throw e;
        }
    }
    public async updateContent(id: string, product: Partial<IProduct>): Promise<Boolean> {
        try {
            const url = `${env.APP_API_HOST}/products/${id}`;
            const response = await this.patch(url, product);
            return response.data as Boolean
        } catch (e) {
            throw e;
        }
    }

    public async deleteContent(id: string): Promise<Boolean> {
        try {
            const url = `${env.APP_API_HOST}/products/${id}`;
            const response = await this.delete(url);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return Boolean(response.data);
        } catch (e) {
            throw e;
        }
    }
}


export default new ProductService();