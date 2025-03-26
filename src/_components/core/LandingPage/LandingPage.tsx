import React from "react";
import HeroSectionCategories from "./HeroSection/HeroSectionCategories";
import FeaturedCardsSection from "./FeaturedCardsSection";
import { Box, Button, Typography } from "@mui/material";
import WrapCollection from "./WrapCollection";
import CustomTypography from "@/_components/common/CustomTypography";
import CollectionShowcase from "./CollectionShowcase";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styles from "./landingPage.module.css";
import ShawlCollection from "./ShawlCollection";
import ExclusiveJewelryCollection from "./ExclusiveJewelryCollection";
import NatureCollection from "./NatureCollection";
import CozyComfortsCollection from "./CozyComfortsCollection";
import PerfectDuoCard from "./PerfectDuoCard";

const LandingPage = ({ categories }: any) => {

  return (
    <>
      <Box className={styles.landingContainer}>
        <Box className={styles.heroSectionContainer}>
          <HeroSectionCategories categories={categories} />
        </Box>
        <FeaturedCardsSection />
        <Box className={styles.wrapCollectionContainer}>
          <WrapCollection />
        </Box>

        <PerfectDuoCard />

        <CollectionShowcase />
        <Box className={styles.wrapCollectionContainer}>
          <ShawlCollection />
        </Box>
        <CozyComfortsCollection />
        <Box className={styles.wrapCollectionContainer}>
          <ExclusiveJewelryCollection />
        </Box>
        <Box className={styles.wrapCollectionContainer}>
          <NatureCollection />
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
