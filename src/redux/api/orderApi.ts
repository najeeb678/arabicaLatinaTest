import api from "@/services/api";

export const addToShoppingCartApi = async (data: {
  variantId: number;
  quantity: number;
}) => {
  const response = await api.post("/cart-items", data);

  return response.data;
};

export const fetchAllCartItemsApi = async () => {
  const response = await api.get("/cart/user");
  return response.data;
};

export const deleteCartItemApi = async (id: string) => {
  const response = await api.delete(`/cart-items/${id}`);
  return response.data;
};

export const getallVariantsOfAProductApi = async (data: any) => {
  const response = await api.post(
    "/product-variants/allVariantsOfAProduct",
    data
  );

  return response.data;
};
/// create orders

export const createOrderApi = async (data: any) => {
  const response = await api.post("/orders", data);

  return response.data;
};
export const confirmOrderApi = async (data: any) => {
  const response = await api.post("/orders/confirmOrder", data);

  return response.data;
};
export const ApplyPromoCodeApi = async (data: any) => {
  const response = await api.post("/discounts/findDiscountByPromoCode", data);

  return response.data;
};
export const addToFavoriteApi = async (data: any) => {
  const response = await api.post("/products/addToFavorite", data);

  return response.data;
};

export const getUserFavoriteItemsApi = async () => {
  const response = await api.post("/products/getUserFavoriteItems");

  return response.data;
};
export const findUserAddressApi = async () => {
  const response = await api.post("/address/findUserAddress");

  return response.data;
};

export const getOrdersBYUserApi = async (filter?: string) => {
  const response = await api.get("/orders/user", {
    params: filter ? { filter } : {},
  });

  return response.data;
};

export const sumbitInquiryApi = async(data: any) => {
  const response = await api.post("/orders/createInquiry", data);

  return response.data;
}