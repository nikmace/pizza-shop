import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface I18nState {
  ip: string;
  country: string;
  useLanguage: string;
}

const initialState: I18nState = {
  ip: '',
  country: 'RU',
  useLanguage: 'RU',
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    seti18n: (
      state,
      action: PayloadAction<{ ip: string; country: string }>
    ) => {
      state.ip = action.payload.ip;
      state.country = action.payload.country;

      if (
        state.country === 'UK' ||
        state.country === 'GB' ||
        state.country === 'US'
      ) {
        state.useLanguage = 'EN';
      } else {
        state.useLanguage = 'RU';
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { seti18n } = i18nSlice.actions;

export default i18nSlice.reducer;
