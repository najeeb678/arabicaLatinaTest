import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

const MainBanner = () => {
  const isBelow400 = useMediaQuery("(max-width:400px)");
  const isBelow500 = useMediaQuery("(max-width:500px)");
  const isBelow700 = useMediaQuery("(max-width:700px)");
  const isBelow800 = useMediaQuery("(max-width:800px)");
  const isBelow900 = useMediaQuery("(max-width:900px)");
  const isBelow1000 = useMediaQuery("(max-width:1000px)");
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        marginTop: isBelow900 ? "-15px" : "0px",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}

      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "17 / 6.5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/Images/BannerMen.png"
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </Box>

      {/* Text Box */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: "5%", md: isBelow1000 ? "8%" : "12%" },
          transform: "translateY(-50%)",
          padding: { xs: "10px", sm: "20px" },
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: isBelow400 ? "15px" : isBelow500 ? "20px" : "25px",
              sm: isBelow700 ? "25px" : isBelow800 ? "35px" : "40px",
              md: "45px",
            },
            color: "rgba(139, 69, 19, 0.5)",
          }}
        >
          Inspired by Nature,
        </Typography>
        <Typography
          sx={{
            fontFamily: "GaretHeavy",
            fontSize: {
              xs: isBelow400 ? "15px" : isBelow500 ? "20px" : "25px",
              sm: isBelow700 ? "25px" : isBelow800 ? "35px" : "40px",
              md: "45px",
            },
            color: "#A44819",
            marginLeft: {
              xs: isBelow400 ? "5px" : isBelow500 ? "10px" : "10px",
              sm: isBelow700 ? "20px" : isBelow800 ? "40px" : "50px",
              md: "50px",
            },
          }}
        >
          Designed for Him
        </Typography>
      </Box>
    </Box>
  );
};

export default MainBanner;
