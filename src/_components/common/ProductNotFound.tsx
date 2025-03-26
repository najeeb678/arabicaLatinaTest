import { Box, Typography, Button } from "@mui/material";
import router from "next/router";
import React from "react";

const ProductNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#F8F5F3",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#BA9775",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        Item Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#868282",
          marginBottom: 4,
        }}
      >
        We couldn't find the item you're looking for. It might have been removed
        or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#BA9775",
          color: "#fff",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#8B6D56",
          },
        }}
        onClick={() => router.push("/")}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default ProductNotFound;
