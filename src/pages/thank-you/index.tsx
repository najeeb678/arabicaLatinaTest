// pages/thank-you.tsx

import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function ThankYouPage() {
  const router = useRouter();
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Thank You for Your Purchase!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          We appreciate your business. Your order has been placed successfully.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          You will receive an email confirmation shortly.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}
            sx={{
              backgroundColor: "#BA9775",
              "&:hover": { backgroundColor: "#A07F60" },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
