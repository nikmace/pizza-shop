import { RootState } from 'redux/store';

// eslint-disable-next-line import/prefer-default-export
export const selectCart = (state: RootState) => state.cart.cartItems;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => {
    if (item.id === id) {
      sum += item.variation.count;
    }
    return sum;
  }, 0);

export const selectCartItemsCount = (state: RootState): number =>
  state.cart.cartItems.reduce((sum, item) => sum + item.variation.count, 0);

export const selectVariationTotalPrice =
  (id: string, variationId: string) => (state: RootState) =>
    state.cart.cartItems.reduce((sum, item) => {
      if (item.variation.id === variationId && item.id === id) {
        sum += item.price * item.variation.count;
      }
      return sum;
    }, 0);
