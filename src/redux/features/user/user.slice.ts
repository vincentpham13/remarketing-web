import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { IGenericEntityState } from "@/redux/interfaces";
import { IUserInfo, IUserInfoDashboard, IUserState } from './user.model';
import { getFbProfileAsyncThunk, getMeAsyncThunk, getMeDashboardAsyncThunk, updateUserInfoAsyncThunk } from './user.thunk';
import moment from 'moment';

export const userAdapter = createEntityAdapter();

const initialState: IUserState & IGenericEntityState & { dashboardInfo : IUserInfoDashboard } = userAdapter.getInitialState({
  id: '',
  name: '',
  email: '',
  phone: '',
  job: '',
  picture: '',
  successMessages: 0,
  totalMessages: 0,
  status: 'idle',
  error: null,
  dashboardInfo: {
    pageCount: 0,
    userPlan: {
      totalMessages: 0,
      successMessages: 0,
      label: '',
    },
    runningCampaign: 0,
    completedCampaign: 0,
    recentCampaign: [],
    recentOrder: []
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, { payload }: PayloadAction<IUserInfo>) => {
      state.name = payload.name;
      state.email = payload.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserInfoAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateUserInfoAsyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const {
        id,
        name,
        phone,
        email,
        job
      } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.job = job;
    });
    builder.addCase(updateUserInfoAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getMeAsyncThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getMeAsyncThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const {
        id,
        name,
        phone,
        email,
        job,
        successMessages,
        totalMessages
      } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.job = job;
      state.successMessages = successMessages;
      state.totalMessages = totalMessages;
    });
    builder.addCase(getMeAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getFbProfileAsyncThunk.fulfilled, (state, action) => {
      state.picture = action.payload;
    });

    builder.addCase(getMeDashboardAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getMeDashboardAsyncThunk.fulfilled, (state, action) => {
      if(action.payload && action.payload.userPlan){
        state.successMessages = action.payload.userPlan.successMessages;
        state.totalMessages = action.payload.userPlan.totalMessages;
        state.dashboardInfo = action.payload;
      }
      
    });
  }
});

/* Export actions */
export const { setUserName } = userSlice.actions;

/* Export selectors */
export const userSelector = (state: any): typeof initialState => state.user;

export const userDashboardSelector = (state: any): typeof initialState => state.user;


/* Export default reducer */
export default userSlice.reducer;
