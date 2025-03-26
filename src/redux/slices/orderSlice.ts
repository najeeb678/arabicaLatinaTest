import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToFavoriteApi,
  addToShoppingCartApi,
  ApplyPromoCodeApi,
  createOrderApi,
  deleteCartItemApi,
  fetchAllCartItemsApi,
  findUserAddressApi,
  getallVariantsOfAProductApi,
  getUserFavoriteItemsApi,
  getOrdersBYUserApi,
  confirmOrderApi,
  sumbitInquiryApi,
} from "../api/orderApi";

interface OrderState {
  productDetails: any[];
  productDetailsLoading: boolean;
  favouriteItemsLoading: boolean;
  cartItems: {
    CartItems: any[];
  };
  cartItemsLoading: boolean;
  UserFavoriteItemsList: any[];
  favoriteItemsCount: number;
  cartItemsCount: number;
  orders: any[];
  ordersLoading: boolean;
}

const initialState: OrderState = {
  productDetails: [],
  productDetailsLoading: false,
  cartItems: { CartItems: [] },
  cartItemsLoading: false,
  UserFavoriteItemsList: [],
  favoriteItemsCount: 0,
  cartItemsCount: 0,
  favouriteItemsLoading: false,
  orders: [],
  ordersLoading: false,
};

export const addToShoppingCart = createAsyncThunk(
  "order/addToShoppingCart",

  async (
    data: { variantId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await addToShoppingCartApi(data);
      return response;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const fetchAllCartItems = createAsyncThunk(
  "order/fetchAllCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllCartItemsApi();
      return data;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const getallVariantsOfAProduct = createAsyncThunk(
  "order/getallVariantsOfAProduct",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await getallVariantsOfAProductApi(data);

      return response;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await createOrderApi(data);

      return response;
    } catch (err: unknown) {
      return rejectWithValue(err || "Something went wrong");
    }
  }
);
export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await confirmOrderApi(data);

      return response;
    } catch (err: unknown) {
      return rejectWithValue(err || "Something went wrong");
    }
  }
);
export const applyPromoCode = createAsyncThunk(
  "order/applyPromoCode",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await ApplyPromoCodeApi(data);
      // console.log("applyPromoCode", response);
      return response;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const findUserAddress = createAsyncThunk(
  "order/findUserAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await findUserAddressApi();

      return response;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);
// deleteCartItemApi
export const deleteCartItem = createAsyncThunk(
  "order/deleteCartItem",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteCartItemApi(id);

      return response;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const sumbitInquiry = createAsyncThunk(
  "order/sumbitInquiry",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await sumbitInquiryApi(data);

      return response;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const addToFavorite = createAsyncThunk(
  "order/addToFavorite",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await addToFavoriteApi(data);

      return response;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const getUserFavoriteItems = createAsyncThunk(
  "order/getUserFavoriteItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserFavoriteItemsApi();

      return response;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const getOrdersByUser = createAsyncThunk(
  "order/getOrdersByUser",
  async ({ filter }: { filter?: string }, { rejectWithValue }) => {
    try {
      const response = await getOrdersBYUserApi(filter);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue("Something went wrong");
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state: any) => {
      state.cartItemsCount = 0;
      state.favoriteItemsCount = 0;
      state.cartItems.CartItems = [];
      state.UserFavoriteItemsList = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getallVariantsOfAProduct.pending, (state, action) => {
        state.productDetailsLoading = true;
      })
      .addCase(getallVariantsOfAProduct.fulfilled, (state, action) => {
        state.productDetails = action.payload.data;
        state.productDetailsLoading = false;
      })
      .addCase(getallVariantsOfAProduct.rejected, (state, action) => {
        state.productDetailsLoading = false;
      })
      .addCase(fetchAllCartItems.pending, (state, action) => {
        state.cartItemsLoading = true;
      })
      .addCase(fetchAllCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload.data;
        state.cartItemsCount = action.payload.data.totalProductCount;

        state.cartItemsLoading = false;
      })
      .addCase(addToShoppingCart.fulfilled, (state, action) => {
        state.cartItemsCount = action.payload.data.count;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.cartItemsCount = 0;
        state.cartItems.CartItems = [];
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const meta = action.meta;
        if (meta?.arg.paymentMethod === "CASH") {
          state.cartItemsCount = 0;
          state.cartItems.CartItems = [];
        }
      })
      .addCase(getUserFavoriteItems.pending, (state, action) => {
        state.favouriteItemsLoading = true;
      })
      .addCase(getUserFavoriteItems.fulfilled, (state, action) => {
        state.UserFavoriteItemsList = action.payload.data.wishlist;
        state.favoriteItemsCount = action.payload.data.countFavorite;
        state.favouriteItemsLoading = false;
      })
      .addCase(getUserFavoriteItems.rejected, (state, action) => {
        state.favouriteItemsLoading = false;
      });

    builder
      .addCase(addToFavorite.fulfilled, (state, action) => {
        const { message, data } = action.payload;

        if (message === "Product added to wishlist successfully!") {
          state.favoriteItemsCount = data.countFavorite;
        } else if (message === "Product removed from wishlist successfully!") {
          state.UserFavoriteItemsList = state.UserFavoriteItemsList.filter(
            (product) => product.productId !== action.meta.arg.productId
          );
          state.favoriteItemsCount = data.countFavorite;
        }
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        console.error("Error:", action.payload);
      })

      .addCase(fetchAllCartItems.rejected, (state, action) => {
        state.cartItemsLoading = false;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItemsCount = state.cartItemsCount - 1;

        const deletedCartItemId = action.payload.data.cartItemId;

        state.cartItems.CartItems = state.cartItems.CartItems.filter(
          (item) => item.cartItemId !== deletedCartItemId
        );
      })
      .addCase(getOrdersByUser.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersLoading = false;
      })
      .addCase(getOrdersByUser.rejected, (state) => {
        state.ordersLoading = false;
      });
  },
});
export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
