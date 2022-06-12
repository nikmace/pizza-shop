import { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { setError } from 'redux/error/slice';
import { InputValues } from 'pages/Checkout';

export type ValidationResponse = {
  message: string;
  success: boolean;
  errors: {
    firstName: string[];
    lastName: string[];
    email: string[];
    phone: string[];
    address: string[];
    time: string[];
  };
  errorCount: number;
};

const validateInput = async (
  input: InputValues,
  dispatch: Dispatch<PayloadAction<string>>
): Promise<ValidationResponse | undefined> => {
  try {
    const data = await fetch(
      'https://pizz-server.herokuapp.com/api/v1/validation',
      {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedData: ValidationResponse = await data.json();

    return parsedData;
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setError(err.message));
    }
  }

  return undefined;
};

export default validateInput;
