import api from "@/services/api";
import { getDecodedToken } from "@/utils/utils";

export const fetchProductsApi = async (params: {
  type?: string;
  categoryName?: string;
  color?: string;
  sortOrder?: "asc" | "desc" | "newest" | "oldest";
}) => {
  const token = getDecodedToken();

  const response = await api.post(
    "/products/all",
    { userId: token?.userId },
    { params }
  );

  return response.data;
};

export const fetchProductsColorsApi = async (params: {
  categoryName?: string;
  duotone?: boolean;
}) => {
  const response = await api.get("/products/findColorsByCategory", {
    params,
  });

  return response.data;
};

// categories
export const getAllCategoriesApi = async () => {
  const response = await api.get("/categories");

  return response.data;
};
