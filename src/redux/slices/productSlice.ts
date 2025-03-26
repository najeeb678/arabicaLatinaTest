import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsApi,
  fetchProductsColorsApi,
  getAllCategoriesApi,
} from "../api/productApi";

interface ColorData {
  regular: string[];
  duotone: string[];
  style: string[];
}
// Define the structure of the state
interface ProductState {
  productData: Record<string, any[]>;
  colorsData: Record<string, ColorData>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
}

// Initial state
const initialState: ProductState = {
  productData: {
    scarves: [],
    shawls: [],
    blankets: [],
    jewelry: [],
    food: [],
    masbaha: [],
    outWear: [],
    organic: [],
    limitedEdition: [],
    searchProduct: [],
  },
  colorsData: {
    scarves: { regular: [], duotone: [], style: [] },
    shawls: { regular: [], duotone: [], style: [] },
    blankets: { regular: [], duotone: [], style: [] },
    jewelry: { regular: [], duotone: [], style: [] },
    food: { regular: [], duotone: [], style: [] },
    masbaha: { regular: [], duotone: [], style: [] },
    outWear: { regular: [], duotone: [], style: [] },
    limitedEdition: { regular: [], duotone: [], style: [] },
    searchProduct: { regular: [], duotone: [], style: [] },
  },
  loading: {
    scarves: false,
    shawls: false,
    blankets: false,
    jewelry: false,
    food: false,
    masbaha: false,
    outWear: false,
    organic: false,
    limitedEdition: false,
    searchProduct: false,
  },
  errors: {
    scarves: null,
    shawls: null,
    blankets: null,
    jewelry: null,
    food: null,
    masbaha: null,
    outWear: null,
    organic: null,
    limitedEdition: null,
    searchProduct: null,
  },
};

// Async thunks
export const getAllCategories = createAsyncThunk(
  "products/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCategoriesApi();
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch scarves products");
    }
  }
);

export const fetchDynamicCategoryProducts = createAsyncThunk(
  "products/fetchDynamicCategoryProducts",
  async (
    params: {
      categoryName: string;
      type?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetchProductsApi(params);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch category products");
    }
  }
);

export const fetchDynamicCategoryProductsColors = createAsyncThunk(
  "products/fetchDynamicCategoryProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetchProductsColorsApi(params);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch blankets colors");
    }
  }
);
export const fetchScarfsProducts = createAsyncThunk(
  "products/fetchScarfsProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      return { category: "scarves", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch scarves products");
    }
  }
);
export const fetchShawlsProducts = createAsyncThunk(
  "products/fetchShawlsProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      return { category: "shawls", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch shawls products");
    }
  }
);

export const fetchBlanketsProducts = createAsyncThunk(
  "products/fetchBlanketsProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      return { category: "blankets", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch blankets products");
    }
  }
);
export const fetchMasbahaProducts = createAsyncThunk(
  "products/fetchMasbahaProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      return { category: "masbaha", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch blankets products");
    }
  }
);
export const fetchJewelryProducts = createAsyncThunk(
  "products/fetchJewelryProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      return { category: "jewelry", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch jewelry products");
    }
  }
);
export const fetchOutWearProducts = createAsyncThunk(
  "products/fetchOutWearProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      return { category: "outWear", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch jewelry products");
    }
  }
);
export const fetchlimitedEditionProducts = createAsyncThunk(
  "products/fetchlimitedEditionProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      return { category: "limitedEdition", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch jewelry products");
    }
  }
);
export const fetchOrganicProducts = createAsyncThunk(
  "products/fetchOrganicProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      return { category: "organic", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch jewelry products");
    }
  }
);

export const fetchShawlsProductsColors = createAsyncThunk(
  "products/fetchShawlsProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsColorsApi(params);
      return {
        category: "shawls",
        data: {
          regular: data.data.colors.regular || [],
          duotone: data.data.colors.duotone || [],
          style: data.data.style || [],
        },
      };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch blankets colors");
    }
  }
);
export const fetchJewelryProductsColors = createAsyncThunk(
  "products/fetchJewelryProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsColorsApi(params);
      return {
        category: "jewelry",
        data: {
          regular: data.data.colors.regular || [],
          duotone: data.data.colors.duotone || [],
          style: data.data.style || [],
        },
      };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch blankets colors");
    }
  }
);
export const fetchScarfProductsColors = createAsyncThunk(
  "products/fetchScarfProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsColorsApi(params);

      return {
        category: "scarves",
        data: {
          regular: data.data.colors.regular || [],
          duotone: data.data.colors.duotone || [],
          style: data.data.style || [],
        },
      };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch shawls colors");
    }
  }
);
export const fetchBlanketsProductsColors = createAsyncThunk(
  "products/fetchBlanketsProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsColorsApi(params);
      return {
        category: "blankets",
        data: {
          regular: data.data.colors.regular || [],
          duotone: data.data.colors.duotone || [],
          style: data.data.style || [],
        },
      };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch shawls colors");
    }
  }
);
export const fetchMasbahaProductsColors = createAsyncThunk(
  "products/fetchMasbahaProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsColorsApi(params);
      return {
        category: "masbaha",
        data: {
          regular: data.data.colors.regular || [],
          duotone: data.data.colors.duotone || [],
          style: data.data.style || [],
        },
      };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch masbaha colors");
    }
  }
);
export const fetchOutWearProductsColors = createAsyncThunk(
  "products/fetchOutWearProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsColorsApi(params);
      return {
        category: "outWear",
        data: {
          regular: data.data.colors.regular || [],
          duotone: data.data.colors.duotone || [],
          style: data.data.style || [],
        },
      };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch masbaha colors");
    }
  }
);
export const fetchlimitedEditionProductsColors = createAsyncThunk(
  "products/fetchlimitedEditionProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsColorsApi(params);
      return {
        category: "limitedEdition",
        data: {
          regular: data.data.colors.limitedEditionRegularColors || [],
          duotone: data.data.colors.limitedEditionDuotoneColors || [],
          style: data.data.style || [],
        },
      };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch masbaha colors");
    }
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "products/fetchSearchProducts",
  async (
    params: {
      type?: string;
      categoryName?: string;
      color?: string;
      sortOrder?: "asc" | "desc" | "newest" | "oldest";
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi(params);
      // console.log("data in slice", data);
      return { category: "searchProduct", data: data.data };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch jewelry products");
    }
  }
);
export const fetchSearchProductsColors = createAsyncThunk(
  "products/fetchSearchProductsColors",
  async (
    params: { categoryName?: string; color?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsColorsApi(params);

      return {
        category: "searchProduct",
        data: {
          regular: data.data.colors.regular || [],
          duotone: data.data.colors.duotone || [],
          style: data.data.style || [],
        },
      };
    } catch (err: unknown) {
      return rejectWithValue("Failed to fetch blankets colors");
    }
  }
);
// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetSearchState(state) {
      state.productData.searchProduct = [];
      state.colorsData.searchProduct = { regular: [], duotone: [], style: [] };
      state.loading.searchProduct = false;
      state.errors.searchProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Scarves Products
      .addCase(fetchScarfsProducts.pending, (state) => {
        state.loading.scarves = true;
        state.errors.scarves = null;
      })
      .addCase(fetchScarfsProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchScarfsProducts.rejected, (state, action) => {
        state.loading.scarves = false;
        state.errors.scarves = action.payload as string;
      })

      // Fetch Scarves Colors
      .addCase(fetchScarfProductsColors.pending, (state) => {
        state.loading.scarves = true;
      })
      .addCase(fetchScarfProductsColors.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.colorsData[category] = data;
      })
      .addCase(fetchScarfProductsColors.rejected, (state, action) => {
        state.loading.scarves = false;
      });
    // Fetch Shawls Products
    builder

      .addCase(fetchShawlsProducts.pending, (state) => {
        state.loading.shawls = true;
        state.errors.shawls = null;
      })
      .addCase(fetchShawlsProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchShawlsProducts.rejected, (state, action) => {
        state.loading.shawls = false;
        state.errors.shawls = action.payload as string;
      })

      // Fetch Shawls Colors
      .addCase(fetchShawlsProductsColors.pending, (state) => {
        state.loading.shawls = true;
      })
      .addCase(fetchShawlsProductsColors.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.colorsData[category] = data;
      })
      .addCase(fetchShawlsProductsColors.rejected, (state, action) => {
        state.loading.shawls = false;
      });
    // Fetch Blankets Products
    builder
      .addCase(fetchBlanketsProducts.pending, (state) => {
        state.loading.blankets = true;
        state.errors.blankets = null;
      })
      .addCase(fetchBlanketsProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchBlanketsProducts.rejected, (state, action) => {
        state.loading.blankets = false;
        state.errors.blankets = action.payload as string;
      })
      // Fetch Blankets Colors
      .addCase(fetchBlanketsProductsColors.pending, (state) => {
        state.loading.blankets = true;
      })
      .addCase(fetchBlanketsProductsColors.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.colorsData[category] = data;
      })
      .addCase(fetchBlanketsProductsColors.rejected, (state, action) => {
        state.loading.blankets = false;
      });

    // Fetch Jewelry Products
    builder
      .addCase(fetchJewelryProducts.pending, (state) => {
        state.loading.jewelry = true;
        state.errors.jewelry = null;
      })
      .addCase(fetchJewelryProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchJewelryProducts.rejected, (state, action) => {
        state.loading.jewelry = false;
        state.errors.jewelry = action.payload as string;
      })
      .addCase(fetchJewelryProductsColors.pending, (state) => {
        state.loading.jewelry = true;
      })
      .addCase(fetchJewelryProductsColors.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.colorsData[category] = data;
      })
      .addCase(fetchJewelryProductsColors.rejected, (state, action) => {
        state.loading.jewelry = false;
      });
    // Fetch Masbaha Products
    builder
      .addCase(fetchMasbahaProducts.pending, (state) => {
        state.loading.masbaha = true;
        state.errors.masbaha = null;
      })
      .addCase(fetchMasbahaProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchMasbahaProducts.rejected, (state, action) => {
        state.loading.masbaha = false;
        state.errors.masbaha = action.payload as string;
      })
      .addCase(fetchMasbahaProductsColors.pending, (state) => {
        state.loading.masbaha = true;
      })
      .addCase(fetchMasbahaProductsColors.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.colorsData[category] = data;
      })
      .addCase(fetchMasbahaProductsColors.rejected, (state, action) => {
        state.loading.masbaha = false;
      });
    // Fetch Outwear Products
    builder
      .addCase(fetchOutWearProducts.pending, (state) => {
        state.loading.outWear = true;
        state.errors.outWear = null;
      })
      .addCase(fetchOutWearProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchOutWearProducts.rejected, (state, action) => {
        state.loading.outWear = false;
        state.errors.outWear = action.payload as string;
      })
      .addCase(fetchOutWearProductsColors.pending, (state) => {
        state.loading.outWear = true;
      })
      .addCase(fetchOutWearProductsColors.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.colorsData[category] = data;
      })
      .addCase(fetchOutWearProductsColors.rejected, (state, action) => {
        state.loading.outWear = false;
      });

    // Fetch limitedEdition Products
    builder
      .addCase(fetchlimitedEditionProducts.pending, (state) => {
        state.loading.limitedEdition = true;
        state.errors.limitedEdition = null;
      })
      .addCase(fetchlimitedEditionProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchlimitedEditionProducts.rejected, (state, action) => {
        state.loading.limitedEdition = false;
        state.errors.limitedEdition = action.payload as string;
      })
      .addCase(fetchlimitedEditionProductsColors.pending, (state) => {
        state.loading.limitedEdition = true;
      })
      .addCase(fetchlimitedEditionProductsColors.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.colorsData[category] = data;
      })
      .addCase(fetchlimitedEditionProductsColors.rejected, (state, action) => {
        state.loading.limitedEdition = false;
      });

    // Fetch Organic Products
    builder
      .addCase(fetchOrganicProducts.pending, (state) => {
        state.loading.organic = true;
        state.errors.organic = null;
      })
      .addCase(fetchOrganicProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchOrganicProducts.rejected, (state, action) => {
        state.loading.organic = false;
        state.errors.organic = action.payload as string;
      })
      ////////////////////////////////////////
      .addCase(fetchSearchProducts.pending, (state) => {
        state.loading.searchProduct = true;
        state.errors.searchProduct = null;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        const { category, data } = action.payload;

        state.loading[category] = false;
        state.productData[category] = data;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.loading.searchProduct = false;
        state.errors.searchProduct = action.payload as string;
      })
      ////////////////////////////////////////////////
      .addCase(fetchSearchProductsColors.pending, (state) => {
        state.loading.searchProduct = true;
      })
      .addCase(fetchSearchProductsColors.fulfilled, (state, action) => {
        const { category, data } = action.payload;

        state.loading[category] = false;
        state.colorsData[category] = data;
      })
      .addCase(fetchSearchProductsColors.rejected, (state, action) => {
        state.loading.searchProduct = false;
      });
  },
});
export const { resetSearchState } = productsSlice.actions;
export default productsSlice.reducer;
