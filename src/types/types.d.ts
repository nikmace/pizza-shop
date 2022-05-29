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
  variation: VariationItem;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
  price: number;
  category: number;
  rating: number;
};

export type VariationItem = {
  id: string;
  type: string;
  size: number;
  count: number;
  variationPrice: number;
};
