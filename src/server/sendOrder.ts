import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { setError } from 'redux/error/slice';
import { Order } from '../types/types';

type OrderResponse = {
  message: string;
  success: boolean;
  errors: string[];
  errorCount: number;
};

const sendOrder = async (
  body: Order,
  dispatch: Dispatch<PayloadAction<string>>
) => {
  try {
    const data = await fetch('https://pizz-server.herokuapp.com/api/v1/order', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedData: OrderResponse = await data.json();

    return parsedData;
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setError(err.message));
    }
  }

  return undefined;
};

export default sendOrder;
