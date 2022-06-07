import { RootState } from 'redux/store';

// eslint-disable-next-line import/prefer-default-export
// Select all items in a cart
export const selectCart = (state: RootState) => state.cart.cartItems;

// Select total price
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

// Returns count of pizzas with same id
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => {
    if (item._id === id) {
      sum += item.variation.count;
    }
    return sum;
  }, 0);

// Select the total count of items in cart
export const selectCartItemsCount = (state: RootState): number =>
  state.cart.cartItems.reduce((sum, item) => sum + item.variation.count, 0);

// Returns total price for particular variation
export const selectVariationTotalPrice =
  (id: string, variationId: string) => (state: RootState) =>
    state.cart.cartItems.reduce((sum, item) => {
      if (item.variation.id === variationId && item._id === id) {
        sum += item.price * item.variation.count;
      }
      return sum;
    }, 0);
