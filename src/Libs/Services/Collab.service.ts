import { HttpClient } from './httpClient';
import { ICollab } from '../Models/ICollab.model';
import env from "./env";
import { AxiosRequestConfig } from "axios";

export interface ICollabService {
    create: (collab: Partial<ICollab>, thumb: File | null) => Promise<ICollab>;
    updateContent: (id: string, collab: Partial<ICollab>, thumb: File | null) => Promise<Boolean>;
    getContentAll: () => Promise<ICollab[]>;
    getContent: (id: string) => Promise<ICollab>;
    deleteContent: (id: string) => Promise<Boolean>;
}

class CollabService extends HttpClient implements ICollabService {
    constructor() {
        super();
    }
    public async create(collab: Partial<ICollab>) {
        try {
            const url = `${env.APP_API_HOST}/collabs`;
            const response = await this.post(url, collab);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return response.data as ICollab;
        } catch (e) {
            throw e;
        }
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    public async upload(thumb: File) {
        try {
            var formData = new FormData();
            formData.append('file', thumb);
            const options: AxiosRequestConfig = {}
            options.headers = { 'Content-Type': 'multipart/form-data' }
            const response = await this.post(`${env.APP_API_HOST}/collabs/upload`, formData, options);
            if (!response.data) {
                throw "ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่สำเร็จ ลองใหม่อีกครั้งภายหลัง";
            }
            return response.data as string;
        } catch (e) {
            throw "ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง";
        }
    }

    public async uploads(logo: File | null, thumb: (File | null)[], icon: (File | null)[]) {
        try {
            var formData = new FormData();
            if (logo !== null) {
                formData.append(`logo`, logo);
            }
            thumb.forEach((file, index) => {
                if (file !== null) {
                    formData.append(`files`, file);
                }
            });
            icon.forEach((file, index) => {
                if (file !== null) {
                    formData.append(`icons`, file);
                }
            });

            const options: AxiosRequestConfig = {}
            options.headers = { 'Content-Type': 'multipart/form-data' }
            const response = await this.post(`${env.APP_API_HOST}/collabs/uploads`, formData, options);
            if (!response.data) {
                throw "ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่สำเร็จ ลองใหม่อีกครั้งภายหลัง";
            }
            return response.data;
        } catch (e) {
            throw "ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง";
        }
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    public async updateContent(id: string, collab: Partial<ICollab>, thumb: File | null) {
        try {
            const url = `${env.APP_API_HOST}/collabs/id`;
            const response = await this.patch(url, { ...collab, file: thumb });
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
    }

    public async getContentAll(): Promise<ICollab[]> {
        try {
            const url = `${env.APP_API_HOST}/collabs`;
            const response = await this.get(url);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return response.data as ICollab[];
        } catch (e) {
            throw e;
        }
    }

    public async getContent(id: string) {
        try {
            const url = `${env.APP_API_HOST}/collabs/${id}`;
            const response = await this.get(url);
            if (!response.data) {
                throw "ไม่พบข้อมูล";
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw "ไม่พบข้อมูล";
            }
            return response.data as ICollab;
        } catch (e) {
            throw e;
        }
    }

    public async deleteContent(id: string): Promise<Boolean> {
        try {
            const url = `${env.APP_API_HOST}/collabs/${id}`;
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

export default new CollabService();