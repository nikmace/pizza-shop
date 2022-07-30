import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { setError, setStatusCode } from 'redux/error/slice';
import { PreviousOrder } from 'types/types';

const getOrdersByEmail = async (
  email: string,
  dispatch: Dispatch<PayloadAction<string>>
): Promise<PreviousOrder[]> => {
  try {
    const data = await fetch(
      'https://pizz-server.herokuapp.com/api/v1/order/retrieve',
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const orders: PreviousOrder[] = await data.json();
    return orders;
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setStatusCode('400'));
      dispatch(setError(err.message));
    }
  }

  return [];
};

export default getOrdersByEmail;
