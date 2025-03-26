import React from "react";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

interface BreadcrumbProps {
  categoryName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categoryName }) => {
  const router = useRouter();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatSegment = (segment: string) => {
    return segment
      .split("-") // Split by hyphen
      .map((word) => capitalize(word)) // Capitalize each word
      .join(" "); // Join back with space
  };

  const generateBreadcrumb = () => {
    const currentPath = router.pathname.split("/").filter(Boolean);

    // If categoryName is provided, use it; otherwise, use the last segment of the path
    const lastSegment =
      categoryName ||
      (currentPath.length > 0 ? currentPath[currentPath.length - 1] : "");

    return ["Home", formatSegment(lastSegment)];
  };

  const breadcrumb = generateBreadcrumb();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.3rem",
      }}
    >
      <Typography sx={{ fontSize: "14px", color: "#868282" }}>
        {breadcrumb[0]} /{" "}
        {breadcrumb.length > 1 && (
          <Typography
            component="span"
            sx={{ fontFamily: "poppins", fontWeight: "400", color: "#3E3F20" }}
          >
            {breadcrumb[1]}
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

export default Breadcrumb;
