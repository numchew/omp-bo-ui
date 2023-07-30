import { HttpClient } from './httpClient';
import { IAvatar } from '../Models/IAvatar.model';
import env from "./env";
import { AxiosRequestConfig } from "axios";

export interface IAvatarService {
    create: (avatar: Partial<IAvatar>) => Promise<IAvatar>;
    updateContent: (id: string, avatar: Partial<IAvatar>) => Promise<IAvatar>;
    getContentAllPart: (part: string) => Promise<IAvatar[]>;
    getContent: (id: string) => Promise<IAvatar>;
    deleteContent: (id: string) => Promise<Boolean>;
    uploads: (part: string, logo: File | null, thumb: (File | null)[], bg: (File | null)[], icon: (File | null)[]) => Promise<any>;
}

class AvatarService extends HttpClient implements IAvatarService {
    /* constructor() {
        super();
    } */
    public async create(avatar: Partial<IAvatar>): Promise<IAvatar> {
        try {
            const url = `${env.APP_API_HOST}/avatars`;
            const response = await this.post(url, avatar);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return response.data as IAvatar;
        } catch (e) {
            throw e;
        }
    }

    public async updateContent(id: string, avatar: Partial<IAvatar>): Promise<IAvatar> {
        try {
            const url = `${env.APP_API_HOST}/avatars/${id}`;
            const response = await this.patch(url, { ...avatar });
            if (response.status === undefined) {  //server failure
                throw new Error("ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง");
            }

            if (!response.data) {
                throw new Error("ไม่สำเร็จ ลองใหม่อีกครั้งภายหลัง");
            }
            const data: any = response.data;
            return data;
        } catch (e) {
            throw e;
        }
    }

    //หาเฉพาะส่วน
    public async getContentAllPart(part: string): Promise<IAvatar[]> {
        try {
            const url = `${env.APP_API_HOST}/avatars/part/${part}`;
            const response = await this.get(url);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return response.data as IAvatar[];
        } catch (e) {
            throw e;
        }
    }

    //หาเฉพาะชิ้น
    public async getContent(id: string): Promise<IAvatar> {
        try {
            const url = `${env.APP_API_HOST}/avatars/${id}`;
            const response = await this.get(url);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return response.data as IAvatar;
        } catch (e) {
            throw e;
        }
    }

    public async deleteContent(id: string): Promise<Boolean> {
        try {
            const url = `${env.APP_API_HOST}/avatars/${id}`;
            const response = await this.delete(url);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return Boolean(response.data);
        } catch (e) {
            throw e;
        }
    }

    //--------------------------------------------------//
    //--------------------------------------------------//
    public async uploads(part: string, logo: File | null, thumb: (File | null)[], bg: (File | null)[], icon: (File | null)[]): Promise<any> {
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
            bg.forEach((file, index) => {
                if (file !== null) {
                    formData.append(`bgs`, file);
                }
            });
            icon.forEach((file, index) => {
                if (file !== null) {
                    formData.append(`icons`, file);
                }
            });

            const options: AxiosRequestConfig = {}
            options.headers = { 'Content-Type': 'multipart/form-data' };
            const response = await this.post(`${env.APP_API_HOST}/avatars/uploads/${part}`, formData, options);
            if (!response.data) {
                throw new Error("ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่สำเร็จ ลองใหม่อีกครั้งภายหลัง");
            }
            return response.data;
        } catch (e) {
            throw new Error("ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง");
        }
    }
    //--------------------------------------------------//
    //--------------------------------------------------//
}

const service = new AvatarService();
export default service;