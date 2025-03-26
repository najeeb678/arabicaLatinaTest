import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { RootState } from "@/redux/store";

import CustomTypography from "@/_components/common/CustomTypography";
import CardSlider from "@/_components/common/CardSlider";
import { useRouter } from "next/router";

const WomenShawlCollection = () => {
  const router = useRouter();

  const {
    productData: { shawls },
    loading: { shawls: isShawlsLoading },
  } = useSelector((state: RootState) => state.products);
  const items = shawls?.map((product: any, index) => {
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
           categoryName="Shawl"
        title="A Touch of Grace"
        loading={isShawlsLoading}
        onSeeMore={() => {
          router.push("/collections/shawls");
        }}
      />
    </>
  );
};

export default WomenShawlCollection;
