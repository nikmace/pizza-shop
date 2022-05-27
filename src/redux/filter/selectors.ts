import { RootState } from 'redux/store';

// eslint-disable-next-line import/prefer-default-export
export const selectSort = (state: RootState) => state.filter.sort;
export const selectCategory = (state: RootState) => state.filter.category;
export const selectPage = (state: RootState) => state.filter.currentPage;
export const selectPizza = (state: RootState) => state.filter.searchName;
