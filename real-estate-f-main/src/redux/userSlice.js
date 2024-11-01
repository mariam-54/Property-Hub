// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';

// const token = localStorage.getItem("token") || sessionStorage.getItem("token");

// const initialState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
// };


// export const fetchUserProfile = createAsyncThunk(
//   'user/fetchUserProfile',
//   async () => {
//     const response = await fetch("http://localhost:3000/users/details", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         token: `${token}`
//       },
//     });
//     console.log(token)
//     const data = await response.json();
//     console.log(data)
//     return data;
//   }
// );


// export const updateProfile = createAsyncThunk(
//   'user/updateProfile',
//   async () => {
//     const response = await fetch("http://localhost:3000/users/", {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         token: `${token}`
//       },
//     });
//     console.log(token)
//     const data = await response.json();
//     console.log(data)
//     return data;
//   }
// );

// // remove User
// export const removeProfile = createAsyncThunk(
//   "user/removeProfile",
  
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`http://localhost:3000/users/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           token: `${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete the account.");
//       }

//       toast.success("Your Account Deleted");
//       console.log("Id:" ,id);
//       return id;
//     } catch (error) {
//       toast.error("Error deleting account");
//       return rejectWithValue(error.message);
//     }
//   }
// );



// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setLogin: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     setLogout: () => {
//       localStorage.removeItem('token');
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });


// export const { setLogin, setLogout } = userSlice.actions;


// export default userSlice.reducer;






import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const initialState = {
  user: null,
  token: token || null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`
      },
    });
    const data = await response.json();
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (id) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`
      },
      body: JSON.stringify(id),
    });
    const data = await response.json();
    toast.success("Your Account Updated");
    console.log(id)
    console.log(data)
    return data;
  }
);

export const removeProfile = createAsyncThunk(
  "user/removeProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the account.");
      }

      toast.success("Your Account Deleted");
      console.log(id)
      return id;
    } catch (error) {
      toast.error("Error deleting account");
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProfile.fulfilled, (state) => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(removeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
