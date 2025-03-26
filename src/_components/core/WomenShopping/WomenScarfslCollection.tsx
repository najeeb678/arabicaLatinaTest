import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { RootState } from "@/redux/store";

import CustomTypography from "@/_components/common/CustomTypography";
import CardSlider from "@/_components/common/CardSlider";
import { useRouter } from "next/router";

interface WomenScarfslCollectionProps {
  title: string;
  onSeeMore?: () => void;
}

const WomenScarfslCollection: React.FC<WomenScarfslCollectionProps> = ({
  title,
  onSeeMore,
}) => {
  const router = useRouter();

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
      productDetails: product
    };
  });



  return (
    <>
      <CardSlider
        items={items}
      categoryName="Scarf"
        title={title}
        loading={isScarvesLoading}
        onSeeMore={() => router.push("/collections/scarfs")}
      />
    </>
  );
};

export default WomenScarfslCollection;
