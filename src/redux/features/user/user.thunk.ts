import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserInfo } from '@/redux/features/user/user.model';

import API from '@/helpers/axios';

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
      return await new Promise((resolve, reject) => {
        FB.api(
          '/me/picture',
          'GET',
          { "height": "200", "witdh": "200", "redirect": "false" },
          function (response) {
            resolve(response?.data?.url);
          }
        );
      })
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
