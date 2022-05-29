import pizzaVariations from './index';

const getPriceOfVariation = (
  type: number,
  size: number,
  pizzaTypes: string[],
  pizzaSizes: number[]
): number => {
  const varType = pizzaTypes[type];
  const varSize = pizzaSizes[size];

  for (const variation of pizzaVariations) {
    if (variation.type === varType && variation.size === varSize) {
      return variation.variationPrice;
    }
  }

  return 0;
};

export default getPriceOfVariation;
