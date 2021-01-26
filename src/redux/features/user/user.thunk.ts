import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserInfo } from '@/redux/features/user/user.model';

import API from '@/helpers/axios';

export const updateUserInfoAsyncThunk= createAsyncThunk (
    'user/update-info',
    async (
        userInfoReq: IUserInfo, thunkApi,
    ): Promise<any>  => {
        try{
            const response = await API.axios.post('/account/info', userInfoReq);
            return response.data;
        }catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const getMeAsyncThunk = createAsyncThunk (
    'user/get-me',
    async (
       _, thunkApi,
    ): Promise<any>  => {
        try{
            const response = await API.axios.get('/account/me');
            return response.data;
        }catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
