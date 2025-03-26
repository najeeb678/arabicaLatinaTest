import React, { useState, useEffect, useMemo } from "react";
import ProductPage from "@/_components/core/Products/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMasbahaProducts,
  fetchMasbahaProductsColors,
} from "@/redux/slices/productSlice";

import { AppDispatch, RootState } from "@/redux/store";
import Head from "next/head";
import { Box } from "@mui/material";
import ElevateSchawlStyles from "@/_components/core/ElevateStyles/ElevateSchawlStyles";
const MasbahaMainPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
   const [selectedSort, setSelectedSort] = useState<any>("");
  const dispatch: AppDispatch = useDispatch();
  const {
    productData: { masbaha },
    colorsData: { masbaha: masbahaColors },
    loading: { masbaha: ismasbahaLoading },
    errors: { masbaha: masbahaError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      categoryName: "Masbaha",
      ...Object.entries(selectedFilters).reduce((acc, [key, value]) => {
        acc[key?.toLowerCase()] = value.join(",");
        return acc;
      }, {} as Record<string, string>),
      sortOrder: selectedSort,
    };

    const colorParams = {
      categoryName: "Masbaha",
    };

    dispatch(fetchMasbahaProductsColors(colorParams)).unwrap(),
      dispatch(fetchMasbahaProducts(params)).unwrap();
  }, [selectedFilters, dispatch,selectedSort]);

  const filtersData = useMemo(
    () => [
      {
        label: "Color",
        options: masbahaColors?.regular || [],
      },
      {
        label: "Duotone",
        options: masbahaColors?.duotone || [],
      },
      {
        label: "Style",
        options: masbahaColors?.style || [],
      },
    ],
    [masbahaColors]
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
    {/* Primary SEO Title */}
    <title>Authentic Handcrafted Masbaha Prayer Beads Collection | Arabica Latina</title>
    
    {/* Search Engine Description */}
    <meta 
      name="description" 
      content="Discover our exquisite collection of premium Masbaha prayer beads. Hand-carved from natural stones and precious materials, perfect for dhikr and spiritual connection. Worldwide shipping available." 
    />

    {/* Open Graph/Facebook */}
    <meta 
      property="og:title" 
      content="Premium Islamic Prayer Beads Collection - Handcrafted Masbaha" 
    />
    <meta 
      property="og:description" 
      content="Authentic 33/99 bead Masbaha sets crafted from agate, amber, and olive wood. Traditional Islamic craftsmanship meets modern design." 
    />
    <meta 
      property="og:image" 
      content="https://www.arabiclatina.com/Images/masbaha-og-image.jpg" 
    />

    {/* Twitter Card */}
    <meta 
      name="twitter:card" 
      content="summary_large_image" 
    />
    <meta 
      name="twitter:title" 
      content="✨ Traditional Masbaha Prayer Beads | Limited Stock" 
    />
    <meta 
      name="twitter:description" 
      content="Sacred Islamic prayer beads for mindful devotion. Hand-knotted with premium natural materials." 
    />
    <meta 
      name="twitter:image" 
      content="https://www.arabiclatina.com/Images/JEWELRY.svg" 
    />

    {/* Canonical URL */}
    <link 
      rel="canonical" 
      href="https://www.arabiclatina.com/collections/masbaha" 
    />

    {/* Schema Markup */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Islamic Prayer Beads Collection",
        "description": "Authentic handcrafted Masbaha for spiritual practice",
        "image": "https://www.arabiclatina.com/Images/bracelet.svg",
        "url": "https://www.arabiclatina.com/collections/masbaha",
        "brand": {
          "@type": "Brand",
          "name": "Arabica Latina"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.arabiclatina.com/collections/masbaha"
        }
      })}
    </script>

    {/* Keywords for SEO */}
    <meta 
      name="keywords" 
      content="islamic prayer beads, masbaha, dhikr beads, tasbih, muslim prayer tools, spiritual accessories, hand-knotted masbaha, 99 bead count" 
    />
  </Head>
      <ProductPage
         heading={"Masbaha"}
        products={masbaha}
        filters={filtersData}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isFullWidth={isFullWidth}
        categoryName={"masbaha"}
        loading={ismasbahaLoading}
        ProductDescriptionText={
          "ESPACIOS PARA LOS 30 PRODUCTOS, FALTAN LAS FOTOS"
        }
        selectedSort={selectedSort}
        onSortChange={handleSelectChange}
      />
       <Box sx={{ width: "85%", margin: "auto", gap: "20px", marginTop: "10%" }}>
        <ElevateSchawlStyles title={"A Touch of Grace"} />
      </Box>
    </>
  );
};

export default MasbahaMainPage;
