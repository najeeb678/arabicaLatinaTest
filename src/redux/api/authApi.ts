import api from "@/services/api";
import { registerUserTypes } from "@/types/types";

interface UpdateAddressData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
  city: string;
  area: string;
  apartment: string;
  type: string;
  userId: string;
}

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await api.post("auth/login", data);

  const userDetails = {
    token: response?.data.data?.access_token,
    name: response?.data.data?.name,
    address: response?.data.data?.address,
    email: response?.data.data?.email,
    contactNumber: response?.data.data?.contactNumber,
    profilePic: response?.data.data?.profilePic,
    subscription: response?.data.data?.subscription,
  };
  // console.log("User23423:", userDetails)
  // Store the userDetails object in localStorage
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  localStorage.setItem("token", response?.data.data?.access_token);

  return response.data;
};

export const registerUserApi = async (data: registerUserTypes) => {
  const response = await api.post("auth/register", data);
  return response.data;
};

export const verifyUserApi = async (data: { email: string; code: string }) => {
  const response = await api.post("auth/verifyUser", data);
  return response.data;
};
export const resetPasswordEmailApi = async (data: { email: string }) => {
  const response = await api.post("auth/sendOTP", data);
  return response.data;
};
export const updatePasswordApi = async (data: {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response = await api.post("auth/updatePassword", data);
  return response.data;
};
export const resetPasswordApi = async (data: {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response = await api.patch("auth/resetPassword", data);
  return response.data;
};

export const fetchUserDetailsApi = async () => {
  const response = await api.get("/auth/getOneUser");
  return response.data;
};

export const updateUserDetailsApi = async (data: {
  email: string;
  contactNumber: string;
  dateOfBirth: string;
}) => {
  try {
    const response = await api.patch("/auth/updateUser", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

export const updateAddressApi = async (addressId: string, data: any) => {
  const response = await api.patch(`/address/${addressId}`, data);
  return response.data;
};
export const createAddressApi = async (data: any) => {
  const response = await api.post(`/address`, data);
  return response.data;
};
export const deleteAddressApi = async (id: string) => {
  const response = await api.delete(`/address/${id}`);
  return response.data;
};


export const subscribeUserApi = async (data: any) => {
  const response = await api.post("/auth/updateSubscription", data);
  return response.data;
};
