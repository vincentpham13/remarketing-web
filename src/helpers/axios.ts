import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
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

export default instance;
