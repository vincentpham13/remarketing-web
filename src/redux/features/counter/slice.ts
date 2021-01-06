import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { getStaffsAsyncThunk } from '@/redux/features/organization';

interface ICounterState {
  value: number;
}

const initialState = {
  value: 0,
};
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementByAmount: (
      state: ICounterState,
      action: PayloadAction<number>,
    ) => {
      state.value += action.payload;
    },
    increment: (state: any) => {
      state.value += 1;
    },
    decrement: (state: any) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStaffsAsyncThunk.fulfilled, (state, action) => {});
  },
});

/* Export actions */
export const { incrementByAmount, increment, decrement } = counterSlice.actions;

// async functions that dont need state checking: loading, succeeded, failed
export const incrementAsync = (amount: number) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

/* Export selectors */
export const counterSelector = (state: any) => state.counter;

/* Export default reducer */
export default counterSlice.reducer;
