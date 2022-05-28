import { RootState } from 'redux/store';

// eslint-disable-next-line import/prefer-default-export
export const selectPizzas = (state: RootState) => state.pizza.pizzas;
export const selectStatus = (state: RootState) => state.pizza.status;
