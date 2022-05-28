import { RootState } from 'redux/store';

// eslint-disable-next-line import/prefer-default-export
export const selectCart = (state: RootState) => state.cart.cartItems;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.cartItems.find((obj) => obj.id === id);
export const selectCartItemsCount = (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.count, 0);
