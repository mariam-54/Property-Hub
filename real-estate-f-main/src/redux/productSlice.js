import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Retrieve token from localStorage or sessionStorage
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const initialState = {
  states: [],
  statesByUser: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products with token in headers
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("http://localhost:3000/posts");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data;
  }
);
export const fetchProductsByUser = createAsyncThunk(
  "products/fetchProductsByUser",
  async () => {
    const res = await fetch("http://localhost:3000/posts/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.statesByUser = action.payload;
      })
      .addCase(fetchProductsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const {  } = productSlice.actions;

export default productSlice.reducer;
