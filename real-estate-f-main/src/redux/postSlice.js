// postSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  loading: false,
  error: null,
};

export const fetchPostDetails = createAsyncThunk(
  "post/fetchPostDetails",
  async ({ id }) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post details");
    }

    const data = await response.json();
    console.log(data);
    console.log(id);

    return data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
