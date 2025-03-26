import { Delete } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAddressApi,
  fetchUserDetailsApi,
  loginApi,
  registerUserApi,
  resetPasswordApi,
  resetPasswordEmailApi,
  updateAddressApi,
  updatePasswordApi,
  updateUserDetailsApi,
  verifyUserApi,
  deleteAddressApi,
  subscribeUserApi,
} from "../api/authApi";

import api from "@/services/api";

export interface Address {
  address: string;
  apartment: string;
  area: string;
  city: string;
  addressId: string;
  contactNumber?: string;
}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  address?: Address[];
}

export interface UpdatedUser {
  email: string;
  contactNumber: string;
  dateOfBirth: string;
}

// const initialState = {
//   token: null,
//   user: null,
//   registerUserEmail: "",
//   resetPasswordUserEmail: "",
// };
const initialState: {
  token: string | null;
  user: User | null;
  registerUserEmail: string;
  resetPasswordUserEmail: string;
} = {
  token: null,
  user: null, // Ensure TypeScript knows this can be a User object
  registerUserEmail: "",
  resetPasswordUserEmail: "",
};

// AsyncThunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(err || "Something went wrong");
    }
  }
);
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (credentials: { email: string; code: string }, { rejectWithValue }) => {
    try {
      const data = await verifyUserApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(
        err?.message || err?.message[0] || "Something went wrong"
      );
    }
  }
);
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (
    credentials: {
      email: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await updatePasswordApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(
        err?.message || err?.message[0] || "Something went wrong"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    credentials: {
      oldPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await resetPasswordApi(credentials);
      return data;
    } catch (err: any) {
      return rejectWithValue(err || "Something went wrong");
    }
  }
);

export const resetPasswordEmail = createAsyncThunk(
  "auth/resetPasswordEmail",
  async (credentials: { email: string }, { rejectWithValue }) => {
    try {
      // console.log("credentials", credentials);
      const data = await resetPasswordEmailApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(err?.message[0] || "Something went wrong");
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(credentials);

      return data;
    } catch (err: any) {
      return rejectWithValue(err || "Something went wrong");
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async () => {
    const response = await api.get("/auth/getOneUser");
    return response.data;
  }
);

export const updateUserDetails = createAsyncThunk(
  "auth/updateUserDetails",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await updateUserDetailsApi(data as UpdatedUser);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const updateAddress = createAsyncThunk(
  "auth/updateAddress",
  async (
    { addressId, data }: { addressId: string; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateAddressApi(addressId, data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "auth/deleteAddress",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await deleteAddressApi(id);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const createAddress = createAsyncThunk(
  "auth/createAddress",
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const response = await createAddressApi(data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const subscribeUser = createAsyncThunk(
  "auth/subscribeUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await subscribeUserApi(data);

      return response;
    } catch (err: any) {

      return rejectWithValue(err || "Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.data.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {
        // console.log("action .payload", action.payload.data.email);
        state.registerUserEmail = action.payload.data.email;
      })
      .addCase(resetPasswordEmail.fulfilled, (state, action) => {
        // console.log("action .payload", action.payload.data.email);
        state.resetPasswordUserEmail = action.payload.data.email;
      })
      .addCase(resetPassword.pending, () => {})
      .addCase(resetPassword.fulfilled, () => {})
      .addCase(resetPassword.rejected, () => {})
      .addCase(fetchUserDetails.pending, (state) => {})
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {})
      .addCase(createAddress.fulfilled, (state, action) => {
        if (state.user) {
          state.user.address = state.user.address || [];
          state.user.address.push(action.payload);
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        if (state.user && state.user.address) {
          state.user.address = state.user.address.filter(
            (addr) => addr.addressId !== action.payload.addressId
          );
        }
      })

      .addCase(updateUserDetails.pending, (state) => {})
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        console.error("Failed to update user details:", action.payload);
      });
  },
});

export default authSlice.reducer;
