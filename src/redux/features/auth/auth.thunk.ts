import { createAsyncThunk } from '@reduxjs/toolkit';

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
      const response = await API.post('/users/authenticate', authReq, {
        withCredentials: true,
      });

      thunkApi.dispatch(
        setUserName({
          name: `${response.data.firstName} ${response.data.lastName} `,
          age: 26,
        }),
      );

      return {
        jwtToken: response.data.jwtToken,
        role: response.data.role,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
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
      const response = await API.post(
        '/users/refresh-token',
        {},
        {
          transformRequest: (_data, headers) => {
            // refresh-token api does not need Authorization in header
            delete headers.common.Authorization;
          },
          withCredentials: true,
        },
      );

      thunkApi.dispatch(
        setUserName({
          name: `${response.data.firstName} ${response.data.lastName} `,
          age: 26,
        }),
      );

      const data: {
        jwtToken: string;
        role: string;
        firstName: string;
        lastName: string;
      } = {
        jwtToken: response.data.jwtToken,
        role: response.data.role,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      };

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
