import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { setError } from 'redux/error/slice';
import { IPizza } from 'types/types';

const getPizzaById = async (
  id: string,
  dispatch: Dispatch<PayloadAction<string>>
): Promise<IPizza> => {
  let pizza: IPizza = {
    _id: '',
    imageUrl: '',
    category: 0,
    name: '',
    price: 0,
    rating: 0,
    sizes: [0, 0],
    types: [0, 1],
  };

  try {
    const data = await fetch(
      `https://pizz-server.herokuapp.com/api/v1/pizzas/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    pizza = await data.json();
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setError(err.message));
    }
  }

  return pizza;
};

export default getPizzaById;
