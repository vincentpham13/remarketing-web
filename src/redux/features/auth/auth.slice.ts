import { IGenericEntityState } from '@/redux/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';

import API from '@/helpers/axios';
import { IAuthState } from './auth.model';
import { authUserAsyncThunk, refreshTokenAsyncThunk } from './auth.thunk';

const initialState: IAuthState & IGenericEntityState = {
  token: null,
  isAuthenticated: false,
  expires: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    // authentication
    builder.addCase(authUserAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(authUserAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.jwtToken) {
        state.token = action.payload.jwtToken;
        state.isAuthenticated = true;
        state.status = 'succeeded';

        API.interceptors.request.use((req: AxiosRequestConfig) => {
          req.headers.Authorization = `Bearer ${action.payload.jwtToken}`;
          return req;
        });
      } else {
        state.status = 'failed';
      }
    });
    builder.addCase(authUserAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
    // refresh token
    builder.addCase(refreshTokenAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(refreshTokenAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.jwtToken) {
        state.token = action.payload.jwtToken;
        state.isAuthenticated = true;
        state.status = 'succeeded';

        API.interceptors.request.use((req: AxiosRequestConfig) => {
          req.headers.Authorization = `Bearer ${action.payload.jwtToken}`;
          return req;
        });
      } else {
        state.status = 'failed';
      }
    });
    builder.addCase(refreshTokenAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

/* Export actions */
export const { resetAuth } = authSlice.actions;

/* Export selectors */
export const authSelector = (state: any): typeof initialState => state.auth;

/* Export reducer */
export default authSlice.reducer;
