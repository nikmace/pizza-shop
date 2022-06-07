import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from 'redux/cart/slice';
import { CartItem, IPizza, VariationItem } from 'types/types';

import getPriceOfVariation from '../../pizza-variations/getVariation';

import { selectCartItemById } from '../../redux/cart/selectors';
import pizzaVariations from '../../pizza-variations';

const PizzaBlock: React.FC<IPizza> = ({
  _id,
  name,
  price,
  imageUrl,
  sizes,
  types,
  category,
  rating,
}) => {
  const dispatch = useDispatch();
  const addedCount = useSelector(selectCartItemById(_id));

  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const [activePrice, setActivePrice] = React.useState<number>(0);
  const pizzaTypes: string[] = React.useMemo(
    () => ['тонкое', 'традиционное'],
    []
  );
  const pizzaSizes: number[] = React.useMemo(() => [26, 30, 40], []);

  React.useEffect(() => {
    setActivePrice(
      getPriceOfVariation(activeType, activeSize, pizzaTypes, pizzaSizes)
    );
  }, [activeType, activeSize, pizzaTypes, pizzaSizes]);

  const onAddPizzaToCart = () => {
    let variation: VariationItem = {
      id: 'thin-26',
      type: 'тонкое',
      size: 26,
      count: 0,
      variationPrice: 0,
    };

    for (const variationItem of pizzaVariations) {
      if (
        variationItem.size === sizes[activeSize] &&
        variationItem.type === pizzaTypes[activeType]
      ) {
        variation = variationItem;
      }
    }

    const item: CartItem = {
      _id,
      variation,
      imageUrl,
      name,
      type: pizzaTypes[activeType],
      size: sizes[activeSize],
      price: price + variation.variationPrice,
      category,
      rating,
    };

    dispatch(addItemToCart(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => setActiveType(type)}
                className={activeType === type ? 'active' : ''}
              >
                {pizzaTypes[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, idx) => (
              <li
                key={size}
                onClick={() => setActiveSize(idx)}
                className={activeSize === idx ? 'active' : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price + activePrice} ₽</div>
          <div
            role="none"
            onClick={onAddPizzaToCart}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{addedCount}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
