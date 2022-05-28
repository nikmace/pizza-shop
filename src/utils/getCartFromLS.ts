/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CartItem } from 'types/types';
import calcTotalPrice from './calcTotalPrice';

const getCartFromLS = () => {
  const data: string | null = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    cartItems: items as CartItem[],
    totalPrice,
  };
};

export default getCartFromLS;
