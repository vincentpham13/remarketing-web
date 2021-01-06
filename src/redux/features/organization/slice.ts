import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { IGenericEntityState } from '@/redux/interfaces';
import { getStaffsAsyncThunk } from './thunk';
import { IStaff } from './model';

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
    setStaffs: (state, action: PayloadAction<IStaff[]>) => {
      // state.staffs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStaffsAsyncThunk.pending, (state, action) => {
      state.staffs.status = 'loading';
    });
    builder.addCase(getStaffsAsyncThunk.fulfilled, (state, action) => {
      state.staffs.status = 'succeeded';
      staffsAdapter.upsertMany(state.staffs, action.payload.staffs);
    });
    builder.addCase(getStaffsAsyncThunk.rejected, (state, action) => {
      state.staffs.status = 'failed';
      if (action.error.message) {
        state.staffs.error = action.error.message;
      }
    });
  },
});

/* Export actions */
export const { setStaffs } = organizationSlice.actions;

/* Export selectors */
export const organizationSelector = (state: any): typeof initialState =>
  state.organization;

/* Export default reducer */
export default organizationSlice.reducer;
