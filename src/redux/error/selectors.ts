/* eslint-disable import/prefer-default-export */
import { RootState } from 'redux/store';

export const selectError = (state: RootState) => state.error.message;
export const selectStatusCode = (state: RootState) => state.error.statusCode;
