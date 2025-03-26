import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MyAccountSidebarLinks from "@/_components/core/MyAccounts/MyAccountSidebarLinks";

const Preferances = () => {
  const [isClient, setIsClient] = useState(false);
  const [preferences, setPreferences] = useState({
    email: true,
    sms: true,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ padding: "0px 10px", minHeight: "100vh" }}>
      <Grid container spacing={4}>
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
            Communication Preferences
          </Typography>
          <Typography
            sx={{
              marginTop: "50px",
              fontSize: "14px",
              color: "#2E2B2A",
              letterSpacing: "2%",
            }}
          >
            Subscribe to be the first with our new arrivals, exclusive
            collections, offers and more.
          </Typography>

          <Typography
            sx={{
              marginTop: "30px",
              fontSize: "14px",
              color: "#2E2B2A",
              letterSpacing: "2%",
            }}
          >
            Subscribe to Ounass newsletters
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.email}
                  onChange={handleChange}
                  name="email"
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#2E2B2A",
                    },
                  }}
                />
              }
              label="Email"
              sx={{ color: "#2E2B2A" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.sms}
                  onChange={handleChange}
                  name="sms"
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#2E2B2A", // Checked color
                    },
                  }}
                />
              }
              label="SMS"
              sx={{ color: "#2E2B2A" }}
            />
          </Box>

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
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Preferances;
