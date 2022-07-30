import React from 'react';
import { PreviousOrder, OrderedPizza } from 'types/types';

const OrderItem: React.FC<PreviousOrder> = ({
  _id,
  email,
  firstName,
  lastName,
  orderTimeSent,
  totalPrice,
  order,
}) => {
  return (
    <>
      <div className="pastorders__items-order">
        <p>
          {_id.slice(0, 6)}...{_id.slice(-6)}
        </p>
        <span>{email}</span>
        <p>
          {firstName} {lastName}
        </p>
        <p>{totalPrice} ₽</p>
        <p>{orderTimeSent}</p>
      </div>
      <div className="pastorders__items-pizzas">
        <div className="pastorders__items-pizzas--grid gray">
          <p>Название</p>
          <p>Тесто</p>
          <p>Размер</p>
          <p>Цена</p>
          <p>Количество</p>
        </div>
        {order.map((orderItem: OrderedPizza) => (
          <div key={orderItem._id} className="pastorders__items-pizzas--grid">
            <p>{orderItem.name}</p>
            <p>{orderItem.type}</p>
            <p>{orderItem.size} см.</p>
            <p>{orderItem.price} ₽</p>
            <p>x {orderItem.count}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderItem;
