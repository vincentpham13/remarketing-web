import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { IGenericEntityState } from "@/redux/interfaces";
import { ICampaign } from "./campaign.model";
import { getCampaignsAsyncThunk } from "./campaign.thunk";


const campaignAdapter = createEntityAdapter<ICampaign>({
  selectId: campaign => campaign.id,
});

const initialState = campaignAdapter.getInitialState<IGenericEntityState>({
  status: 'idle',
  error: null,
});

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaignsAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCampaignsAsyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const { campaigns } = action.payload;
      if (campaigns) {
        campaignAdapter.upsertMany(state, campaigns)
      }
    });
    builder.addCase(getCampaignsAsyncThunk.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

/* Export actions */
// export const { setStaffs } = organizationSlice.actions;

/* Export selectors */
export const campaignsSelector = (state: any): typeof initialState => state.campaign;

/* Export default reducer */
export default campaignSlice.reducer;
