import { HttpClient } from './httpClient';
import { IOrder } from '../Models/IOrder.model';

import env from "./env";

export interface IOrderService {
    getContentAll: () => Promise<IOrder[]>;
    getContent: (id: string) => Promise<IOrder>;
    updateContent: (id: string, order: Partial<IOrder>) => Promise<IOrder>;
}

class OrderService extends HttpClient implements IOrderService {
    [x: string]: any;
    /* constructor() {
        super();
    }
 */
    public async getContentAll(): Promise<IOrder[]> {
        try {
            const url = `${env.APP_API_HOST}/orders`;
            const response = await this.get(url);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return response.data as IOrder[];
        } catch (e) {
            throw e;
        }
    }
    public async getContent(id: string): Promise<IOrder> {
        try {
            const url = `${env.APP_API_HOST}/orders/${id}`;
            const response = await this.get(url);
            if (!response.data) {
                throw new Error("ไม่พบข้อมูล");
            }
            const data: any = response.data;
            if (data.status === "error") {
                throw new Error("ไม่พบข้อมูล");
            }
            return response.data as IOrder;
        } catch (e) {
            throw e;
        }
    }
    public async updateContent(id: string, order: Partial<IOrder>): Promise<IOrder> {
        try {
            const url = `${env.APP_API_HOST}/orders/${id}`;
            const response = await this.patch(url, order);
            return response.data as IOrder
        } catch (e) {
            throw e;
        }
    }
}

const service = new OrderService();
export default service;