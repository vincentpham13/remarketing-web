import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '@/helpers/axios';
import { IAuthAccountRequest, IAuthFBAccountRequest } from './auth.model';
import { setUserName } from '../user/user.slice';

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
        setUserName({
          name: `logouted`,
          age: 0,
        }),
      );
      // @ts-ignore
      window?.FB?.logout();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
