import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { IPackage } from "../admin/admin.model";
import API from '@/helpers/axios';

const packageEntity = new schema.Entity('packages');
const packageListSchema = new schema.Array(packageEntity);

export const getPackagesAsyncThunk = createAsyncThunk(
  'admin/get-packages',
  async (_, thunkApi): Promise<any | ReturnType<typeof thunkApi.rejectWithValue>> => {
    try {
      const response = await API.axios.get('/packages');

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
