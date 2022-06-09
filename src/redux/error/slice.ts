import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ErrorCodes } from './types';

export interface ErrorState {
  message: string;
  statusCode: ErrorCodes;
}

const initialState: ErrorState = {
  message: '',
  statusCode: ErrorCodes.InternalServerError,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setStatusCode: (state, action: PayloadAction<number>) => {
      state.statusCode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
