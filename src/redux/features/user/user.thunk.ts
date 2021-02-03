import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserInfo } from '@/redux/features/user/user.model';
// @ts-ignore
import * as Facebook from 'fb-sdk-wrapper';

import API from '@/helpers/axios';
import { IOrder } from '../admin/admin.model';

export const updateUserInfoAsyncThunk = createAsyncThunk(
  'user/update-info',
  async (
    userInfoReq: IUserInfo, thunkApi,
  ): Promise<any> => {
    try {
      const response = await API.axios.post('/account/info', userInfoReq);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getFbProfileAsyncThunk = createAsyncThunk(
  'user/get-fb-profile',
  async (
    _, thunkApi,
  ): Promise<any> => {
    try {
      return await new Promise(async (resolve, reject) => {
        const loginStatus = await Facebook.getLoginStatus();
          if (loginStatus && loginStatus?.authResponse) {
            const { authResponse: { accessToken } } = loginStatus;
            const response = await Facebook.api(
              `/me/picture?access_token=${accessToken}`,
              'GET',
              { "height": "400", "witdh": "400", "redirect": "false" },
            );
            if(response) {
              resolve(response.data.url)
            }
            resolve('')
          }
        });
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMeAsyncThunk = createAsyncThunk(
  'user/get-me',
  async (
    accessToken: string, thunkApi,
  ): Promise<any> => {
    try {
      API.setAccessToken(accessToken);
      const response = await API.axios.get('/account/me');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMeDashboardAsyncThunk = createAsyncThunk(
  'user/dashboard-info',
  async (
    _, thunkApi,
  ): Promise<any> => {
    try {
      const response = await API.axios.get('/account/dashboard-info');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createOrderThunk = createAsyncThunk(
  'order/create-order',
  async (data: {order: IOrder, packageIds: number[]}, thunkApi): Promise<any> => {
    try {
      const response = await API.axios.post('/orders', {
        packageIds: data.packageIds,
        fullName: data.order.fullName,
        email: data.order.email,
        phone: data.order.phone,
        address: data.order.address,
        businessName: data.order.businessName,
        businessAddress: data.order.businessAddress,
        emailReceipt: data.order.emailReceipt,
        taxId: data.order.taxId,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)
