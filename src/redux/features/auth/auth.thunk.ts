import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '@/helpers/axios';
import { IAuthAccountRequest, IAuthFBAccountRequest } from './auth.model';
import { setUserName } from '../user/user.slice';
import { resetAuth } from './auth.slice';
import { resetCampaign } from '../campaign';
import { resetFanpage } from '../fanpage/fanpage.slice';
import { getFbProfileAsyncThunk, getMeAsyncThunk } from '../user/user.thunk';

export const authFbUserAsyncThunk = createAsyncThunk(
  'auth/login-fb',
  async (
    authReq: IAuthFBAccountRequest,
    thunkApi,
  ): Promise<
    | { jwtToken: string; user: any }
    | ReturnType<typeof thunkApi.rejectWithValue>
  > => {
    try {
      const response = await API.axios.post('/auth/login/facebook', authReq, {
        // withCredentials: true,
      });

      thunkApi.dispatch(getMeAsyncThunk(response.data.accessToken));
      thunkApi.dispatch(getFbProfileAsyncThunk());

      return {
        jwtToken: response.data.accessToken,
        user: response.data.user,
      };

    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const authUserAsyncThunk = createAsyncThunk(
  'auth/authenticate',
  async (
    authReq: IAuthAccountRequest,
    thunkApi,
  ): Promise<
    | { jwtToken: string; user: any }
    | ReturnType<typeof thunkApi.rejectWithValue>
  > => {
    try {
      const response = await API.axios.post('/auth/login', authReq, {
        // withCredentials: true,
      });

      return {
        jwtToken: response.data.accessToken,
        user: response.data.user,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const refreshTokenAsyncThunk = createAsyncThunk(
  'auth/refresh-token',
  async (_, thunkApi): Promise<
    | { jwtToken: string; user: any }
    | ReturnType<typeof thunkApi.rejectWithValue>
  > => {
    try {
      const response = await API.axios.post(
        '/auth/refresh-token',
        {},
      );

      thunkApi.dispatch(getMeAsyncThunk(response.data.accessToken));
      if(response.data.user.roleId === 1) {
        thunkApi.dispatch(getFbProfileAsyncThunk());
      }
      
      return {
        jwtToken: response.data.accessToken,
        user: response.data.user,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const logoutAsyncThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const response = await API.axios.post(
        '/auth/logout',
        {},
      );
      thunkApi.dispatch(
        resetCampaign()
      );
      thunkApi.dispatch(
        resetFanpage()
      );
      // @ts-ignore
      window?.FB?.logout();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
