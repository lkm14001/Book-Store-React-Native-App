import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';

import { bookAPI, bookCategoriesAPI } from './bookAPI';

export interface IBook {
  id: number;
  title: string;
  author: string;
  genre: string[];
  image: string;
  rating?: number;
  file:string;
  price:number;
}

export interface ICategory {
  category: string;
  data: IBook[];
}

export interface IinitialState {
  books: IBook[];
  categoryBooks: ICategory;
}

const initialState: IinitialState = {
  books: [],
  categoryBooks: {
    category:'',
    data:[]
  },
};



export const fetchBooksAsync = createAsyncThunk('fetchBooksAsync', async () => {
  const response = await bookAPI();
  return response;
});

export const fetchCategoriesAsync = createAsyncThunk(
  'fetchCategoriesAsync',
  async (categories: string) => {
    const response = await bookCategoriesAPI(categories);
    return response;
  },
);

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    clearCategoryBooksState:(state) => {
      state.categoryBooks.category = '';
      state.categoryBooks.data = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBooksAsync.fulfilled, (state, action) => {
      state.books = action.payload;
    });
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      state.categoryBooks = action.payload;
    });
  },
});

export default bookSlice.reducer;
export const {clearCategoryBooksState} = bookSlice.actions;
export const bookData = (state: RootState) => state.book;
