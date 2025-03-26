// LoaderComponent.tsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderComponentProps {
  height?: string;
  circleSize?: number;
  style?: React.CSSProperties;
}

const CustomLoader: React.FC<LoaderComponentProps> = ({
  height = "75vh",
  circleSize = 60,
  style = {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: height,
        height: height,

        ...style,
      }}
    >
      <CircularProgress size={circleSize} sx={{ color: "#A44819" }} />
    </Box>
  );
};

export default CustomLoader;
