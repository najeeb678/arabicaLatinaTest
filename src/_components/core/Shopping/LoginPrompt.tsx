import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";

const LoginPrompt = ({ onClose = () => {} }: any) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "30px",
        background: "#fff",

        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "600",
          color: "#A44819",
          marginBottom: "10px",
        }}
      >
        You are not logged in
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          color: "#868282",
          marginBottom: "20px",
          lineHeight: 1.5,
        }}
      >
        Please log in to access this feature.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          router.push("/authentication/sign-in");
          onClose();
        }}
        sx={{
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "500",
          marginTop: "10px",
          height: "36px",
          padding: "10px 20px",
          backgroundColor: "#aa7537",
          color: "#fff",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#aa7537",
          },
        }}
      >
        Click here
      </Button>
    </Box>
  );
};

export default LoginPrompt;
