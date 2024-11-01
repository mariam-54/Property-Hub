import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  states: [],
  favorites: [],
  loading: false,
  error: null,
};
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const res = await fetch("http://localhost:3000/posts/user/favourite", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
      
    });
    console.log(token)

    const data = await res.json();
    return data;
  }
);

// remove favorites post
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (postId) => {
    await fetch(`http://localhost:3000/posts/user/favourite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
      body: JSON.stringify({ postId }),
    });
    toast.success("Post Deleted to favorites")
    
    return postId; // Return the postId so we can remove it from state
  }
);

// Add favorite post
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (postId, { rejectWithValue }) => {
    try {
      console.log("Adding favorite with postId:", postId);
      const res = await fetch(`http://localhost:3000/posts/user/favourite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify({ postId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.success("Post added to favorites")
        return rejectWithValue(errorData);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error("Post doesn't added to favorites")

      return rejectWithValue(error.message);
    }
  }
);

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add favorite
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        console.error(
          "Error adding favorite:",
          action.payload || action.error.message
        );
      })
      // Remove favorite
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (post) => post._id !== action.payload
        );
      });
  },
});

export default favoriteSlice.reducer;