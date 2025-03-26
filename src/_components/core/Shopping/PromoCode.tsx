import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { applyPromoCode } from "@/redux/slices/orderSlice";
import { error } from "console";

export default function PromoCode({ setPromoData, totalAmount }: any) {
  const dispatch: AppDispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code.");
      return;
    }

    setLoading(true);
    setMessage("");

    dispatch(
      applyPromoCode({
        promoCode,
        totalPrice: totalAmount,
      })
    )
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Promo code applied successfully!");
        setPromoData({
          discountAmount: res?.discountAmount || 0,
          finalPrice: res?.finalPrice || 0,
          message: res?.message || "Promo code applied successfully!",
        });
        setPromoCode("");
      })
      .catch((error) => {
        toast.error(error.message);

        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box sx={{ marginBottom: "16px" }}>
      <Typography
        sx={{
          fontFamily: "GaretHeavy",
          fontSize: "14px",
          fontWeight: "bold",
          marginBottom: "8px",
          color: "#6A6461",
          marginTop: "20px",
          letterSpacing: "2%",
        }}
      >
        Promo Code
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <TextField
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              height: "35px",
              borderRadius: "0px",
              border: "1px solid #C48E70",
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            font: "Garet",
            height: "35px",
            minWidth: "110px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#D9D9D980",
            color: "#6A6461",
            whiteSpace: "nowrap",
            boxShadow: "none",
            textTransform: "none",
            borderRadius: "0px",
            border: "1px solid #868282",
          }}
          onClick={handleApplyPromoCode}
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </Button>
      </Box>

      {message && (
        <Typography
          sx={{
            marginTop: "12px",
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}
