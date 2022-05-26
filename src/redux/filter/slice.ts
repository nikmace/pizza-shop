import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  category: number;
  sort: number;
  currentPage: number;
}

const initialState: FilterState = {
  category: 0,
  sort: 0,
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    changeSort: (state, action: PayloadAction<number>) => {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCategory, changeSort, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
