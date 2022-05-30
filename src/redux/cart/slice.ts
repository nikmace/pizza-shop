import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import pizzaVariations from 'pizza-variations';
import { CartItem } from 'types/types';
import calcTotalPrice from 'utils/calcTotalPrice';
import getCartFromLS from 'utils/getCartFromLS';

export interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
}

const initialState: CartState = getCartFromLS();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      // Look if there is already a pizza with same id added to cart
      const itemWithSameId = state.cartItems.find(
        (item: CartItem) =>
          item.id === action.payload.id &&
          item.variation.id === action.payload.variation.id
      );

      // If that pizza exist we just add +1 to the count
      if (itemWithSameId && itemWithSameId.variation.count > 0) {
        itemWithSameId.variation.count += 1;
      } else {
        // eslint-disable-next-line prefer-const
        const order: CartItem = { ...action.payload };

        order.variation = {
          ...order.variation,
          count: 1,
        };

        state.cartItems.push(order);
      }

      // console.log(`Count of items in cart: ${state.cartItems.length}`);
      state.totalPrice = calcTotalPrice(state.cartItems);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    minusItem: (
      state,
      action: PayloadAction<{ id: string; variationId: string }>
    ) => {
      // Find the item with that variationId in the cart
      let elIdx = 0;
      const itemWithSameId = state.cartItems.find((item: CartItem, idx) => {
        elIdx = idx;
        return (
          item.variation.id === action.payload.variationId &&
          item.id === action.payload.id
        );
      });

      // Minus the count
      if (itemWithSameId) {
        itemWithSameId.variation.count -= 1;
      }

      // When the item with that id and variation
      // reaches 0 count we remove it from the array
      if (itemWithSameId?.variation.count === 0) {
        state.cartItems.splice(elIdx, 1);
      }

      // Recalculate total price
      state.totalPrice = calcTotalPrice(state.cartItems);
      // Update localStorage with newest cartItems
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeSingleItem: (
      state,
      action: PayloadAction<{ id: string; variationId: string }>
    ) => {
      // Find the item with that variationId in the cart
      const idx = state.cartItems.findIndex(
        (item) =>
          item.variation.id === action.payload.variationId &&
          item.id === action.payload.id
      );

      if (idx < 0) {
        throw new Error('Item with that index does not exist');
      }

      state.cartItems.splice(idx, 1);

      // Recalculate total price
      state.totalPrice = calcTotalPrice(state.cartItems);
      // Update localStorage with newest cartItems
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeAllItemsFromCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addItemToCart,
  removeAllItemsFromCart,
  minusItem,
  removeSingleItem,
} = cartSlice.actions;

export default cartSlice.reducer;
