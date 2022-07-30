import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { PreviousOrder } from 'types/types';

import getOrdersByEmail from '../server/getOrdersByEmail';

import { CheckoutHeading, PreviousOrdersItems } from '../components';

const PreviousOrders: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [previousOrders, setPreviousOrders] = useState<PreviousOrder[]>([]);

  const fetchOrders = async () => {
    const ordersByEmail = await getOrdersByEmail(email, dispatch);

    if (ordersByEmail.length === 0) {
      toast.error(`Мы не нашли заказов с этим имейлом: ${email}`);
    }

    setPreviousOrders(ordersByEmail);
  };

  const onSearchHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    /**
     * Send POST request to backend and retrieve all orders with that email.
     * In case nothing is found, notify user that orders don't exist.
     */
    if (email.length > 3) {
      fetchOrders();
    } else {
      toast.error(`Введите имейл`);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container container--cart">
      <CheckoutHeading title="Прошлые заказы" showIcon={false} />

      <div className="pastorders">
        <form className="pastorders__search" onSubmit={onSearchHandler}>
          <input
            id="email"
            type="email"
            placeholder="Ваш имейл"
            className="pastorders__search-input"
            value={email}
            onChange={handleInputChange}
          />
          <button
            className="pastorders__search-button button button--black"
            type="submit"
          >
            Найти
          </button>
        </form>

        <PreviousOrdersItems previousOrders={previousOrders} />
      </div>
    </div>
  );
};

export default PreviousOrders;
