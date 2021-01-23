import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from 'normalizr';

import API from '@/helpers/axios';
import { IFanPage } from "./fanpage.model";

const fanpageEntity = new schema.Entity('fanpages');
const fanpageListSchema = new schema.Array(fanpageEntity);

export const getFanpagesAsyncThunk = createAsyncThunk(
  'fanpage/get-fanpage',
  async (
    _, thunkApi,
  ): Promise<any | ReturnType<typeof thunkApi.rejectWithValue>> => {
    try {
      const response = await API.axios.get('/fanpages');

      const data = normalize<
        any,
        {
          fanpages: { [key: string]: IFanPage }
        }
      >(response.data, fanpageListSchema).entities
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
