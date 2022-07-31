/* eslint-disable import/prefer-default-export */
import { RootState } from 'redux/store';
import i18n from '../../i18n/i18n.json';

export const selectI18n = (state: RootState) => {
  return {
    ...state.i18n,
  };
};

export const selectLocale = (state: RootState) => {
  return state.i18n.useLanguage === 'RU' ? i18n.RU : i18n.EN;
};
