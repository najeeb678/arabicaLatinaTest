import React, { useState, useEffect, useMemo } from "react";
import ProductPage from "@/_components/core/Products/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchScarfProductsColors,
  fetchScarfsProducts,
} from "@/redux/slices/productSlice";

import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box } from "@mui/material";
import MenProductsCards from "@/_components/core/MenShopping/MenProductsCards";
import ElevateScarfStyles from "@/_components/core/ElevateStyles/ElevateScarfStyles";
import ElevateSchawlStyles from "@/_components/core/ElevateStyles/ElevateSchawlStyles";

const ScarvesMainPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const router = useRouter();
  const [type, setType] = useState<string | null>(null);
  const [isFlagProcessed, setIsFlagProcessed] = useState(false);
  const [selectedSort, setSelectedSort] = useState<any>("");
  const dispatch: AppDispatch = useDispatch();
  const {
    productData: { scarves },
    colorsData: { scarves: scarvesColors },
    loading: { scarves: isScarvesLoading },
    errors: { scarves: scarvesError },
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
        categoryName: "Scarf",
        ...(type && { type }), // Only add type if it is set
        ...Object.entries(selectedFilters).reduce((acc, [key, value]) => {
          acc[key?.toLowerCase()] = value.join(",");
          return acc;
        }, {} as Record<string, string>),
        sortOrder: selectedSort,
      };

      const colorParams = {
        categoryName: "Scarf",
      };

      dispatch(fetchScarfProductsColors(colorParams)).unwrap();
      dispatch(fetchScarfsProducts(params)).unwrap();
    }
  }, [selectedFilters, dispatch, type, isFlagProcessed, selectedSort]);
  const handleSelectChange = (value: string) => {
    setSelectedSort(value); // Update the selected sort option
  };
  const filtersData = useMemo(
    () => [
      {
        label: "Color",
        options: scarvesColors?.regular || [],
      },
      {
        label: "Duotone",
        options: scarvesColors?.duotone || [],
      },
      {
        label: "Style",
        options: scarvesColors?.style || [],
      },
    ],
    [scarvesColors]
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

  return (
    <>
      <Head>
        <title>
          Scarves Collection Men Women| Elegant & Handcrafted Scarves - Arabica
          Latina
        </title>
        <meta
          name="description"
          content="Explore our exquisite collection of handcrafted scarves, including alpaca and artisanal designs. Discover unique styles with international delivery."
        />
        <meta
          name="keywords"
          content="scarves, handmade scarves, alpaca scarves, elegant shawls, fashion accessories, Latin American scarves"
        />
        <meta
          property="og:title"
          content="Scarves Collection | Elegant & Handcrafted Scarves - Arabica Latina"
        />
        <meta
          property="og:description"
          content="Discover a premium collection of handcrafted scarves and shawls with authentic Latin American designs."
        />
        <meta
          property="og:image"
          content="https://www.arabicalatina.com/Images/classicscarf.svg"
        />
        <meta
          property="og:url"
          content="https://www.arabicalatina.com/collections/scarfs"
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.arabicalatina.com/collections/scarfs"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Scarves Collection",
            description:
              "Explore our exquisite collection of handcrafted scarves, including alpaca and artisanal designs. Discover unique styles with international delivery.",
            image: "https://www.arabicalatina.com/Images/classicscarf.svg",
            url: "https://www.arabicalatina.com/collections/scarfs",
            brand: {
              "@type": "Brand",
              name: "Arabica Latina",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.arabicalatina.com/collections/scarfs",
            },
            inLanguage: "en",
          })}
        </script>
      </Head>

      <ProductPage
        heading={"Scarfs"}
        products={scarves}
        filters={filtersData}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isFullWidth={isFullWidth}
        categoryName={"scarfs"}
        loading={isScarvesLoading}
        selectedSort={selectedSort}
        onSortChange={handleSelectChange}
      />
      <Box sx={{ width: "85%", margin: "auto", gap: "20px" ,marginTop:"10%"}}>
        <ElevateSchawlStyles />
      </Box>
    </>
  );
};

export default ScarvesMainPage;
