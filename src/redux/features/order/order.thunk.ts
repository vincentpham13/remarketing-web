import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { IOrder } from "./order.model";
import API from '@/helpers/axios';

const orderEntity = new schema.Entity('orders');
const orderListSchema = new schema.Array(orderEntity);

export const getOrdersAsyncThunk = createAsyncThunk(
  'order/get-orders',
  async (_, thunkApi): Promise<any | ReturnType<typeof thunkApi.rejectWithValue>> => {
    try {
      const response = await API.axios.get('/orders');
      const data = normalize<
        any, {
          orders: { [key: string]: IOrder }
        }
      >(response.data, orderListSchema).entities;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
