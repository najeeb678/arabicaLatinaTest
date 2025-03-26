import React from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import CustomTypography from "@/_components/common/CustomTypography";

const Index = () => {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const chestMeasurements = [
    "81 - 85 cm",
    "86 - 90 cm",
    "92 - 95 cm",
    "97 - 102 cm",
    "105 - 112 cm",
  ];

  const waistMeasurements = [
    "64 - 66 cm",
    "68 - 71 cm",
    "73 - 76 cm",
    "78 - 84 cm",
    "87 - 95 cm",
  ];

  const hipMeasurements = [
    "89 - 91 cm",
    "93 - 96 cm",
    "98 - 102 cm",
    "104 - 108 cm",
    "110 - 118 cm",
  ];
  return (
    <Box sx={{ margin: { xs: "0px 20px", md: "0px 50px", lg: "0px 100px" } }}>
      <Box sx={{ height: "40px", marginTop: "40px" }}>
        <CustomTypography
          sx={{
            fontFamily: "GaretBook",
            fontWeight: 300,
            fontSize: { xs: "12px", md: "14px" },
            color: "#3E3F20",
          }}
        >
          Home /&nbsp;&nbsp;
          <CustomTypography
            component="span"
            sx={{
              fontFamily: "GaretBook",
              fontWeight: 600,
              fontSize: { xs: "12px", md: "14px", lg: "16px" },
              color: "#3E3F20",
            }}
          >
            Size guide
          </CustomTypography>
        </CustomTypography>
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
          backgroundColor: "#E2CBA280",
        }}
      >
        <CustomTypography
          sx={{
            fontFamily: "GaretBook",
            fontSize: { xs: "16px", md: "20px", lg: "22px" },
            fontWeight: 600,
            lineHeight: "50px",
            color: "#3E3F20",
            display: "flex",
            alignItems: "center",
            paddingLeft: { xs: "10px", md: "25px" },
          }}
        >
          Size guide: Find Your Perfect Fit
        </CustomTypography>
      </Box>
      <CustomTypography
        sx={{
          fontFamily: "GaretBook",
          fontSize: { xs: "14px", md: "16px", lg: "18px" },
          fontWeight: 600,
          lineHeight: "20px",
          color: "#3E3F20",
          letterSpacing: "0.06em",
          marginTop: "32px",
          height: { xs: "auto", md: "54px" },
          display: "flex",
          alignItems: "center",
        }}
      >
        Please consider the following recommendations
      </CustomTypography>

      {/* Grid container for text and image */}
      <Grid
        container
        spacing={0}
        sx={{
          marginBottom: "101px",
          alignItems: "flex-start",
        }}
      >
        {/* Left side: List and Table */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Unordered List */}
          <Box component="ul" sx={{ padding: 0, margin: 0, listStyle: "none" }}>
            {[
              "Measure over your underwear.",
              "Keep the tape measure level and snug, but not tight.",
              "For best accuracy, have someone assist you with the measurements.",
            ].map((text, index) => (
              <CustomTypography
                key={index}
                component="li"
                sx={{
                  fontFamily: "GaretBook",
                  fontSize: { xs: "12px", md: "13px", lg: "14px" },
                  fontWeight: 300,
                  lineHeight: "25px",
                  color: "#000000",
                  letterSpacing: "0.02em",
                  marginTop: index === 0 ? "31px" : "0px",
                  display: "flex",
                  alignItems: "center",
                  "&::before": {
                    content: '"•"',
                    marginRight: "8px",
                    fontWeight: "bold",
                  },
                }}
              >
                {text}
              </CustomTypography>
            ))}
          </Box>
          {/* Ordered List */}
          <Box
            component="ol"
            sx={{
              padding: 0,
              margin: 0,
              listStyle: "none",
              counterReset: "list",
            }}
          >
            {[
              "Chest: Measure around the fullest part of the chest, just under the armpits and across the shoulder blades.",
              "Waist: Wrap the tape around your natural waistline, ensuring it sits comfortably without being too tight.",
              "Hip: With your heels together, measure around the widest part of your hips.",
            ].map((text, index) => (
              <CustomTypography
                key={index}
                component="li"
                sx={{
                  fontFamily: "GaretBook",
                  fontSize: { xs: "12px", md: "13px", lg: "14px" },
                  fontWeight: 300,
                  lineHeight: "25px",
                  color: "#000000",
                  letterSpacing: "0.02em",
                  marginTop: index === 0 ? "31px" : "0px",
                  display: "flex",
                  alignItems: "center",
                  counterIncrement: "list",
                  "&::before": {
                    content: 'counter(list) "."',
                    marginRight: "8px",
                  },
                }}
              >
                {text}
              </CustomTypography>
            ))}
          </Box>

          {/* Table */}
          <Box sx={{ maxWidth: "100%", overflowX: "auto", marginTop: "41px" }}>
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid #C48E70",
                backgroundColor: "transparent",
                borderRadius: "0px !important",
                minWidth: "750px",
              }}
            >
              <Table
                sx={{
                  borderCollapse: "collapse",
                  width: "100%",
                  minWidth: "750px",
                }}
                aria-label="responsive table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#3E3F20",
                        border: "1px solid #C48E70",
                        height: "20px !important",
                      }}
                    />
                    {sizes.map((size, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          fontFamily: "GaretBook",
                          fontWeight: 300,
                          fontSize: "14px",
                          color: "#000000",
                          textAlign: "center",
                          border: "1px solid #C48E70",
                        }}
                      >
                        {size}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {["CHEST", "WAIST", "HIP"].map((bodyPart, index) => {
                    let measurements: (
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined
                    )[];
                    // Assign the correct measurement array to each body part
                    if (bodyPart === "CHEST") measurements = chestMeasurements;
                    if (bodyPart === "WAIST") measurements = waistMeasurements;
                    if (bodyPart === "HIP") measurements = hipMeasurements;

                    return (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            fontFamily: "GaretHeavy",
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "#6A6461",
                            paddingLeft: { xs: "1%", md: "2%" },
                            textAlign: "left",
                            border: "1px solid #C48E70",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{ color: "#A44819", marginRight: "10px" }}
                          >
                            {index + 1}.
                          </span>{" "}
                          {bodyPart}
                        </TableCell>

                        {/* Map through sizes and measurements for each body part */}
                        {sizes.map((size, idx) => (
                          <TableCell
                            key={idx}
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              textAlign: "center",
                              border: "1px solid #C48E70",
                            }}
                          >
                            {measurements[idx]}{" "}
                            {/* Display the correct measurement for each size */}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Right side: Image */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
            }}
          >
            <Image
              src={"/Images/SizeGuide.svg"}
              alt="Size Guide"
              width={400}
              height={500}
              loading="lazy"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
