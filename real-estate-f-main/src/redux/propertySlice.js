import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state for the property slice
const initialState = {
  property: null,
  loading: false,
  error: null,
  status: "",
};

// Async thunk to add a property
export const addProperty = createAsyncThunk(
  "property/addPost",
  async (propertyData, thunkAPI) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    console.log("Property Data:", propertyData); // Log property data

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response error:", errorData); // Log server error response
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to add property"
        );
      }

      const data = await response.json();
      return data; // Return the added property data
    } catch (error) {
      console.error("Fetch error:", error); // Log fetch error
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create the property slice
const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload; // Set the added property in state
        state.status = "succeeded";
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong"; // Set error message
        state.status = "failed";
      });
  },
});

// Export the reducer
export default propertySlice.reducer;
