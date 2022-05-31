import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectTotalPrice,
  selectCartItemsCount,
} from '../../redux/cart/selectors';

const CheckoutInfo: React.FC = () => {
  const totalPizzaCount = useSelector(selectCartItemsCount);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="checkout__info">
      <h3 className="checkout__info-heading">Информация о вашем заказе:</h3>
      <div className="checkout__info-totals">
        <p>
          Стоимость заказа: <span>{totalPrice} ₽</span>
        </p>
        <p>
          Количество пицц: <span>{totalPizzaCount}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutInfo;
