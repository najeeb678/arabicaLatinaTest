import FoodsProperties from "@/_components/core/Food/FoodsProperties";
import MainBanner from "@/_components/core/Food/MainBanner";
import OrganicSpreads from "@/_components/core/Food/OrganicSpreads";
import {
  fetchOrganicProducts,
  fetchScarfsProducts,
} from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import Head from "next/head";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const index = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const params = {
      categoryName: "Food",
    };

    dispatch(fetchOrganicProducts(params)).unwrap();
  }, [dispatch]);
  return (
  <> <Head>
  {/* SEO Optimized Title */}
  <title>Outstanding Food Arabia: Discover Authentic & Delicious Flavors</title>

  {/* Enhanced SEO Meta Description */}
  <meta 
    name="description" 
    content="Explore the best Food Arabia collection. Authentic flavors, premium quality ingredients, and traditional recipes that bring the taste of Arabia to your home. Shop now for exclusive gourmet delights!" 
  />

  {/* SEO Keywords */}
  <meta 
    name="keywords" 
    content="Food Arabia, Arabic cuisine, premium Arabic food, gourmet Middle Eastern food, traditional Arabian recipes, authentic Arabic flavors, high-quality Middle Eastern ingredients, best Arabic food online, Middle Eastern delicacies, halal food products, Arabic food collection, buy Arabic food online, fresh Arabian spices, exotic Middle Eastern dishes, traditional Arabic sweets, premium gourmet food, best Arabic market, Middle Eastern grocery online, organic Arabic food"
  />

  {/* Robots Tag for SEO */}
  <meta name="robots" content="index, follow" />

  {/* Open Graph (OG) Metadata for Facebook & Social Media */}
  <meta property="og:title" content="Outstanding Food Arabia: Authentic Flavors & Gourmet Delights" />
  <meta property="og:description" content="Discover authentic Arabic food and traditional flavors. Shop premium Middle Eastern ingredients, gourmet delights, and halal food online. Order now!" />
  <meta property="og:image" content="https://www.arabiclatina.com/Images/NUTS.svg" />
  <meta property="og:url" content="https://www.arabiclatina.com/collection/Food" />
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="Arabic Latina" />
  <meta property="og:locale" content="en_US" />

  {/* Twitter Card Metadata */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Discover Authentic Food Arabia - Premium & Traditional Flavors" />
  <meta name="twitter:description" content="Shop the best Food Arabia collection with authentic flavors and premium-quality ingredients. Experience Middle Eastern cuisine like never before!" />
  <meta name="twitter:image" content="https://www.arabiclatina.com/Images/NUTS.svg" />
  <meta name="twitter:site" content="@ArabicLatina" />

  {/* JSON-LD Structured Data for SEO */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Food Arabia Collection",
      "brand": {
        "@type": "Brand",
        "name": "Arabic Latina"
      },
      "description": "Discover the best Food Arabia collection with authentic flavors, premium-quality ingredients, and traditional Middle Eastern recipes.",
      "image": "https://www.arabiclatina.com/Images/NUTS.svg",
      "url": "https://www.arabiclatina.com/collection/Food",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "SAR",
        "price": "19.99",
        "availability": "https://schema.org/InStock",
        "url": "https://www.arabiclatina.com/collection/Food"
      }
    })}
  </script>
</Head>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginBottom: "50px",

      }}
    >
      <MainBanner />
      <OrganicSpreads categoryName={"Food"} />
      <FoodsProperties />
    </Box></>
  );
};

export default index;
