import React, { useState, useEffect, useMemo } from "react";
import ProductPage from "@/_components/core/Products/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlanketsProductsColors,
  fetchBlanketsProducts,
} from "@/redux/slices/productSlice";

import { AppDispatch, RootState } from "@/redux/store";
import Head from "next/head";
import ElevateSchawlStyles from "@/_components/core/ElevateStyles/ElevateSchawlStyles";
import { Box } from "@mui/material";
import ShawlCollection from "@/_components/core/LandingPage/ShawlCollection";

const BlanketsMainPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const dispatch: AppDispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState<any>("");
  const {
    productData: { blankets },
    colorsData: { blankets: blanketsColors },
    loading: { blankets: isBlanketsLoading },
    errors: { blankets: blanketsError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      categoryName: "Blanket",
      ...Object.entries(selectedFilters).reduce((acc, [key, value]) => {
        acc[key?.toLowerCase()] = value.join(",");
        return acc;
      }, {} as Record<string, string>),
      sortOrder: selectedSort,
    };

    const colorParams = {
      categoryName: "Blanket",
      duotone: false,
    };

    dispatch(fetchBlanketsProductsColors(colorParams)).unwrap(),
      dispatch(fetchBlanketsProducts(params)).unwrap();
  }, [selectedFilters, dispatch, selectedSort]);

  const filtersData = useMemo(
    () => [
      {
        label: "Color",
        options: blanketsColors?.regular || [],
      },
      {
        label: "Duotone",
        options: blanketsColors?.duotone || [],
      },
      {
        label: "Style",
        options: ["Classic", "Modern", "Casual", "Bloucle", "Undyed", "Chunky"],
      },
    ],
    [blanketsColors]
  );

  const handleFilterChange = (
    filterCategory: string,
    selectedOptions: string[]
  ) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterCategory]: selectedOptions,
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  const isFullWidth = (label: string) => {
    return label === "Duotone" || label === "Style";
  };
  const handleSelectChange = (value: string) => {
    setSelectedSort(value);
  };

  return (
    <>
      <Head>
        {/* SEO Optimized Title */}
        <title>
          Premium Blankets Collection | Luxurious, Sustainable & Stylish
        </title>

        {/* Meta Description - High Ranking for SEO */}
        <meta
          name="description"
          content="Discover Arabic Latina’s premium collection of handcrafted blankets made from sustainable, eco-friendly materials. Choose from elegant designs, soft textures, and warm winter essentials for ultimate comfort. Perfect for home decor and cozy nights."
        />

        {/* SEO Keywords */}
        <meta
          name="keywords"
          content="luxury blankets, eco-friendly blankets, sustainable home textiles, organic cotton throws, soft wool blankets, premium cozy throws, stylish home decor, warm winter blankets, high-quality bedding, handcrafted blankets, hypoallergenic bedding, elegant home comfort, best sustainable blankets, ethically sourced bedding, designer home accessories, warm fleece throws, boho style blankets, cashmere wool throws, durable and soft bedding, exclusive handmade blankets"
        />

        {/* Robots Tag for SEO */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph (OG) Metadata for Facebook & Social Media */}
        <meta
          property="og:title"
          content="Premium Blankets Collection | Luxurious, Sustainable & Stylish"
        />
        <meta
          property="og:description"
          content="Shop premium handcrafted blankets at Arabic Latina. Made from eco-friendly materials, our blankets offer warmth, style, and sustainability."
        />
        <meta
          property="og:image"
          content="https://www.arabiclatina.com/Images/Capa.svg"
        />
        <meta
          property="og:url"
          content="https://www.arabiclatina.com/collections/blankets"
        />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Arabic Latina" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Premium Blankets Collection | Arabic Latina"
        />
        <meta
          name="twitter:description"
          content="Explore Arabic Latina's luxury blanket collection. Sustainable, soft, and stylish blankets for cozy winter nights and home decor."
        />
        <meta
          name="twitter:image"
          content="https://www.arabiclatina.com/Images/Capa.svg"
        />
        <meta name="twitter:site" content="@ArabicLatina" />

        {/* JSON-LD Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Premium Blanket Collection",
            brand: {
              "@type": "Brand",
              name: "Arabic Latina",
            },
            description:
              "Explore our premium handcrafted blankets made from sustainable, eco-friendly materials. Soft, stylish, and perfect for cozy nights and home decor.",
            image: "https://www.arabiclatina.com/Images/Capa.svg",
            url: "https://www.arabiclatina.com/collections/blankets",
            offers: {
              "@type": "Offer",
              priceCurrency: "SAR",
              price: "79.99",
              availability: "https://schema.org/InStock",
              url: "https://www.arabiclatina.com/collections/blankets",
            },
          })}
        </script>
      </Head>

      <ProductPage
        heading={"Blankets"}
        products={blankets}
        filters={filtersData}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isFullWidth={isFullWidth}
        categoryName={"blanket"}
        loading={isBlanketsLoading}
        selectedSort={selectedSort}
        onSortChange={handleSelectChange}
      />
      <Box sx={{ width: "85%", margin: "auto", gap: "20px", marginTop: "10%" }}>
        <ElevateSchawlStyles title={"Find Softness And Warmth In Every Thread"} />
      </Box>
    </>
  );
};

export default BlanketsMainPage;
