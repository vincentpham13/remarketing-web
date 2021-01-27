import { IGenericEntityState } from "@/redux/interfaces";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IPackage } from "./admin.model";
import { createPackagesAsyncThunk, getPackagesAsyncThunk, getUsersAsyncThunk, updatePackagesAsyncThunk } from "./admin.thunk";

const userAdapter = createEntityAdapter();
const packageAdapter = createEntityAdapter<IPackage>({
  selectId: pack => pack.id,
})

const initialState = {
  users: userAdapter.getInitialState<IGenericEntityState>({
    status: 'idle',
    error: null
  }),
  packages: packageAdapter.getInitialState<IGenericEntityState>({
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
      packageAdapter.upsertMany(state.packages, action.payload.packages);
      state.packages.status = 'succeeded';
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
  }
});


/* Export actions */
export const { resetAdmin } = adminSlice.actions;

/* Export selectors */
export const adminSelector = (state: any): typeof initialState => state.admin;

/* Export reducer */
export default adminSlice.reducer;

