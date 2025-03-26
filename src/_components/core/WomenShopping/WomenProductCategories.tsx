import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/router";

const categories = [
  {
    title: "SHAWLS",
    subtitle: "Timeless Warmth",
    image: "/Images/BrocadeShawl.png",
    url: "/collections/shawls",
  },
  {
    title: "SCARFS",
    subtitle: "Pure Comfort",
    image: "/Images/PlaidSateenshawl.png",
    url: "/collections/scarfs",
  },
  {
    title: "JEWELRY",
    subtitle: "Unique as You",
    image: "/Images/JEWELRYCategory.png",
    url: "/collections/jewelry",
  },
];

const WomenProductCategories = () => {
  const router = useRouter();
  return (
    <Box sx={{ width: "85%", margin: "auto", padding: "10px 0" }}>
      <Grid container spacing={1}>
        {categories.map((category, index) => (
          <Grid component="div" size={{ xs: 12, sm: 4, md: 4 }} key={index}>
            <Box
              onClick={() => {
                router.push({
                  pathname: category.url,
                  query: { flag: "true" },
                });
              }}
              sx={{
                position: "relative",
                height: "390px",
                display: "flex",
                alignItems: "bottom",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {/* Background Image */}
              <Box
                component="img"
                src={category.image}
                alt={category.title}
                sx={{
                  width: "90%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                }}
              />
              {/* Text Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  textAlign: "center",
                  bottom: "10%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    lineHeight: "25px",
                    marginBottom: "-8px",
                    color:
                      index === 0
                        ? "#3E3F20"
                        : index === 2
                        ? "#FFFFFF"
                        : "#3C3837",
                  }}
                >
                  {category.subtitle}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "GaretHeavy",
                    fontSize: {
                      xs: "45px",
                      sm: "32px",
                      md: "35px",
                      lg: "45px",
                    },
                    lineHeight: "60px",
                    padding: "0 10px",
                    color: index === 0 ? "#C88F71" : "#FEF9F4",
                  }}
                >
                  {category.title}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WomenProductCategories;
