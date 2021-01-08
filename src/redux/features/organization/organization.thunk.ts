import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import axios from 'axios';

import API from '@/helpers/axios';
import { IStaff } from './organization.model';

const staffEntity = new schema.Entity('staffs');
const staffListSchema = new schema.Array(staffEntity);

export const getStaffsAsyncThunk = createAsyncThunk(
  'organization/getStaff',
  async (_, thunkApi) => {
    console.log(
      '🚀 ~ file: organization.thunk.ts ~ line 14 ~ thunkApi',
      thunkApi.signal,
    );
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      thunkApi.signal.addEventListener('abort', () => {
        console.log(
          '🚀 ~ file: organization.thunk.ts ~ line 20 ~ thunkApi.signal.addEventListener ~ abort',
        );
        source.cancel('The user canceled this action');
      });
      const response = await API.get('/users', { cancelToken: source.token });

      return normalize<
        any,
        {
          staffs: { [key: string]: IStaff };
        }
      >(response.data, staffListSchema).entities;

      // throw new Error('this is error');
    } catch (error: any) {
      console.log(
        '🚀 ~ file: organization.thunk.ts ~ line 41 ~ error',
        error.message,
      );
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
