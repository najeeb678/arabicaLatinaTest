import React, { useState, useEffect, useMemo } from "react";
import ProductPage from "@/_components/core/Products/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJewelryProducts,
  fetchJewelryProductsColors,
} from "@/redux/slices/productSlice";

import { AppDispatch, RootState } from "@/redux/store";
import Head from "next/head";
import ElevateScarfStyles from "@/_components/core/ElevateStyles/ElevateScarfStyles";
import { Box } from "@mui/material";

const JewlryMainPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [selectedSort, setSelectedSort] = useState<any>("");
  const dispatch: AppDispatch = useDispatch();
  const {
    productData: { jewelry },
    colorsData: { jewelry: jewelryColors },
    loading: { jewelry: isJewelryLoading },
    errors: { jewelry: jewelryError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      categoryName: "Jewelry",
      ...Object.entries(selectedFilters).reduce((acc, [key, value]) => {
        acc[key?.toLowerCase()] = value.join(",");
        return acc;
      }, {} as Record<string, string>),
      sortOrder: selectedSort,
    };

    const colorParams = {
      categoryName: "Jewelry",
    };

    dispatch(fetchJewelryProductsColors(colorParams)).unwrap(),
      dispatch(fetchJewelryProducts(params)).unwrap();
  }, [selectedFilters, dispatch, selectedSort]);

  const filtersData = useMemo(
    () => [
      {
        label: "Color",
        options: jewelryColors?.regular || [],
      },
      {
        label: "Duotone",
        options: jewelryColors?.duotone || [],
      },
      {
        label: "Style",
        options: jewelryColors?.style || [],
      },
    ],
    [jewelryColors]
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
  // Metadata variables
  const pageTitle = "Handcrafted Artisan Jewelry Collection | Arabica Latina";
  const pageDescription =
    "Discover unique handcrafted jewelry pieces from Latin America. Explore our collection of sustainable, ethically-made necklaces, earrings, and bracelets featuring traditional craftsmanship.";
  const canonicalUrl = "https://www.arabiclatina.com/collections/jewelry";
  const schemaImage = "https://www.arabiclatina.com/Images/JEWELRY.svg";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="desc" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={pageDescription}
          key="ogdesc"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} key="ogurl" />
        <meta
          property="og:image"
          content="https://www.arabiclatina.com/Images/JEWELRY.svg"
          key="ogimage"
        />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} key="twtitle" />
        <meta
          name="twitter:description"
          content={pageDescription}
          key="twdesc"
        />
        <meta
          name="twitter:image"
          content="https://www.arabiclatina.com/Images/JEWELRY.svg"
          key="twimage"
        />

        {/* Canonical Link */}
        <link rel="canonical" href={canonicalUrl} key="canonical" />

        {/* Structured Data (Schema.org) */}
        <script type="application/ld+json" key="schema">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Artisan Jewelry Collection",
            description: pageDescription,
            image: schemaImage,
            url: canonicalUrl,
            brand: {
              "@type": "Brand",
              name: "Arabica Latina",
            },
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Necklaces",
                url: `${canonicalUrl}?category=necklaces`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Earrings",
                url: `${canonicalUrl}?category=earrings`,
              },
            ],
          })}
        </script>
      </Head>

      <ProductPage
        heading={"Jewelry"}
        products={jewelry}
        filters={filtersData}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isFullWidth={isFullWidth}
        categoryName={"Jewelry"}
        loading={isJewelryLoading}
        ProductDescriptionText={
          "ESPACIOS PARA LOS 30 PRODUCTOS, FALTAN LAS FOTOS"
        }
        selectedSort={selectedSort}
        onSortChange={handleSelectChange}
      />
      <Box sx={{ width: "85%", margin: "auto", gap: "20px", marginTop: "10%" }}>
        <ElevateScarfStyles />
      </Box>
    </>
  );
};

export default JewlryMainPage;
