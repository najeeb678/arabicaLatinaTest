import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
export const getUserDetails = (): {
  token: string | null;
  name: string | null;
  address: string | null;
  email: string | null;
  contactNumber: string | null;
  profilePic: string | null;
  subscription: boolean | null;
} => {
  // Ensure this runs only in the browser
  if (typeof window === "undefined") {
    return {
      token: null,
      name: null,
      address: null,
      email: null,
      contactNumber: null,
      profilePic: null,
      subscription: null,
    };
  }

  const storedData = localStorage.getItem("userDetails");

  if (storedData) {
    return JSON.parse(storedData);
  }

  return {
    token: null,
    name: null,
    address: null,
    email: null,
    contactNumber: null,
    profilePic: null,
    subscription: null,
  };
};

// utils/auth.js
export const isLoggedIn = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token"); // Replace with your token key
    return !!token; // Returns true if token exists
  }
  return false;
};

export const getDecodedToken = (): any | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return jwtDecode<any>(token); // Specify the return type
      } catch (error) {
        console.error("Invalid token", error);
        return null;
      }
    }
  }
  return null;
};

export const getOrderData = (): {
  paymentMethod: string | null;
  discount: number | null;
  finalAmount: number | null;
} => {
  if (typeof window === "undefined") {
    return {
      paymentMethod: null,
      discount: null,
      finalAmount: null,
    };
  }

  const storedOrder = localStorage.getItem("orderCreationData");

  if (storedOrder) {
    try {
      // Decrypt the stored data
      const decryptedData = CryptoJS.AES.decrypt(
        storedOrder,
        "a3f5e2d89b47c8a2d3e6f7b5c9d1a4e8f2b7d6c3a8e4f9d0b6c1e7a5d2f8c3b1"
      ).toString(CryptoJS.enc.Utf8);

      // Parse the decrypted string as JSON
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("Error parsing order data:", error);
    }
  }

  return {
    paymentMethod: null,
    discount: null,
    finalAmount: null,
  };
};
