import React from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomTypography from "@/_components/common/CustomTypography";
import { useRouter } from "next/router";
import Image from "next/image";
const HeroSectionCategories = ({categories}:any) => {
  const router = useRouter();
  const isBelow900 = useMediaQuery("(max-width:900px)");
  const isBelow600 = useMediaQuery("(max-width:600px)");
  const objectFit = isBelow600 ? "cover" : isBelow900 ? "contain" : "cover";
  const fallbackCategories = [
    { label: "Shop Women", image: "/Images/variant1.svg", url: "/collections/women" },
    { label: "Shop Men", image: "/Images/variant2.svg", url: "/collections/men" },
    { label: "Shop Jewelry", image: "/Images/variant3.svg", url: "/collections/jewelry" },
  ];

  const finalCategories = categories?.length ? categories : fallbackCategories;

  return (
    <Grid
      container
      flexDirection={"row"}
      spacing={2}
      size={{ xs: 12 }}
      sx={{ marginTop: "20px" }}
    >
      {finalCategories?.map((category: any, index: number) => (
        <Grid
          size={{ xs: 12, md: 4 }}
          component="div"
          key={index}
          sx={{
            height: { xs: "950px", md: "900px" },
            position: "relative",
            overflow: "hidden",
            "&:hover img": {
              transform: "scale(1.15) translateY(30px)",
            },
            "& img": {
              transition: "transform 0.5s ease-in-out",
            },
          }}
        >
          <Image
            src={category.image}
            alt={category.label}
            fill
            style={{
              objectFit: objectFit,
              position: "absolute",
            }}
            priority
          />
          <Button
            variant="contained"
            onClick={() => router.push(category.url)}
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "50%",
              width: "150px",
              height: "35px",
              borderRadius: "0px",
              backgroundColor: "rgba(195, 142, 113, 0.6)",
              border: "1px solid #fff",
              color: "#fff",

              padding: "5px 5px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#A44819",
              },
            }}
          >
            <CustomTypography
              sx={{
                fontSize: "14px",

                color: "inherit",
                lineHeight: "auto",
                fontFamily: "GaretBook",
              }}
            >
              {category.label}
            </CustomTypography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default HeroSectionCategories;
