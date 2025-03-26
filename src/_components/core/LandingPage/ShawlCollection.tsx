import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchShawlsProducts } from "@/redux/slices/productSlice";
import CustomTypography from "@/_components/common/CustomTypography";
import CardSlider from "@/_components/common/CardSlider";

const ShawlCollection = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    productData: { shawls },
    loading: { shawls: isShawlsLoading },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      categoryName: "Shawl",
      // type: "WOMEN",//MEN
    };
    dispatch(fetchShawlsProducts(params)).unwrap();
  }, [dispatch]);

  const items = shawls.map((product: any, index) => {
    const defaultVariant = product?.Variants[0];
    return {
      id: index,
      imageUrl: defaultVariant?.attachment,
      name: product.name,
      price: `SAR${product.basePrice.toFixed(2)}`,
      colors: product.totalColors,
      productDetails: product,
    };
  });

  return (
    <>
      <CardSlider
        items={items}
        categoryName="Shawl"
        title="Find Softness And Warmth In Every Thread"
        loading={isShawlsLoading}
      />
    </>
  );
};

export default ShawlCollection;
