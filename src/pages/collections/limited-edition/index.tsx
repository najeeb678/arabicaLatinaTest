import React, { useState, useEffect, useMemo } from "react";
import ProductPage from "@/_components/core/Products/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJewelryProducts,
  fetchJewelryProductsColors,
  fetchlimitedEditionProducts,
  fetchlimitedEditionProductsColors,
} from "@/redux/slices/productSlice";

import { AppDispatch, RootState } from "@/redux/store";
import Head from "next/head";
const JewlryMainPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [selectedSort, setSelectedSort] = useState<any>("");
  const dispatch: AppDispatch = useDispatch();
  const {
    productData: { limitedEdition },
    colorsData: { limitedEdition: limitedEditionColors },
    loading: { limitedEdition: islimitedEditionLoading },
    errors: { limitedEdition: limitedEditionError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      limitedEdition: true,
      ...Object.entries(selectedFilters).reduce((acc, [key, value]) => {
        acc[key?.toLowerCase()] = value.join(",");
        return acc;
      }, {} as Record<string, string>),
      sortOrder: selectedSort,
    };

    const colorParams = {
      categoryName: "LimitedEdition",
    };

    dispatch(fetchlimitedEditionProductsColors(colorParams)).unwrap(),
      dispatch(fetchlimitedEditionProducts(params)).unwrap();
  }, [selectedFilters, dispatch, selectedSort]);

  const filtersData = useMemo(
    () => [
      {
        label: "Color",
        options: limitedEditionColors?.regular || [],
      },
      {
        label: "Duotone",
        options: limitedEditionColors?.duotone || [],
      },
      {
        label: "Style",
        options: limitedEditionColors?.style || [],
      },
    ],
    [limitedEditionColors]
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
    <title>Exclusive Limited Edition Collection | Arabica Latina</title>
    
    {/* Search Engine Description */}
    <meta 
      name="description" 
      content="Discover rare, limited quantity artisan pieces from our exclusive collection. Handcrafted with premium materials - only a few remaining items available worldwide." 
    />

    {/* Open Graph/Facebook */}
    <meta 
      property="og:title" 
      content="Last Chance: Limited Edition Artisan Collection" 
    />
    <meta 
      property="og:description" 
      content="Own a piece of exclusive craftsmanship. Limited stock available of these unique, never-to-be-repeated designs from Latin America's finest artisans." 
    />
    <meta 
      property="og:image" 
      content="https://www.arabiclatina.com/Iamages/JEWELRY.svg" 
    />

    {/* Twitter Card */}
    <meta 
      name="twitter:title" 
      content="⚠️ Limited Stock Alert: Exclusive Designs" 
    />
    <meta 
      name="twitter:image" 
      content="https://www.arabiclatina.com/collections/limited-edition" 
    />

    {/* Canonical URL */}
    <link 
      rel="canonical" 
      href="https://www.arabiclatina.com/collections/limited-edition" 
    />

    {/* Schema Markup */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Limited Edition Collection",
        "description": "Exclusive limited quantity artisan pieces",
        "image": "https://www.arabiclatina.com/Images/limited-edition-schema.jpg",
        "url": "https://www.arabiclatina.com/collections/limited-edition",
        "brand": {
          "@type": "Brand",
          "name": "Arabica Latina"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/LimitedAvailability",
          "priceCurrency": "SAR"
        }
      })}
    </script>

    {/* Keywords for SEO */}
    <meta 
      name="keywords" 
      content="limited edition, exclusive collection, artisan craftsmanship, rare designs, premium materials, last chance offers" 
    />
  </Head>

      <ProductPage
        heading={"Exclusive Limited Edition Collection"}
        products={limitedEdition}
        filters={filtersData}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isFullWidth={isFullWidth}
        categoryName={"limitedEdition"}
        loading={islimitedEditionLoading}
        ProductDescriptionText={"Only a few pieces available!"}
        selectedSort={selectedSort}
        onSortChange={handleSelectChange}
      />
    </>
  );
};

export default JewlryMainPage;
