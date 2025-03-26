import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import ProductPage from "@/_components/core/Products/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDynamicCategoryProducts,
  fetchDynamicCategoryProductsColors,
} from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import blankets from "../blankets";
import Head from "next/head";
import ElevateScarfStyles from "@/_components/core/ElevateStyles/ElevateScarfStyles";
import { Box } from "@mui/material";

const CategoryPage = () => {
  const router = useRouter();
  const { categoryName } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const [productData, setProductData] = useState<any>([]);
  const [colorsData, setColorsData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [selectedSort, setSelectedSort] = useState<any>("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  //   console.log("productData....", productData);
  //   console.log("colorsData....", colorsData);
  useEffect(() => {
    setLoading(true);
    const dynamicCategory = Array.isArray(categoryName)
      ? categoryName.join(",") // Convert array to a string
      : categoryName ?? ""; // Ensure it's at least an empty string

    if (!dynamicCategory) return; // Prevent API calls if categoryName is empty

    const params = {
      categoryName: dynamicCategory, // Now it's always a string
      ...Object.entries(selectedFilters).reduce((acc, [key, value]) => {
        acc[key?.toLowerCase()] = value.join(",");
        return acc;
      }, {} as Record<string, string>),
      sortOrder: selectedSort,
    };

    const colorParams = {
      categoryName: dynamicCategory, // Ensure it's a string
      duotone: false,
    };

    dispatch(fetchDynamicCategoryProductsColors(colorParams))
      .unwrap()
      .then((data) => {
        setColorsData(data);
      })
      .finally(() => {
        setLoading(false);
      });

    dispatch(fetchDynamicCategoryProducts(params))
      .unwrap()
      .then((data) => {
        setProductData(data);
      });
  }, [selectedFilters, categoryName, dispatch, selectedSort]);

  const filtersData = useMemo(
    () => [
      { label: "Color", options: colorsData?.colors?.regular || [] },
      { label: "Duotone", options: colorsData?.colors?.duotone || [] },
      {
        label: "Style",
        options: ["Classic", "Modern", "Casual", "Bloucle", "Undyed", "Chunky"],
      },
    ],
    [colorsData]
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
  const handleSelectChange = (value: string) => {
    setSelectedSort(value);
  };
  const isFullWidth = (label: string) =>
    label === "Duotone" || label === "Style";

  const metaTitle = `${
    categoryName ? `${categoryName} Products` : "Category"
  } | My Store`;
  const metaDescription = categoryName
    ? `Explore our premium ${categoryName} collection. Find the perfect style, color, and design for your needs.`
    : "Discover our wide range of products";
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="keywords"
          content={`${categoryName},women shopping,men shopping,scarf,shawls, home decor, premium materials, ${categoryName} collection`}
        />
      </Head>
      <ProductPage
        heading={categoryName as string}
        products={productData || []}
        filters={filtersData || []}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isFullWidth={isFullWidth}
        loading={loading || false}
        categoryName={categoryName as string}
        selectedSort={selectedSort}
        onSortChange={handleSelectChange}
      />
      <Box
        sx={{
          width: "85%",
          margin: "auto",
          gap: "20px",
          marginTop: "10%",
        }}
      >
        <ElevateScarfStyles />
      </Box>
    </>
  );
};

export default CategoryPage;
