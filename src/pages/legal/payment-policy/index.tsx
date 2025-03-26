import CustomTypography from "@/_components/common/CustomTypography";
import BreadCrumb from "@/_components/core/BreadCrumb/BreadCrumb";
import PaymentPolicyPart from "@/_components/core/PaymentPolicyPart/PaymentPolicyPart";
import PolicySidebar from "@/_components/core/PolicySideBar/PolicySideBar";
import PrivacyPolicyPart from "@/_components/core/PrivacyPolicy/PrivacyPolicy";
import Shipping from "@/_components/core/Shipping/Shipping";
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Head from "next/head";
import router from "next/router";
import React from "react";

const policies = [
  { label: "Payment policy", path: "/legal/payment-policy" },
  { label: "Shipping policy", path: "/legal/shipping-policy" },
  { label: "Shipping and delivery", path: "/legal/shipping-and-delivery" },
  { label: "All sales are final", path: "/legal/all-sales-are-final" },
  { label: "Privacy policy", path: "/legal/privacy-policy" },
];
const PaymentPolicy = () => {
  return (
    <>
    <Head>
      <title>Payment Policy - Ecommerce Arabica Latina</title>
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
          Payment policy
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3.5 }} component="div">
            <PolicySidebar policies={policies} />
          </Grid>

          <Grid size={{ xs: 12, md: 8.5 }} component="div">
            <Grid sx={{ marginRight: "25px" }}>
              <PaymentPolicyPart />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default PaymentPolicy;
