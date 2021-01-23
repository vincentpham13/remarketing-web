import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';

class API {
  private static _instance: API;
  private _axios: AxiosInstance;

  constructor() {
    const instance: AxiosInstance = Axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
      timeout: 6000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use((req: AxiosRequestConfig) => req);

    instance.interceptors.response.use((res: AxiosResponse) => {
      if (
        res.data &&
        res.headers['content-type'].split(';').includes('application/json')
      ) {
        res.data = camelizeKeys(res.data);
      }

      return res;
    });

    this._axios = instance;
  }

  static create(): API {
    if (!API._instance) {
      API._instance = new API();
    }

    return API._instance;
  }

  reset(): void {
    API._instance = new API();
  }

  get axios(): AxiosInstance {
    return this._axios;
  }
}


export default API.create();
