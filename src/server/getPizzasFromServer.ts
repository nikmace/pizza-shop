import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { setError, setStatusCode } from 'redux/error/slice';
import { IPizza } from 'types/types';

const getPizzasFromServer = async (
  categoryId: number,
  sortName: string,
  currentPage: number,
  dispatch: Dispatch<PayloadAction<string>>
): Promise<IPizza[]> => {
  try {
    const data = await fetch(
      'https://pizz-server.herokuapp.com/api/v1/pizzas',
      {
        method: 'POST',
        body: JSON.stringify({ categoryId, sortName, currentPage }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pizzaList: IPizza[] = await data.json();
    return pizzaList;
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setStatusCode('408'));
      dispatch(setError(err.message));
    }
  }

  return [];
};

export default getPizzasFromServer;
