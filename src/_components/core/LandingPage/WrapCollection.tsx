import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchScarfsProducts } from "@/redux/slices/productSlice";
import CustomTypography from "@/_components/common/CustomTypography";
import CardSlider from "@/_components/common/CardSlider";

const WrapCollection = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    productData: { scarves },
    loading: { scarves: isScarvesLoading },
    errors: { scarves: scarvesError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      categoryName: "Scarf",
    };
    dispatch(fetchScarfsProducts(params)).unwrap();
  }, [dispatch]);

  const items = scarves.map((product: any, index) => {
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
        categoryName="Scarf"
        title="Wrap yourself in Softness"
        loading={isScarvesLoading}
      />
    </>
  );
};

export default WrapCollection;
