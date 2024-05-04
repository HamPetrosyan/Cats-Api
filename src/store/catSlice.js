import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "cats/fetchCategories",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/categories"
      );

      dispatch(setCategories(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCats = createAsyncThunk(
  "cats/fetchCats",
  async ({ categoryId, page }, { rejectWithValue, dispatch }) => {
    try {
      const url = categoryId
        ? `https://api.thecatapi.com/v1/images/search?api_key=live_QBbnYiIoLzY1jQzdxshSiowclOWOrp51GI3RhWZveh29ASM8IvVj0tbcb6LgJFhK&limit=9&page=${page}&category_ids=${categoryId}`
        : `https://api.thecatapi.com/v1/images/search?api_key=live_QBbnYiIoLzY1jQzdxshSiowclOWOrp51GI3RhWZveh29ASM8IvVj0tbcb6LgJFhK&limit=9&page=${page}`;
      const response = await axios.get(url);

      dispatch(addCats(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const catSlice = createSlice({
  name: "cats",
  initialState: {
    catImages: [],
    categories: [],
    selectedCategory: null,
    status: null,
    error: null,
    currentPage: 1,
  },
  reducers: {
    setCats(state, action) {
      state.catImages = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addCats(state, action) {
      state.catImages = [...state.catImages, ...action.payload];
    },
    nextPage(state) {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCats.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCats, setCategories, addCats, nextPage } = catSlice.actions;
export default catSlice.reducer;
