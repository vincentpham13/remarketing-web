import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IGenericEntityState } from "@/redux/interfaces";
import { instanceOfIInvalidPromotion, IOrder, IOrderState } from "./order.model";
import { checkPromotionAsyncThunk, createOrderThunk, getOrdersAsyncThunk } from "./order.thunk";


const orderAdapter = createEntityAdapter<IOrder>({
  selectId: order => order.id,
});

const orderState = orderAdapter.getInitialState<IGenericEntityState>({
  status: 'idle',
  error: null,
});

const initialState: IOrderState & typeof orderState = {
  promotion: {
    promotions: [],
    isValid: false,
    status: 'idle',
    error: null
  },
  ...orderState
} 


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
    builder.addCase(checkPromotionAsyncThunk.pending, (state) => {
      state.promotion.promotions = [];
      state.promotion.isValid = false;
      state.promotion.status = 'loading';
    });
    builder.addCase(checkPromotionAsyncThunk.rejected, (state) => {
      state.promotion.promotions = [];
      state.promotion.isValid = false;
      state.promotion.status = 'failed';
    });
    builder.addCase(checkPromotionAsyncThunk.fulfilled, (state, action) => {
      if (action.payload && action.payload.length) {
        if(instanceOfIInvalidPromotion(action.payload[0])){
          state.promotion.isValid = false;
        }else{
          state.promotion.isValid = true;
        }
        state.promotion.promotions = action.payload;
        state.promotion.status = 'succeeded';
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

