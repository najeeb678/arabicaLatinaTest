import QualityCertifications from "@/_components/core/Certificates/QualityCertifications";
import PerfectDuoCard from "@/_components/core/LandingPage/PerfectDuoCard";

import MainBanner from "@/_components/core/MenShopping/MainBanner";
import MenProductsCards from "@/_components/core/MenShopping/MenProductsCards";
import { fetchScarfsProducts } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import MenShawlProductsCards from "@/_components/core/MenShopping/MenShawlProductsCards";

const index = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const Scarfparams = {
      categoryName: "Scarf",
      type: "MEN",
    };

    dispatch(fetchScarfsProducts(Scarfparams)).unwrap();
  }, [dispatch]);
  // Metadata content
  const pageTitle = "Men's Luxury Scarfs Outwear Collection | Arabica Latina";
  const pageDescription =
    "Discover premium men's scarves crafted from sustainable materials. Explore our collection of modern, minimalist designs perfect for contemporary style. Worldwide shipping available.";
  const canonicalUrl = "https://www.arabiclatina.com/collections/men";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Head>
        {/* Primary SEO Metadata */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="men's scarves, luxury accessories, sustainable fashion, minimalist design, premium materials, arabica latina"
        />

        {/* Open Graph (OG) Metadata */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/variant2.svg" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/variant2.svg" />

        {/* Schema.org Metadata */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: pageTitle,
            description: pageDescription,
            image: "/variant2.svg",
            brand: {
              "@type": "Brand",
              name: "Arabica Latina",
            },
          })}
        </script>
      </Head>

      <MainBanner />
      <Box sx={{ width: "85%", margin: "auto", gap: "20px" }}>
        <MenProductsCards />
        <MenShawlProductsCards />
      </Box>
      <PerfectDuoCard />
      <QualityCertifications />
    </Box>
  );
};

export default index;
