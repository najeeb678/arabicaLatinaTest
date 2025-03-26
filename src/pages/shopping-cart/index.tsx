import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import WomenScarfslCollection from "@/_components/core/WomenShopping/WomenScarfslCollection";

import Shopping from "@/_components/core/Shopping/Shopping";
import BreadCrumb from "@/_components/core/BreadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllCartItems } from "@/redux/slices/orderSlice";
import Head from "next/head";
import ElevateSchawlStyles from "@/_components/core/ElevateStyles/ElevateSchawlStyles";
const Index = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { cartItems, cartItemsLoading } = useSelector(
    (state: RootState) => state.order
  );
  // console.log("cartItems11",cartItems)
  useEffect(() => {
    dispatch(fetchAllCartItems()).unwrap();
  }, [dispatch]);

  return (
    <>
      <Head>
        <title> Payment Details - Ecommerce Arabica Latina</title>
      </Head>
      <Box
        sx={{ padding: { xs: "20px 20px", sm: "20px 30px", md: "20px 50px" } }}
      >
        <Box sx={{ marginTop: "50px" }}>
          <BreadCrumb />
        </Box>

        <Box sx={{ marginBottom: "150px" }}>
          <Shopping cartItems={cartItems} loading={cartItemsLoading} />
        </Box>

        <Box
          sx={{ width: "85%", margin: "auto", gap: "20px", marginTop: "10%" }}
        >
           <ElevateSchawlStyles title={"You May Also Like"} />
        </Box>
      </Box>
    </>
  );
};

export default Index;
