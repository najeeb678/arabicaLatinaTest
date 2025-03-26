import React, { useEffect, useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MyAccountSidebarLinks from "@/_components/core/MyAccounts/MyAccountSidebarLinks";

const Wallet = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: "40px 60px",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4}>
        {/* <Grid size={{ xs: 12, md: 2.5 }} component="div">
          <MyAccountSidebarLinks activePath="/wallet" />
        </Grid> */}

        <Grid
          size={{ xs: 12, md: 8 }}
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
            My Wallet
          </Typography>
    
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wallet;
