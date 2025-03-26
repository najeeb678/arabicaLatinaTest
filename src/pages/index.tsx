import Head from "next/head";
import { Box } from "@mui/material";
import LandingPage from "@/_components/core/LandingPage/LandingPage";
import { useEffect, useState } from "react";
import SubscribeModal from "@/_components/core/SubscribeModal/SubscribeModal";
import type { Metadata } from "next";



export default function Home({ categories }: any) {
  if (!categories) {
    console.warn("⚠️ categories is undefined in Home component!");
  }

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Arabica Latina - Best Quality Shawls, Scarves, and Outerwear Collection</title>
        <meta name="description" content="Discover luxurious shawls, scarves, and outerwear crafted with authentic Latin American designs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/Capa.svg" />
      </Head>
      <SubscribeModal />
      <Box width="100%">
        <LandingPage categories={categories} />
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const categories = [
    {
      label: "Shop Women",
      // image: "https://res.cloudinary.com/drascgtap/image/upload/v1742553107/BookingEngine/xcss6qvnplt4aqqhppai.png",
      //  image: "/Images/PORTADA1.webp",
      image: "/Images/variant1.svg",
      url: "/collections/women",
    },
    {
      label: "Shop Men",
      // image: "https://res.cloudinary.com/drascgtap/image/upload/v1742553015/BookingEngine/vsryhl20xf6cf9jravsj.png",
      // image: "/Images/PORTADA2.webp",
      image: "/Images/variant2.svg",
      url: "/collections/men",
    },
    {
      label: "Shop Jewelry",
      // image: "https://res.cloudinary.com/drascgtap/image/upload/v1742553044/BookingEngine/xgmxsqxoion1b1pdz8sm.png",
      // image: "/Images/PORTADA3.webp",
      image: "/Images/variant3.svg",
      url: "/collections/jewelry",
    },
  ];

  return {
    props: { categories },
  };
}
