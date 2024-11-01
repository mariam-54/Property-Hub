import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredPosts: [],
  loading: false,
  error: null,
};

export const fetchFilteredPosts = createAsyncThunk(
  'filteredPosts/fetchFilteredPosts',
  async (filters) => {
    const query = new URLSearchParams(filters).toString();
    console.log(query);
    const response = await fetch(`http://localhost:3000/posts/filter?${query}`);
    const data = await response.json();
    console.log(data);
    
    return data;
  }
);

const filteredPostSlice = createSlice({
  name: 'filteredPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredPosts = action.payload;
      })
      .addCase(fetchFilteredPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default filteredPostSlice.reducer;