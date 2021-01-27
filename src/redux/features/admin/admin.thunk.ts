import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from 'normalizr';

import API from '@/helpers/axios';
import { IUserInfo } from "../user/user.model";

const userEntity = new schema.Entity('users');
const userListSchema = new schema.Array(userEntity);

export const getUsersAsyncThunk = createAsyncThunk(
  'admin/get-users',
  async (_, thunkApi): Promise<any | ReturnType<typeof thunkApi.rejectWithValue>> => {
    try {
      const response = await API.axios.get('/admin/users');

      const data = normalize<
        any, {
          users: { [key: string]: IUserInfo }
        }
      >(response.data, userListSchema).entities;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
