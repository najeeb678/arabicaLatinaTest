import React, { useState, useEffect, useMemo } from "react";
import ProductPage from "@/_components/core/Products/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOutWearProducts,
  fetchOutWearProductsColors,
} from "@/redux/slices/productSlice";

import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/router";
import Head from "next/head";
import ElevateScarfStyles from "@/_components/core/ElevateStyles/ElevateScarfStyles";
import ElevateSchawlStyles from "@/_components/core/ElevateStyles/ElevateSchawlStyles";
import { Box } from "@mui/material";

const OutWearMainPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [type, setType] = useState<string | null>(null);
  const [isFlagProcessed, setIsFlagProcessed] = useState(false);
  const [selectedSort, setSelectedSort] = useState<any>("");
  const {
    productData: { outWear },
    colorsData: { outWear: outWearColors },
    loading: { outWear: isoutWearLoading },
    errors: { outWear: outWearError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (router.query.flag === "true") {
      setType("WOMEN");
    } else {
      setType(null);
    }
    setIsFlagProcessed(true);
  }, [router.query.flag]);

  useEffect(() => {
    if (isFlagProcessed) {
      const params = {
        categoryName: "outWear",
        ...(type && { type }), // Only add type if it is set
        ...Object.entries(selectedFilters).reduce((acc, [key, value]) => {
          acc[key?.toLowerCase()] = value.join(",");
          return acc;
        }, {} as Record<string, string>),
        sortOrder: selectedSort,
      };

      const colorParams = {
        categoryName: "outWear",
      };

      dispatch(fetchOutWearProductsColors(colorParams)).unwrap(),
        dispatch(fetchOutWearProducts(params)).unwrap();
    }
  }, [selectedFilters, dispatch, type, isFlagProcessed, selectedSort]);

  const filtersData = useMemo(
    () => [
      {
        label: "Color",
        options: outWearColors?.regular || [],
      },
      {
        label: "Duotone",
        options: outWearColors?.duotone || [],
      },
      {
        label: "Style",
        options: ["Classic", "Modern", "Casual", "Bloucle", "Undyed", "Chunky"],
      },
    ],
    [outWearColors]
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
        <title> Elegant OutWear For Men Women - Arabica Latina</title>
        <meta
          name="description"
          content="Explore our exclusive women's collection, including luxurious shawls, comfortable scarfs, and unique jewelry. Authentic Latin American craftsmanship with worldwide shipping."
        />
        <meta
          name="keywords"
          content="shawls, scarfs, jewelry, women’s fashion, alpaca wool, handmade accessories, Latin American designs"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Women’s Fashion | Shawls, Scarfs & Jewelry - Arabica Latina"
        />
        <meta
          property="og:description"
          content="Luxurious shawls, scarfs, and jewelry with authentic Latin American craftsmanship."
        />
        <meta
          property="og:image"
          content="https://www.arabiclatina.com/Images/BrocadeShawl.png"
        />
        <meta
          property="og:url"
          content="https://www.arabiclatina.com/collections/women"
        />
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Women’s Fashion Collection",
            description:
              "Explore luxurious shawls, scarfs, and jewelry crafted with authentic Latin American designs.",
            image: "https://www.arabiclatina.com/Images/BrocadeShawl.png",
            url: "https://www.arabiclatina.com/collections/women",
            brand: {
              "@type": "Brand",
              name: "Arabica Latina",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.arabiclatina.com/collections/women",
            },
            inLanguage: "en",
          })}
        </script>
      </Head>
      <ProductPage
        heading={"OutWear"}
        products={outWear}
        filters={filtersData}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isFullWidth={isFullWidth}
        categoryName={"OutWear"}
        loading={isoutWearLoading}
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

export default OutWearMainPage;
