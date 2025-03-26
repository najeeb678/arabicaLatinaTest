import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import {

  fetchMasbahaProducts,
} from "@/redux/slices/productSlice";
import CustomTypography from "@/_components/common/CustomTypography";
import CardSlider from "@/_components/common/CardSlider";
import { useRouter } from "next/router";

const NatureCollection = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const {
    productData: { masbaha },
    loading: { masbaha: isMasbahaLoading },
    errors: { masbaha: masbahaError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      categoryName: "Masbaha",
    };
    dispatch(fetchMasbahaProducts(params)).unwrap();
  }, [dispatch]);

  const items = masbaha.map((product: any, index) => {
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
      categoryName="Masbaha"
        title="Authentic Natural Stone: Mabaha Collection"
        loading={isMasbahaLoading}
        onSeeMore={() => router.push("/collections/masbaha")}
      />
    </>
  );
};

export default NatureCollection;
