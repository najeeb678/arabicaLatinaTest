import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  Stack,
  Link,
} from "@mui/material";

interface WalletSectionProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

const WalletSection: React.FC<WalletSectionProps> = ({
  setActiveSection,
  activeSection,
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontFamily: "GaretHeavy",
            color: "#3C3837",
            fontSize: "22px",
          }}
        >
          My Wallet
        </Typography>
        {activeSection === "My account" && (
          <Button
            variant="text"
            sx={{ color: "#5B4635", textTransform: "none" }}
            onClick={() => setActiveSection("My wallet")}
          >
            View
          </Button>
        )}
      </Box>
      {activeSection === "My account" && <Divider sx={{ marginY: "8px" }} />}
      {activeSection === "My account" && (
        <>
          <Typography
            sx={{
              color: "#2E2B2A",
              fontSize: "14px",
              marginTop: "25px",
            }}
          >
            Credit Cards
          </Typography>
          <Button
            sx={{
              color: "#2E2B2A",
              textDecoration: "underline",
              textTransform: "none",
              marginLeft: "-5px",
              marginTop: "10px",
            }}
          >
            Add new
          </Button>
        </>
      )}
      {activeSection !== "My account" && (
        <>
          <Typography
            sx={{
              marginTop: "50px",
              fontSize: "14px",
              color: "#2E2B2A",
              letterSpacing: "2%",
            }}
          >
            No saved payment instruments
          </Typography>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "0px ",
              border: "1px solid #3C3837",
              width: "12%",
              color: "#A44819",
              height: "40px",
              marginTop: "40px",
            }}
          >
            Add New
          </Button>

          <Box
            onClick={() => {
              setActiveSection("My account");
            }}
            sx={{
              marginTop: "50px",
              color: "#3C3837",
              textDecorationColor: "#3C3837",
              textDecorationThickness: "1px",
              textUnderlineOffset: "2px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Back to my account
          </Box>
        </>
      )}
    </Box>
  );
};

export default WalletSection;
