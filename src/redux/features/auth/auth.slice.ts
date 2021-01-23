import { IGenericEntityState } from '@/redux/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';
import { REHYDRATE } from 'redux-persist';

import API from '@/helpers/axios';
import { IAuthState } from './auth.model';
import { authFbUserAsyncThunk, authUserAsyncThunk, logoutAsyncThunk, refreshTokenAsyncThunk } from './auth.thunk';

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
    builder.addCase(REHYDRATE, (state, action) => {
      // @ts-ignore
      const localToken = action?.payload?.auth?.token;
      state.status = 'idle';
      if (localToken) {
        API.axios.interceptors.request.use((req: AxiosRequestConfig) => {
          req.headers.Authorization = `Bearer ${localToken}`;
          console.log('done');
          return req;
        });
      }
    });
    // authentication
    builder.addCase(authUserAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(authUserAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.jwtToken) {
        state.token = action.payload.jwtToken;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.user = action.payload.user;
        API.axios.interceptors.request.use((req: AxiosRequestConfig) => {
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
    // FB authenticate
    builder.addCase(authFbUserAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(authFbUserAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.jwtToken) {
        state.token = action.payload.jwtToken;
        state.isAuthenticated = true;
        state.status = 'succeeded';

        state.user = action.payload.user;

        API.axios.interceptors.request.use((req: AxiosRequestConfig) => {
          req.headers.Authorization = `Bearer ${action.payload.jwtToken}`;
          return req;
        });
      } else {
        state.status = 'failed';
      }
    });
    builder.addCase(authFbUserAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
    // Refresh token
    builder.addCase(refreshTokenAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(refreshTokenAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.jwtToken) {
        state.token = action.payload.jwtToken;
        state.isAuthenticated = true;
        state.status = 'succeeded';

        state.user = action.payload.user;

        API.axios.interceptors.request.use((req: AxiosRequestConfig) => {
          req.headers.Authorization = `Bearer ${action.payload.jwtToken}`;
          return req;
        });
      } else {
        state.status = 'failed';
      }
    });
    builder.addCase(refreshTokenAsyncThunk.rejected, (state) => {
      state.status = 'failed';
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('persist:root');
      API.reset();
    });
    // Logout
    builder.addCase(logoutAsyncThunk.rejected, (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('persist:root');
      API.reset();
    });
    builder.addCase(logoutAsyncThunk.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('persist:root');
      API.reset();
    });
  },
});

/* Export actions */
export const { resetAuth } = authSlice.actions;

/* Export selectors */
export const authSelector = (state: any): typeof initialState => state.auth;

/* Export reducer */
export default authSlice.reducer;
