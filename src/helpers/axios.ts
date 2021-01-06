import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

const instance: AxiosInstance = axios.create({
  // baseURL: '',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
