import { HttpClient } from './httpClient';
import { IColor } from '../Models/IColor.model';
import env from "./env";
import { AxiosRequestConfig } from "axios";

export interface IColorService {
    create: (color: Partial<IColor>, thumb: File | null) => Promise<IColor>;
    //updateContent: (id: string, color: Partial<IColor>, thumb: File | null) => Promise<Boolean>;
    getContentAll: () => Promise<IColor[]>;
    getContent: (id: string) => Promise<IColor>;
    deleteContent: (id: string) => Promise<Boolean>;
}

class ColorService extends HttpClient implements IColorService {
    constructor() {
        super();
    }
    public async create(color: Partial<IColor>, thumb: File | null) {
        try {
            const formData = new FormData();
            Object.entries(color).forEach(([key, value]) => {
                formData.append(key, String(value));
            });
            if (thumb) {
                formData.append('file', thumb);
            }

            const options: AxiosRequestConfig = {}
            options.headers = { 'Content-Type': 'multipart/form-data' }
            const response = await this.post(`${env.APP_API_HOST}/colors`, formData, options);

            if (!response.data) {
                throw "ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่สำเร็จ ลองใหม่อีกครั้งภายหลัง";
            }
            return response.data as IColor;
        } catch (e) {
            throw "ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง";
        }
    }

    /* public async updateContent(id: string, color: Partial<IColor>, thumb: File | null) {
        try {
            const url = `${env.APP_API_HOST}/colors/id`;
            const response = await this.patch(url, { ...color, file: thumb });
            if (response.status === undefined) {  //server failure
                throw "ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง";
            }

            if (!response.data) {
                throw "ไม่สำเร็จ ลองใหม่อีกครั้งภายหลัง";
            }
            const data: any = response.data;
            return data;
        } catch (e) {
            throw e;
        }
    } */

    public async getContentAll(): Promise<IColor[]> {
        try {
            const url = `${env.APP_API_HOST}/colors`;
            const response = await this.get(url);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return response.data as IColor[];
        } catch (e) {
            throw e;
        }
    }

    public async getContent(id: string) {
        try {
            const url = `${env.APP_API_HOST}/colors/${id}`;
            const response = await this.get(url);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return response.data as IColor;
        } catch (e) {
            throw e;
        }
    }

    public async deleteContent(id: string): Promise<Boolean> {
        try {
            const url = `${env.APP_API_HOST}/colors/${id}`;
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

export default new ColorService();