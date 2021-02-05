import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IGenericEntityState } from "@/redux/interfaces";
import { IOrder } from "./order.model";
import { createOrderThunk, getOrdersAsyncThunk } from "./order.thunk";


const orderAdapter = createEntityAdapter<IOrder>({
  selectId: order => order.id,
});

const initialState = orderAdapter.getInitialState<IGenericEntityState>({
  status: 'idle',
  error: null
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getOrdersAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getOrdersAsyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload.orders) {
        orderAdapter.upsertMany(state, action.payload.orders);
      }
    });
    builder.addCase(createOrderThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createOrderThunk.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload.order) {
        orderAdapter.upsertOne(state, action.payload.order);
      }
    });
  },
});

/* Export actions */
export const { } = orderSlice.actions;

/* Export selectors */
export const orderSelector = (state: any): typeof initialState => state.order;

/* Export reducer */
export default orderSlice.reducer;

