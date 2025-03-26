import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchJewelryProducts } from "@/redux/slices/productSlice";
import CustomTypography from "@/_components/common/CustomTypography";
import CardSlider from "@/_components/common/CardSlider";
import { useRouter } from "next/router";

const ExclusiveJewelryCollection = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const {
    productData: { jewelry },
    loading: { jewelry: isJewelryLoading },
    errors: { jewelry: jewelryError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      categoryName: "Jewelry",
    };
    dispatch(fetchJewelryProducts(params)).unwrap();
  }, [dispatch]);

  const items = jewelry.map((product: any, index) => {
    const defaultVariant = product?.Variants[0];
    return {
      id: index,
      imageUrl: defaultVariant?.attachment,
      name: product.name,
      price: `SAR${product.basePrice.toFixed(2)}`,
      colors: product.totalColors,
      productDetails: product
    };
  });



  return (
    <>
      <CardSlider
        items={items}
         categoryName="Jewelry"
        title="Don’t miss it: Exclusive Bracelets, Necklaces and Earrings"
        loading={isJewelryLoading}
        onSeeMore={() => {
          router.push("/collections/jewelry");
        }}
      />
    </>
  );
};

export default ExclusiveJewelryCollection;
