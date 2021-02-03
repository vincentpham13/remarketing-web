import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { IGenericEntityState } from '@/redux/interfaces';
import { getStaffsAsyncThunk } from './organization.thunk';

const staffsAdapter = createEntityAdapter();
const initialState = {
  id: 1,
  name: 'Vincent Group',
  staffs: staffsAdapter.getInitialState<IGenericEntityState>({
    status: 'idle',
    error: null,
  }),
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getStaffsAsyncThunk.pending, (state) => {
      state.staffs.status = 'loading';
    });
    builder.addCase(getStaffsAsyncThunk.fulfilled, (state, action) => {
      const { staffs } = action.payload;
      if(staffs){
        state.staffs.status = 'succeeded';
        staffsAdapter.upsertMany(state.staffs, staffs);
      }
    });
    builder.addCase(getStaffsAsyncThunk.rejected, (state, action) => {
      state.staffs.status = 'failed';
      state.staffs.ids = [];
      state.staffs.entities = {};
      if (action.error.message) {
        state.staffs.error = action.error.message;
      }
    });
  },
});

/* Export actions */
// export const { setStaffs } = organizationSlice.actions;

/* Export selectors */
export const organizationSelector = (state: any): typeof initialState => state.organization;

/* Export default reducer */
export default organizationSlice.reducer;
