import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

import API from '@/helpers/axios';
import { IStaff } from './model';

const staffEntity = new schema.Entity('staffs');
const staffListSchema = new schema.Array(staffEntity);

export const getStaffsAsyncThunk = createAsyncThunk(
  'organization/getStaff',
  async (_, thunkApi) => {
    try {
      const response = await API.get('/api/users');

      return normalize<
        any,
        {
          staffs: { [key: string]: IStaff };
        }
      >(response.data, staffListSchema).entities;

      // throw new Error('this is error');
    } catch (error: any) {
      throw error.message;
    }
  },
);
