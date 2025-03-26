import React from "react";
import { Box } from "@mui/material";

const PaymentIcons = () => {
  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <img
        src="/Images/apple pay.svg"
        alt="Apple Pay"
        style={{ maxWidth: "150px" }}
      />
      <img
        src="/Images/mastercard.svg"
        alt="MasterCard"
        style={{ maxWidth: "150px" }}
      />
      <img src="/Images/visa.svg" alt="Visa" style={{ maxWidth: "150px" }} />
    </Box>
  );
};

export default PaymentIcons;
