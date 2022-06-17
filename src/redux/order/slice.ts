import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderState {
  message: string;
  success: boolean;
}

const initialState: OrderState = {
  message: '',
  success: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage, setSuccess } = orderSlice.actions;

export default orderSlice.reducer;
