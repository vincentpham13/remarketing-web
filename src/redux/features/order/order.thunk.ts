import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { IOrder, IPromotionChecking } from "./order.model";
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


export const createOrderThunk = createAsyncThunk(
  'order/create-order',
  async (data: {order: IOrder, packageIds: number[]}, thunkApi): Promise<any> => {
    try {
      const response = await API.axios.post('/orders', {
        packageIds: data.packageIds,
        fullName: data.order.fullName,
        email: data.order.email,
        phone: data.order.phone,
        address: data.order.address,
        businessName: data.order.businessName,
        businessAddress: data.order.businessAddress,
        emailReceipt: data.order.emailReceipt,
        taxId: data.order.taxId,
        promotionIds: data.order.promotionIds
      });

      const res = normalize<
        any, { [key: string]: IOrder }
      >(response.data, orderEntity).entities;
      return { order: res?.orders[response.data.id] };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const checkPromotionAsyncThunk = createAsyncThunk(
  'order/check-promotion',
  async (promotionChecking: IPromotionChecking, thunkApi): Promise<any> => {
    try {
      const response = await API.axios.post(`/promotions/code/${promotionChecking.promotionCode}`, {
        packageIds: promotionChecking.packageIds,
        orderPrice: promotionChecking.orderPrice
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
});
