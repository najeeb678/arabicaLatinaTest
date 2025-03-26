import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

interface NoDataProps {
  message?: string;
  description?: string;
  navigationLink?: string;
  sx?: React.CSSProperties;
}

const NoDataAvailable = ({
  message = "No data available",
  description = "Please try again later or adjust your filters",
  navigationLink,
  sx,
}: NoDataProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
        width: "100%",
        marginLeft: "50%",
        transform: "translateX(-50%)",
        borderRadius: "8px",
        minHeight: "200px",
        height: "60vh",
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#a44819",
          marginBottom: "10px",
        }}
      >
        {message}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#868282",
          marginBottom: "20px",
        }}
      >
        {description}{" "}
        {navigationLink && (
          <Link
            href={navigationLink}
            style={{ color: "#a44819", textDecoration: "underline" }}
          >
            Click Here
          </Link>
        )}
      </Typography>
    </Box>
  );
};

export default NoDataAvailable;
