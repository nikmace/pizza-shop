export interface IPizza {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export type CartItem = {
  id: string;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
  price: number;
  category: number;
  rating: number;
  count: number;
};
