import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPizza } from 'types/types';
import { Status } from './types';

export interface PizzaState {
  pizzas: IPizza[];
  status: Status;
}

const initialState: PizzaState = {
  pizzas: [],
  status: Status.SUCCESS,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<IPizza[]>) => {
      state.pizzas = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPizzas, setStatus } = pizzaSlice.actions;

export default pizzaSlice.reducer;
