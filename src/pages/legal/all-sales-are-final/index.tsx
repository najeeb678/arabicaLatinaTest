import CustomTypography from "@/_components/common/CustomTypography";
import BreadCrumb from "@/_components/core/BreadCrumb/BreadCrumb";
import PolicySidebar from "@/_components/core/PolicySideBar/PolicySideBar";
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import router from "next/router";
import React from "react";
import Head from "next/head";
const policies = [
  { label: "Payment policy", path: "/legal/payment-policy" },
  { label: "Shipping policy", path: "/legal/shipping-policy" },
  { label: "Shipping and delivery", path: "/legal/shipping-and-delivery" },
  { label: "All sales are final", path: "/legal/all-sales-are-final" },
  { label: "Privacy policy", path: "/legal/privacy-policy" },
];
const AllSalesAreFinal = () => {
  
  return (
    <><Head>
          <title>All sales are final - Ecommerce Arabica Latina</title>
        </Head>
    <Box sx={{ padding: "20px 50px" }}>
      <Box sx={{ marginTop: "50px", marginLeft: "25px" }}>
        <BreadCrumb />
      </Box>
      <Box sx={{ marginTop: "50px" }}>
        <Typography
          sx={{
            fontSize: "25px",
            color: "#3E3F20",
            letterSpacing: "6%",
            marginLeft: "25px",
          }}
        >
          All sales are final
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3.5 }} component="div">
            <PolicySidebar policies={policies} />
          </Grid>

          <Grid size={{ xs: 12, md: 8.5 }} component="div">
            <Grid sx={{ marginRight: "25px" }}>
              <Typography
                sx={{
                  fontSize: "25px",
                  color: "#2E2B2A",
                  lineHeight: "50px",
                  cursor: "pointer",
                  marginTop: "60px",
                  letterSpacing: "2%",
                  marginRight: "20px",
                }}
              >
                All sales are final
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#2E2B2A",
                  lineHeight: "20px",
                  cursor: "pointer",
                  letterSpacing: "2%",
                  marginRight: "20px",
                }}
              >
                Please carefully review your order before confirming your
                purchase. 
                <br />
                All sales are considered final.
                <br />
                We do not offer refunds or exchanges for any products sold
                through Arabica Latina website.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default AllSalesAreFinal;
