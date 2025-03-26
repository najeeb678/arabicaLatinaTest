import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import ProductPage from "@/_components/core/Products/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchProductsColors,
  fetchSearchProducts,
  resetSearchState,
} from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Head from "next/head";

const SearchProduct = () => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [selectedSort, setSelectedSort] = useState<any>("");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const { query } = router.query;
  const {
    productData: { searchProduct },
    colorsData: { searchProduct: searchProductColors },
    loading: { searchProduct: issearchProductLoading },
    errors: { searchProduct: searchProductError },
  } = useSelector((state: any) => state.products);
  useEffect(() => {
    dispatch(resetSearchState());
  }, [dispatch]);

  useEffect(() => {
    if (!query) return;
    const params = {
      query: String(query),
      ...Object.entries(selectedFilters).reduce((acc, [key, value]) => {
        acc[key?.toLowerCase()] = value.join(",");
        return acc;
      }, {} as Record<string, string>),
      sortOrder: selectedSort,
    };

    const colorParams = {
      categoryName: String(query),
      color: true,
    };

    dispatch(fetchSearchProductsColors(colorParams)).unwrap();
    dispatch(fetchSearchProducts(params)).unwrap();
  }, [selectedFilters, dispatch, selectedSort, query]);

  const filtersData = useMemo(
    () => [
      {
        label: "Color",
        options: searchProductColors?.regular || [],
      },
      {
        label: "Duotone",
        options: searchProductColors?.duotone || [],
      },
      {
        label: "Style",
        options: ["Classic", "Modern", "Casual", "Bloucle", "Undyed", "Chunky"],
      },
    ],
    [searchProductColors]
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
        <title>Search results for: "{query}"</title>
        <meta name="description" content="" />
      </Head>
      <ProductPage
        heading={`Search results for: "${query}"`}
        products={searchProduct}
        filters={filtersData}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isFullWidth={isFullWidth}
        categoryName={String(query)}
        loading={issearchProductLoading}
        selectedSort={selectedSort}
        onSortChange={handleSelectChange}
      />
    </>
  );
};

export default SearchProduct;
