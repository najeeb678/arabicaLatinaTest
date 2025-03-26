import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { RootState } from "@/redux/store";

import CustomTypography from "@/_components/common/CustomTypography";
import CardSlider from "@/_components/common/CardSlider";
import { useRouter } from "next/router";

const WomenOutWear = () => {
  const {
    productData: { outWear },
    loading: { shawls: isoutWearLoading },
  } = useSelector((state: RootState) => state.products);
  const items = outWear?.map((product: any, index) => {
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
          categoryName="OutWear"
        title="Outwear for any ocassion"
        loading={isoutWearLoading}
        // onSeeMore={() => {
        //   router.push("/collections/outwear");
        // }}
      />
    </>
  );
};

export default WomenOutWear;
