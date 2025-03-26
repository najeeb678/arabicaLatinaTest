import { ReactNode } from "react";
import { Box } from "@mui/material";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Head from 'next/head'

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
  <>
  <Head>
  {/* Title with SEO Optimized Keywords */}
  <title>Arabica Latina - Premium Handcrafted Shawls, Scarves & Outerwear</title>
  
  {/* Meta Description - SEO High Ranking */}
  <meta 
    name="description" 
    content="Discover the finest collection of handcrafted alpaca wool scarves, Peruvian shawls, and luxury outerwear. Made with authentic Latin American craftsmanship, our fashion pieces offer unmatched warmth, elegance, and sustainability. Shop now for worldwide delivery!" 
  />

  {/* SEO Keywords */}
  <meta 
    name="keywords" 
    content="handmade alpaca scarves, Peruvian shawls, luxury fashion, Latin American clothing, bohemian winter wraps, eco-friendly outerwear, artisanal wool accessories, high-quality winter scarves, designer ponchos, Andean craftsmanship, ethically sourced fashion, premium handcrafted coats, South American textiles, warm and stylish wraps, authentic boho fashion, traditional wool garments, elegant winter fashion, sustainable clothing brand, handcrafted fashion, exclusive winter apparel"
  />

  {/* Robots Tag for SEO */}
  <meta name="robots" content="index, follow" />

  {/* Open Graph (OG) Metadata for Facebook & Other Social Platforms */}
  <meta property="og:title" content="Arabica Latina - Luxury Handcrafted Shawls & Scarves" />
  <meta property="og:description" content="Explore high-quality alpaca wool scarves, premium shawls, and artisanal outerwear inspired by Latin American designs. Perfect for every season. Shop now!" />
  <meta property="og:image" content="https://arabiclatina.com/Images/Capa.svg" />
  <meta property="og:url" content="https://www.arabiclatina.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Arabica Latina" />
  <meta property="og:locale" content="en_US" />

  {/* Twitter Card Metadata */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Arabica Latina - Premium Handcrafted Shawls & Scarves" />
  <meta name="twitter:description" content="Shop the best Peruvian alpaca scarves, bohemian shawls, and ethically crafted outerwear. Perfect for any season!" />
  <meta name="twitter:image" content="https://arabiclatina.com/Images/Capa.svg" />
  <meta name="twitter:site" content="@ArabicaLatina" />

  {/* JSON-LD Structured Data for SEO */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Arabica Latina",
      "url": "https://arabiclatina.com",
      "logo": "https://arabiclatina.com/logo.png",
      "description": "Premium handcrafted alpaca scarves, Peruvian shawls, and luxury outerwear inspired by Latin American craftsmanship.",
      "image": "https://arabiclatina.com/Images/Capa.svg",
      "sameAs": [
        "https://www.facebook.com/ArabicLatina",
        "https://www.instagram.com/ArabicLatina",
        "https://twitter.com/ArabicLatina"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "(01) 372 - 6060",
        "contactType": "customer service"
      }
    })}
  </script>
</Head>

    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ flex: 1 }}>{children}</Box>
      <ScrollToTop />
      <Footer />
    </Box>
    </>
  );
};

export default Layout;
