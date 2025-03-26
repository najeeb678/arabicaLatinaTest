import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/redux/store";

import CardSlider from "@/_components/common/CardSlider";
import { fetchScarfsProducts } from "@/redux/slices/productSlice";

const MenProductsCards = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const Scarfparams = {
      categoryName: "Scarf",
      type: "MEN",
    };

    dispatch(fetchScarfsProducts(Scarfparams)).unwrap();
  }, [dispatch]);
  const {
    productData: { scarves },

    loading: { scarves: isScarvesLoading },
    errors: { scarves: scarvesError },
  } = useSelector((state: RootState) => state.products);

  const items = scarves?.map((product: any, index) => {
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
        title="Distinctive Quality You Can Feel"
        titleStyle={{ fontSize: "26px", lineHeight: "50px", color: "#A44819" }}
        loading={isScarvesLoading}
        // onSeeMore={() => router.push("/collections/scarfs")}
      />
    </>
  );
};

export default MenProductsCards;
