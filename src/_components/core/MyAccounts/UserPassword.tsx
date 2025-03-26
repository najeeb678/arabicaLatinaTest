import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import PasswordPage from "@/_components/core/Password/PasswordPage";


interface UserPasswordProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

const UserPassword: React.FC<UserPasswordProps> = ({
  setActiveSection,
  activeSection,
}) => {
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
        padding: "0px 10px",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4}>
        <Grid
          size={{ xs: 12, md: 6.5 }}
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
            Edit your password
          </Typography>
          <PasswordPage />
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPassword;
