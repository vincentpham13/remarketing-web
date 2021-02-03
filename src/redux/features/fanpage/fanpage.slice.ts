import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IGenericEntityState } from "@/redux/interfaces";
import { getFanpageMembersAsyncThunk, getFanpagesAsyncThunk } from "./fanpage.thunk";
import { IFanPage, IMember } from "./fanpage.model";

const fanpageAdapter = createEntityAdapter<IFanPage>({
  selectId: page => page.id,
});

const initialState =  fanpageAdapter.getInitialState<IGenericEntityState>({
  status: 'idle',
  error: null,
});

const fanpageSlice = createSlice({
  name: 'fanpages',
  initialState: initialState,
  reducers: {
    resetFanpage: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getFanpagesAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getFanpagesAsyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const { fanpages } = action.payload;
      if (fanpages) {
        fanpageAdapter.upsertMany(state, fanpages)
      }
    });
    builder.addCase(getFanpagesAsyncThunk.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(getFanpageMembersAsyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const members = action.payload.members;
      // @ts-ignore
      if(action.payload.pageId) {
        state.entities[
          action.payload.pageId
        ].members = members
      }
    });
  }
});

/* Export actions */
export const { resetFanpage } = fanpageSlice.actions;

/* Export selectors */
export const fanpagesSelector = (state: any): typeof initialState => state.fanpage;

/* Export default reducer */
export default fanpageSlice.reducer;
