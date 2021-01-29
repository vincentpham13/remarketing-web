import { IGenericEntityState } from "@/redux/interfaces";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IPackage } from "../admin/admin.model";
import { getPackagesAsyncThunk } from "./package.thunk";

const packageAdapter = createEntityAdapter<IPackage>({
  selectId: pack => pack.id,
});

const initialState = packageAdapter.getInitialState<IGenericEntityState>({
  status: 'idle',
  error: null
});

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    resetPackage: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPackagesAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPackagesAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getPackagesAsyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      packageAdapter.upsertMany(state, action.payload.packages);
    });
  },
});

/* Export actions */
export const { resetPackage } = packageSlice.actions;

/* Export selectors */
export const packageSelector = (state: any): typeof initialState => state.package;

/* Export reducer */
export default packageSlice.reducer;

