import React from "react";
import { Button, Box, Typography } from "@mui/material";

const CustomButtonWithText = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: { xs: "70vw", md: "550px"}, backgroundColor: "#f0e2cb", borderRadius: "0", padding: "10px 14px", border: "1px solid #868282", height: '40px !important' }}>
      <Typography
        sx={{
          fontSize: {xs: '10px', md: '14px'},
          fontWeight: "bold",
      
          color: "#2E2B2A", 
          fontFamily: "GaretBook",
        }}
      >
        How can we reach out to you
      </Typography>
      <Typography
        sx={{
          fontSize: {xs: '10px', md: '14px'},
          fontWeight: 300,
          
          opacity: 0.5,
          fontFamily: "GaretBook",
        }}
      >
        * Required fields
      </Typography>
    </Box>
  );
};

export default CustomButtonWithText;
