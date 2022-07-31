import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filter/slice';
import pizzaReducer from './pizza/slice';
import cartReducer from './cart/slice';
import errorReducer from './error/slice';
import orderReducer from './order/slice';
import i18nReducer from './i18n/slice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pizza: pizzaReducer,
    cart: cartReducer,
    error: errorReducer,
    order: orderReducer,
    i18n: i18nReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
