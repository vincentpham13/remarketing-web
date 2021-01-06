import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import * as counter from '../counter/slice';
import { IUserInfo, IUserState } from './model';

export const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  name: 'Bot',
  age: 10,
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, { payload }: PayloadAction<IUserInfo>) => {
      state.name = payload.name;
      state.age = payload.age;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(counter.incrementByAmount, (state, action) => {});
  },
});

/* Export actions */
export const { setUserName } = userSlice.actions;

/* Export selectors */
export const userSelector = (state: any): typeof initialState => state.user;

/* Export default reducer */
export default userSlice.reducer;
