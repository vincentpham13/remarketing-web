import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IGenericEntityState } from "@/redux/interfaces";
import { getFanpagesAsyncThunk } from "./fanpage.thunk";
import { IFanPage } from "./fanpage.model";

const fanpageAdapter = createEntityAdapter<IFanPage>({
  selectId: page => page.id,
});

const initialState = fanpageAdapter.getInitialState<IGenericEntityState>({
  status: 'idle',
  error: null,
});

const fanpageSlice = createSlice({
  name: 'fanpages',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFanpagesAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getFanpagesAsyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      fanpageAdapter.upsertMany(state, action.payload.fanpages)
    });
    builder.addCase(getFanpagesAsyncThunk.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

/* Export actions */
// export const { setStaffs } = organizationSlice.actions;

/* Export selectors */
export const fanpagesSelector = (state: any): typeof initialState => state.fanpage;

/* Export default reducer */
export default fanpageSlice.reducer;
