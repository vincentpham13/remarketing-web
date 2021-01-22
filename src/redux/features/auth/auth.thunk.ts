import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import API from '@/helpers/axios';
import { IAuthRequest } from './auth.model';
import { setUserName } from '../user/user.slice';

export const authUserAsyncThunk = createAsyncThunk(
  'auth/authenticate',
  async (
    authReq: IAuthRequest,
    thunkApi,
  ): Promise<
    | { jwtToken: string; role: string; firstName: string; lastName: string }
    | ReturnType<typeof thunkApi.rejectWithValue>
  > => {
    try {
      const response = await API.axios.post('/auth/login', authReq, {
        // withCredentials: true,
      });

      thunkApi.dispatch(
        setUserName({
          name: `Nhat`,
          age: 26,
        }),
      );

      return {
        jwtToken: response.data.accessToken,
        role: 'role',
        firstName: 'firstName',
        lastName: 'lastName',
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const refreshTokenAsyncThunk = createAsyncThunk(
  'auth/refresh-token',
  async (_, thunkApi) => {
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      thunkApi.signal.addEventListener('abort', () => {
        source.cancel();
      });

      const response = await API.axios.post(
        '/auth/refresh-token',
        {},
        {
          transformRequest: (_data, headers) => {
            // refresh-token api does not need Authorization in header
            // delete headers.common.Authorization;
          },
          // withCredentials: true,
          cancelToken: source.token,
        },
      );

      thunkApi.dispatch(
        setUserName({
          name: `namemm`,
          age: 26,
        }),
      );

      const data: {
        jwtToken: string;
        role: string;
        firstName: string;
        lastName: string;
      } = {
        jwtToken: response.data.accessToken,
        role: 'role',
        firstName: 'firstName',
        lastName: 'lastName',
      };

      return data;
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
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
