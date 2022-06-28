import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { ErrorCodes } from './types';

export interface ErrorState {
  message: string;
  statusCode: ErrorCodes;
}

const initialState: ErrorState = {
  message: '',
  statusCode: ErrorCodes.InternalServerError,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;

      switch (state.statusCode) {
        case 503:
          toast.error('Запрос не был обработан, проблема с сервисом');
          break;
        case 500:
          toast.error('Проблема с обработкой вашего запроса.');
          break;
        case 400:
          toast.error('Ресурс который вы ищите не найден.');
          break;
        case 408:
          toast.error('Сервер не отвечает, ответ на запрос не был получен.');
          break;
        default:
          toast.error('Ошибка\nЧто-то пошло не так.');
          break;
      }
    },
    setStatusCode: (state, action: PayloadAction<string>) => {
      state.statusCode = Number(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError, setStatusCode } = errorSlice.actions;

export default errorSlice.reducer;
