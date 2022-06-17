/* eslint-disable import/prefer-default-export */
import { RootState } from 'redux/store';

export const selectOrderMessage = (state: RootState) => state.order.message;
export const selectOrderSuccessMessage = (state: RootState) => state.order.success;