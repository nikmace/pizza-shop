import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        (item) => item.id === action.payload.id
      );

      // If that pizza exist we just add +1 to the count
      if (itemWithSameId) {
        itemWithSameId.count += 1;
      } else {
        const order = { ...action.payload, count: 1 };

        state.cartItems.push(order);
      }

      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      // Find the item with that id in the cart
      const itemWithSameId = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (itemWithSameId) {
        itemWithSameId.count -= 1;
      }

      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    removeSingleItem: (state, action: PayloadAction<string>) => {
      // Find the item with that id in the cart
      state.cartItems = state.cartItems.filter(
        (obj) => obj.id !== action.payload
      );
      // Recalculate total price
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    removeAllItemsFromCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
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
