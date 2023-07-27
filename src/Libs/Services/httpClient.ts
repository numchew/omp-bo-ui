import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class HttpClient {
  protected _api: AxiosInstance;

  public constructor() {
    this._api = axios.create();
    this._api.interceptors.request.use(async (config: any) => {
      const jwtToken = localStorage.accessToken;
      config.headers = {
        ...config.headers,
        //"content-Type": "application/json",
        "app-version": "1.0.0",
        Authorization: "Bearer " + jwtToken,
        "Access-Control-Allow-Origin": true,
      };
      config.timeout = 30 * 1000;

      if (config.headers["Content-Type"] === "multipart/form-data") {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    });

    this._api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: any) => {
        return {
          message: error.response?.statusText,
          status: error.response?.status,
        };
      }
    );
  }

  protected get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.get(url, config);
  }

  protected post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.post(url, data, config);
  }

  protected put<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.put(url, data, config);
  }

  protected patch<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.patch(url, data, config);
  }

  protected delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._api.delete(url, config);
  }

  protected success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  protected getUrlParam<T>(req: T) {
    let urlParam = "";
    for (let key in req) {
      if (urlParam !== "") {
        urlParam += "&";
      }
      urlParam += key + "=" + req[key];
    }

    return urlParam;
  }
}
