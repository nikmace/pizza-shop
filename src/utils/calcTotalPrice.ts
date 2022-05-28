import { CartItem } from 'types/types';

const calcTotalPrice = (items: CartItem[]): number => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

export default calcTotalPrice;
