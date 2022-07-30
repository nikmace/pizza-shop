import React from 'react';
import { PreviousOrder } from '../../types/types';
import OrderItem from './OrderItem';

interface PreviousOrdersProps {
  previousOrders: PreviousOrder[];
}

const PreviousOrdersItems: React.FC<PreviousOrdersProps> = ({
  previousOrders,
}) => {
  return (
    <div className="pastorders__items">
      {previousOrders.length > 0 &&
        previousOrders.map((item: PreviousOrder) => (
          <OrderItem {...item} key={item._id} />
        ))}
    </div>
  );
};

export default PreviousOrdersItems;
