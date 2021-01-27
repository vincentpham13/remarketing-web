import { IGenericEntityState } from "@/redux/interfaces";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import build from "next/dist/build";
import { getUsersAsyncThunk } from "./admin.thunk";

const userAdapter = createEntityAdapter();
const initialState = {
  users: userAdapter.getInitialState<IGenericEntityState>({
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
    builder.addCase(getUsersAsyncThunk.fulfilled, (state, action) => {
      userAdapter.upsertMany(state.users, action.payload.users);
      state.users.status = 'succeeded';
    });
  }
});


/* Export actions */
export const { resetAdmin } = adminSlice.actions;

/* Export selectors */
export const adminSelector = (state: any): typeof initialState => state.admin;

/* Export reducer */
export default adminSlice.reducer;

