import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from 'normalizr';

import API from '@/helpers/axios';
import { IUserInfo } from "../user/user.model";
import { IPackage } from "./admin.model";

const userEntity = new schema.Entity('users');
const userListSchema = new schema.Array(userEntity);
const packageEntity = new schema.Entity('packages');
const packageListSchema = new schema.Array(packageEntity);

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

export const getPackagesAsyncThunk = createAsyncThunk(
  'admin/get-packages',
  async (_, thunkApi): Promise<any | ReturnType<typeof thunkApi.rejectWithValue>> => {
    try {
      const response = await API.axios.get('/admin/packages');

      const data = normalize<
        any, {
          packages: { [key: string]: IPackage }
        }
      >(response.data, packageListSchema).entities;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createPackagesAsyncThunk = createAsyncThunk(
  'admin/create-packages',
  async (packagePlan: IPackage, thunkApi): Promise<any | ReturnType<typeof thunkApi.rejectWithValue>> => {
    try {
      const response = await API.axios.post('/admin/packages', packagePlan);
      const data = normalize<
        any, {
          packages: { [key: string]: IPackage }
        }
      >(response.data, packageEntity).entities;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updatePackagesAsyncThunk = createAsyncThunk(
  'admin/updatet-packages',
  async (packagePlan: IPackage, thunkApi): Promise<any | ReturnType<typeof thunkApi.rejectWithValue>> => {
    try {
      const response = await API.axios.put(`/admin/packages/${packagePlan.id}`, packagePlan);
      const data = normalize<
      any, { [key: string]: IPackage }
      >(response.data, packageEntity).entities;
      return {package: data.packages[packagePlan.id]};
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
