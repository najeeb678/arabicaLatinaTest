import { Box, Typography } from "@mui/material";
import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useRouter } from "next/router";

const PerfectDuoCard = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "auto",
        backgroundColor: "#94624a",
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: { xs: "none", md: "block" },
          top: 0,
          left: 0,
          width: "250px",
          height: "150px",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <img src="/Images/texture.svg" alt="" height="100%" width="100%" />
      </Box>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          padding: { xs: "20px", md: "0" },
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            fontSize: { xs: "16px", md: "18px", lg: "20px" },

            marginLeft: { xs: "0%", md: "20%" },
            maxWidth: { xs: "50%", md: "50%" },
            // textTransform: "uppercase",
            fontFamily: "poppins",
            fontWeight: "500",
          }}
        >
          Find the perfect duo: a necklace that dazzles and bracelets that
          complete your look.
        </Typography>
      </Box>

      <Typography
        sx={{
          position: "relative",
          fontSize: "25px",
          color: "#fff",
          fontFamily: "Poppins",
          fontWeight: "bold",
          cursor: "pointer",
          textDecoration: "underline",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginTop: { xs: "0", md: "10px" },
          "&:hover": { color: "#a44819" },
        }}
        onClick={() => router.push("/collections/jewelry")}
      >
        Shop Now <ArrowRightAltIcon sx={{ fontSize: "28px" }} />
      </Typography>
    </Box>
  );
};

export default PerfectDuoCard;
