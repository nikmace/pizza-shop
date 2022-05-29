import { CartItem } from 'types/types';

const calcTotalPrice = (items: CartItem[]): number => {
  return items.reduce(
    (sum: number, obj: CartItem) => obj.price * obj.variation.count + sum,
    0
  );
};

export default calcTotalPrice;
