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
        <title>
          Arabica Latina - Best Quality Shawls, Scarves, and Outerwear
          Collection
        </title>
        <meta
          name="description"
          content="Discover luxurious shawls, scarves, and outerwear crafted with authentic Latin American designs."
        />
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
      // image: "/Images/PORTADA2.webp",//testing
      image: "/Images/variant2.svg",
      url: "/collections/men",
    },
    {
      label: "Shop Jewelry",
      image:
        "https://mymediadata.s3.us-east-2.amazonaws.com/uploads/763b8246-7744-4ee1-a360-926540379380-susan-wilkinson-9dDJk8lvUwg-unsplash%20(1).jpg",
      // "https://res.cloudinary.com/dgbjpy7ev/image/upload/v1743079698/extra/variant3_xuhdup.svg",
      // image: "/Images/PORTADA3.webp",
      // image: "/Images/variant3.svg",
      url: "/collections/jewelry",
    },
  ];

  return {
    props: { categories },
  };
}
