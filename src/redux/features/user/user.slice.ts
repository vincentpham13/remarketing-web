import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { IGenericEntityState } from "@/redux/interfaces";
import { IUserInfo, IUserState } from './user.model';
import { getFbProfileAsyncThunk, getMeAsyncThunk, updateUserInfoAsyncThunk } from './user.thunk';

export const userAdapter = createEntityAdapter();

const initialState: IUserState & IGenericEntityState = userAdapter.getInitialState({
  id: '',
  name: '',
  email: '',
  phone: '',
  job: '',
  remainingMessages: 0,
  totalMessages: 0,
  status: 'idle',
  error: null
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
        job,
        remainingMessage,
        messageAmount
      } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.job = job;
      state.remainingMessages = remainingMessage ?? state.remainingMessages;
      state.totalMessages = messageAmount ?? state.totalMessages;

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
        remainingMessage,
        messageAmount
      } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.job = job;
      state.remainingMessages = remainingMessage ?? state.remainingMessages;
      state.totalMessages = messageAmount ?? state.totalMessages;
    });
    builder.addCase(getMeAsyncThunk.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getFbProfileAsyncThunk.fulfilled, (state, action) => {
      state.picture = action.payload;
    });
  }
});

/* Export actions */
export const { setUserName } = userSlice.actions;

/* Export selectors */
export const userSelector = (state: any): typeof initialState => state.user;

/* Export default reducer */
export default userSlice.reducer;
