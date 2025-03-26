import QualityCertifications from "@/_components/core/Certificates/QualityCertifications";
import PerfectDuoCard from "@/_components/core/LandingPage/PerfectDuoCard";
import Head from "next/head";
import MainBanner from "@/_components/core/WomenShopping/MainBanner";
import WomenOutWear from "@/_components/core/WomenShopping/WomenOutWear";
import WomenProductCategories from "@/_components/core/WomenShopping/WomenProductCategories";
import WomenScarfslCollection from "@/_components/core/WomenShopping/WomenScarfslCollection";
import WomenShawlCollection from "@/_components/core/WomenShopping/WomenShawlCollection";
import {
  fetchOutWearProducts,
  fetchScarfsProducts,
  fetchShawlsProducts,
} from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import { Box } from "@mui/material";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const index = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const Scarfparams = {
      categoryName: "Scarf",
      type: "WOMEN",
    };
    const Shawlparams = {
      categoryName: "Shawl",
      type: "WOMEN",
    };
    const OutWearparams = {
      categoryName: "OutWear",
      type: "WOMEN",
    };

    dispatch(fetchScarfsProducts(Scarfparams)).unwrap();
    dispatch(fetchShawlsProducts(Shawlparams)).unwrap();
    dispatch(fetchOutWearProducts(OutWearparams)).unwrap();
  }, [dispatch]);
    // Metadata content
    const pageTitle = "Women's Fashion | Scarves, Shawls, and Outerwear - Arabica Latina";
    const pageDescription = "Explore our premium collection of handcrafted alpaca scarves, luxurious shawls, and high-quality coats designed for elegance and warmth. Made with authentic Latin American craftsmanship, our women's fashion line blends tradition with contemporary style. Experience the softness of alpaca wool, the intricate artistry of handmade designs, and the sophistication of premium outerwear. Whether you're looking for a stylish winter accessory or a timeless fashion statement, our collection ensures durability, comfort, and exclusivity. Shop now and enjoy worldwide shipping, hassle-free returns, and exceptional customer service.";
    const canonicalUrl = "https://www.arabiclatina.com/collections/women";
    const keywords = [
      "Handmade alpaca scarves",
      "Luxury Peruvian shawls",
      "Authentic Latin American fashion",
      "Andean craftsmanship clothing",
      "Premium quality women's coats",
      "Ethically sourced wool scarves",
      "Bohemian style shawls",
      "Handwoven winter wraps",
      "Soft alpaca wool accessories",
      "Sustainable fashion outerwear",
      "Traditional Andean textiles",
      "Warm and stylish scarves for women",
      "Eco-friendly winter fashion",
      "Exclusive artisan-made shawls",
      "Best winter scarves for women",
      "Designer handmade coats",
      "Luxury boho fashion wraps",
      "Elegant ponchos and capes",
      "South American-inspired apparel",
      "Timeless handcrafted clothing"
    ].join(", ");
    return (
    <>  <Head>
    <title>{pageTitle}</title>
    
    <meta name="description" content={pageDescription} />
    <meta name="keywords" content={keywords} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    {/* Open Graph / Facebook */}
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta 
      property="og:image" 
      content="https://www.arabiclatina.com/Images/PlaidSateenshawl.png" 
    />
   
    <meta property="og:locale" content="es_LA" />

    {/* Twitter*/}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <meta 
      name="twitter:image" 
      content="https://www.arabiclatina.com/Images/BrocadeShawl.png " 
    />
    <meta name="twitter:site" content="@arabica_latina" />

    {/* Canonical */}
    <link rel="canonical" href={canonicalUrl} />

    {/* Schema Markup */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Colección Femenina",
        "description": pageDescription,
        "image": "https://www.arabiclatina.com/Images/BrocadeShawl.png ",
        "url": canonicalUrl,
        "brand": {
          "@type": "Brand",
          "name": "Arabica Latina"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "inLanguage": "en"
      })}
    </script>

  </Head>
  <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",

      }}
    >
      <MainBanner />
      <WomenProductCategories />
      <Box sx={{ width: "85%", margin: "auto", gap: "20px" }}>
        <WomenScarfslCollection title="Your Perfect Match" />
        <WomenShawlCollection />
        <WomenOutWear />
      </Box>

      <PerfectDuoCard />
      <QualityCertifications />
    </Box>
    </>
  
  );
};

export default index;
