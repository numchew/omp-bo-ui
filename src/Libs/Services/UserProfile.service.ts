import { HttpClient } from "./httpClient";
import { IProfile } from "../Models/IProfile.model";
import jwtDecode, { JwtPayload } from 'jwt-decode';

import env from "./env";

export interface IUserProfileService {
  create: (profile: IProfile, password: string) => Promise<IProfile>;
  login: (username: string, password: string) => Promise<IProfile>;
  logout: () => void;
  isUserLogin: () => boolean;
  getUserName: () => string | null;
  getAccessToken: () => string | null;
  forgotPassword: (email: string) => Promise<string>
  findAll(): Promise<IProfile[]>;
  findOne(email: string): Promise<IProfile>
}

class UserProfile extends HttpClient implements IUserProfileService {
  /* constructor() {
    super();
  } */

  public async create(profile: IProfile, password: string): Promise<IProfile> {
    try {
      const url = `${env.APP_API_HOST}/auth/employee/register`;
      const { date_created, date_updated, id, ...user } = { ...profile, password: password }

      const response = await this.post(url, { ...user, password: password });

      console.log({ ...profile, password: password });

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

  public async login(username: string, password: string): Promise<IProfile> {
    try {
      const url = `${env.APP_API_HOST}/auth/employee/login`;
      const response = await this.post(url, {
        username: username,
        password: password,
      });

      if (response.status === undefined) {  //server failure
        throw new Error("ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง");
      }

      if (!response.data) {
        throw new Error("บัญชีหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
      }

      const data: any = response.data;
      if (data.status === "error") {
        throw new Error("ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("id", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("phonenumber", data.phonenumber);
      localStorage.setItem("fname", data.fname);
      localStorage.setItem("lname", data.lname);
      localStorage.setItem("roles", data.roles);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public logout(): void {
    console.log("logout");
    localStorage.setItem("accessToken", "");
    localStorage.clear();
  }

  public isUserLogin() {
    if (localStorage.accessToken && localStorage.accessToken !== "") {
      const decodedToken = jwtDecode<JwtPayload>(localStorage.accessToken);
      var expirationTime = decodedToken.exp as number * 1000;
      const isTokenExpired = Date.now() > expirationTime;
      if (isTokenExpired) {
        localStorage.accessToken = "";
      };
    }
    return localStorage.accessToken === null ? "" : localStorage.accessToken;
  }

  public getUserName(): string | null {
    return this.isUserLogin() ? localStorage.email : null;
  }

  public getAccessToken(): string | null {
    return localStorage.accessToken;
  }

  public async forgotPassword(email: string): Promise<string> {
    const url = `${env.APP_API_HOST}/auth/employee/forgot-password`;
    const response = await this.post(url, { username: email });

    if (!response.status) {
      throw new Error("ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง");
    }
    if (response.status >= 400) {
      //403, 404
      throw new Error("ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
    return "สำเร็จ กรุณาตรวจสอบอีเมล";
  }

  public async updatePassword(email: string, password: string): Promise<string> {
    try {
      const url = `${env.APP_API_HOST}/auth/employee/reset-password`;
      const response = await this.post(url, {
        username: email,
        newPassword: password,
      });

      if (!response.data) {   //server failure
        throw new Error("ไม่สำเร็จ กรุณารอสักครู่ และลองใหม่อีกครั้งภายหลัง");
      }
      const data = response.data as any;
      if (data.status >= 400) {
        //403, 404
        throw new Error("ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      }
      return "สำเร็จ";
    } catch (e) {
      throw e;
    }
  }

  public async updateData(_id: string, profile: IProfile): Promise<IProfile> {
    try {
      const url = `${env.APP_API_HOST}/employees/${_id}`;
      const response = await this.patch(url, profile);

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

  public async findAll(): Promise<IProfile[]> {
    try {
      const url = `${env.APP_API_HOST}/employees/roles`;
      const response = await this.get(url);
      if (!response.data) {
        throw new Error("ไม่พบข้อมูล");
      }
      const data: any = response.data;
      if (data.status === "error") {
        throw new Error("ไม่พบข้อมูล");
      }
      return data as IProfile[];
    } catch (e) {
      throw e;
    }
  }
  public async findOne(email: string): Promise<IProfile> {
    try {
      const url = `${env.APP_API_HOST}/employees/${email}`;
      const response = await this.get(url);
      if (!response.data) {
        throw new Error("ไม่พบข้อมูล");
      }
      const data: any = response.data;
      if (data.status === "error") {
        throw new Error("ไม่พบข้อมูล");
      }
      return data as IProfile;
    } catch (e) {
      throw e;
    }
  }
  public async deleteOne(_id: string): Promise<void> {
    try {
      const url = `${env.APP_API_HOST}/employees/${_id}`;
      const response = await this.delete(url);
      if (!response.data) {
        throw new Error("ไม่พบข้อมูล");
      }
      const data: any = response.data;
      if (data.status === "error") {
        throw new Error("ไม่พบข้อมูล");
      }
    } catch (e) {
      throw e;
    }
  }
}

const service = new UserProfile();
export default service;
