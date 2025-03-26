import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MyAccountSidebarLinks from "@/_components/core/MyAccounts/MyAccountSidebarLinks";
import ProfileSection from "@/_components/core/MyAccounts/ProfileSection";
import WalletSection from "@/_components/core/MyAccounts/WalletSection";
import AccountPage from "@/_components/core/MyAccounts/ProfileSection";
import PasswordPage from "@/_components/core/Password/PasswordPage";
import MyOrdersPage from "@/_components/core/MyOrders/MyOrdersPage";

const MyOrders = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ padding: "0px 10px", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        <Grid
          size={{ xs: 12, md: 12 }}
          component="div"
          sx={{ marginLeft: "15px" }}
        >
          <Typography
            sx={{
              marginBottom: "20px",
              fontSize: "22px",
              color: "#3C3837",
              letterSpacing: "4%",
              fontFamily: "GaretHeavy",
            }}
          >
            My orders
          </Typography>
          <MyOrdersPage />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyOrders;
