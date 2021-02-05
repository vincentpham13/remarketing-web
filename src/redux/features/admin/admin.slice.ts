import { IGenericEntityState } from "@/redux/interfaces";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IOrder, IPackage, IPromotion } from "./admin.model";
import { createPackagesAsyncThunk, getUserOrdersAsyncThunk, getPackagesAsyncThunk, getUsersAsyncThunk, updatePackagesAsyncThunk, confirmUserOrderAsyncThunk, removePackageAsyncthunk, createPromotionAsyncthunk, getPromotionsAsyncThunk } from "./admin.thunk";

const userAdapter = createEntityAdapter();
const packageAdapter = createEntityAdapter<IPackage>({
  selectId: packagePl => packagePl.id,
});
const orderAdapter = createEntityAdapter<IOrder>({
  selectId: order => order.id,
});
const promotionAdapter = createEntityAdapter<IPromotion>({
  selectId: promotion => promotion.id,
});

const initialState = {
  users: userAdapter.getInitialState<IGenericEntityState>({
    status: 'idle',
    error: null
  }),
  packages: packageAdapter.getInitialState<IGenericEntityState>({
    status: 'idle',
    error: null
  }),
  orders: orderAdapter.getInitialState<IGenericEntityState>({
    status: 'idle',
    error: null
  }),
  promotions: promotionAdapter.getInitialState<IGenericEntityState>({
    status: 'idle',
    error: null
  }),
};


export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdmin: () => initialState,
  },
  extraReducers: (builder) => {
    // Users
    builder.addCase(getUsersAsyncThunk.pending, (state, action) => {
      state.users.status = 'loading';
    });
    builder.addCase(getUsersAsyncThunk.fulfilled, (state, action) => {
      userAdapter.upsertMany(state.users, action.payload.users);
      state.users.status = 'succeeded';
    });
    // Packages
    builder.addCase(getPackagesAsyncThunk.pending, (state, action) => {
      state.packages.status = 'loading';
    });
    builder.addCase(getPackagesAsyncThunk.fulfilled, (state, action) => {
      state.packages.status = 'succeeded';
      if(action.payload.packages) {
        packageAdapter.upsertMany(state.packages, action.payload.packages);
      }
    });
    builder.addCase(createPackagesAsyncThunk.pending, (state, action) => {
      state.packages.status = 'loading';
    });
    builder.addCase(createPackagesAsyncThunk.fulfilled, (state, action) => {
      packageAdapter.upsertMany(state.packages, action.payload.packages);
      state.packages.status = 'succeeded';
    });
    builder.addCase(updatePackagesAsyncThunk.pending, (state, action) => {
      state.packages.status = 'loading';
    });
    builder.addCase(updatePackagesAsyncThunk.fulfilled, (state, action) => {
      packageAdapter.upsertOne(state.packages, action.payload.package);
      state.packages.status = 'succeeded';
    });
    // builder.addCase(removePackageAsyncthunk.fulfilled, (state, action) => {
    //   state.packages.status = 'succeeded';
    //   if (action.payload.order) {
    //     packageAdapter.removeOne(state.packages, action.payload.order);
    //   }
    // });
    // Orders
    builder.addCase(getUserOrdersAsyncThunk.pending, (state, action) => {
      state.orders.status = 'loading';
    });
    builder.addCase(getUserOrdersAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.orders) {
        orderAdapter.upsertMany(state.orders, action.payload.orders);
      }
      state.orders.status = 'succeeded';
    });
    builder.addCase(confirmUserOrderAsyncThunk.pending, (state) => {
      state.orders.status = 'loading';
    });
    builder.addCase(confirmUserOrderAsyncThunk.rejected, (state) => {
      state.orders.status = 'succeeded';
    });
    builder.addCase(confirmUserOrderAsyncThunk.fulfilled, (state, action) => {
      state.orders.status = 'succeeded';
      if (action.payload.order) {
        orderAdapter.upsertOne(state.orders, action.payload.order);
      }
    });
    // Promotions  
    builder.addCase(createPromotionAsyncthunk.pending, (state) => {
      state.promotions.status = 'creating-child';
    });
    builder.addCase(createPromotionAsyncthunk.rejected, (state) => {
      state.promotions.status = 'creating-child-failed';
    });
    builder.addCase(createPromotionAsyncthunk.fulfilled, (state, action) => {
      state.promotions.status = 'creating-child-succeeded';
      if (action.payload.promotion) {
        promotionAdapter.upsertOne(state.promotions, action.payload.promotion);
      }
    });
    builder.addCase(getPromotionsAsyncThunk.pending, (state) => {
      state.promotions.status ='loading';
    });
    builder.addCase(getPromotionsAsyncThunk.rejected, (state) => {
      state.promotions.status = 'failed';
    });
    builder.addCase(getPromotionsAsyncThunk.fulfilled, (state, action) => {
      state.promotions.status = 'succeeded';
      if (action.payload.promotions) {
        promotionAdapter.upsertMany(state.promotions, action.payload.promotions);
      }
    });
  }
});


/* Export actions */
export const { resetAdmin } = adminSlice.actions;

/* Export selectors */
export const adminSelector = (state: any): typeof initialState => state.admin;

/* Export reducer */
export default adminSlice.reducer;

