import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";

import CardSlider from "@/_components/common/CardSlider";
import {
  fetchScarfsProducts,
  fetchShawlsProducts,
} from "@/redux/slices/productSlice";

const MenShawlProductsCards = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    productData: { shawls },
    loading: { shawls: isShawlsLoading },
  } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    const Shawlparams = {
      categoryName: "Shawl",
      type: "MEN",
    };

    dispatch(fetchShawlsProducts(Shawlparams)).unwrap();
  }, [dispatch]);

  const items = shawls?.map((product: any, index) => {
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
        categoryName="Scarf"
        title="Crafted For Comfort and Versatility"
        titleStyle={{ fontSize: "26px", lineHeight: "50px", color: "#A44819" }}
        loading={isShawlsLoading}
        // onSeeMore={() => router.push("/collections/scarfs")}
      />
    </>
  );
};

export default MenShawlProductsCards;
