import React from "react";
import { Box, Typography, Link, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/router";
import { getOrderData } from "@/utils/utils";

const OrderSummary = ({ cartItems, orderDetailsForCardPayment }: any) => {
  const calculateSubtotal = () =>
    cartItems.reduce(
      (total: number, item: any) => total + item.variant.price * item.quantity,
      0
    );
  // const orderDataString = localStorage.getItem("orderCreationData");
  // const orderData = orderDataString ? JSON.parse(orderDataString) : null;
  const orderData = getOrderData();
  const subtotal = calculateSubtotal();

  return (
    <Box
      sx={{
        border: "1px solid #A09A97",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxHeight: "700px",
      }}
    >
      {/* Header (Fixed) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "GaretHeavy",
            fontWeight: "bold",
            color: "#C48E70",
            fontSize: "14px",
          }}
        >
          ORDER SUMMARY
          {/* : {cartItems.length} ITEMS */}
        </Typography>
        <Link
          href="/shopping-cart"
          style={{
            fontSize: "14px",
            color: "#6A6461",
            fontFamily: "GaretBook",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          EDIT
        </Link>
      </Box>

      {/* Scrollable Cart Items */}
      <Box
        sx={{
          overflowY: "auto",
          minHeight: "350px",
          maxHeight: "500px",
          paddingRight: "8px",
        }}
      >
        {cartItems.map((item: any) => (
          // <Grid container key={item.cartItemId} spacing={2} >
          <Grid
            container
            key={item.cartItemId}
            rowSpacing={4}
            columnSpacing={1}
          >
            {/* Image */}
            <Grid size={{ xs: 4.5 }}>
              <Avatar
                src={item.variant.attachment}
                alt={item.variant.product.name}
                variant="rounded"
                sx={{ width: "100%", height: "300px", marginBottom: "15px" }}
              />
            </Grid>

            {/* Item Details */}
            <Grid size={{ xs: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "GaretHeavy",
                    marginBottom: "16px",
                    marginTop: "20px",
                    color: "#3C3837",
                    fontSize: "12px",
                  }}
                >
                  {item.variant.product.name}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                  COLOR:{" "}
                  <span
                    style={{
                      fontFamily: "GaretHeavy",
                      fontSize: "12px",
                      color: "#3C3837",
                    }}
                  >
                    {item.variant.color}
                  </span>
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                  <strong>SIZE:</strong>
                  <span
                    style={{
                      fontFamily: "GaretHeavy",
                      fontSize: "12px",
                      color: "#3C3837",
                    }}
                  >
                    {item.variant.size}
                  </span>
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                  Qty:{" "}
                  <span
                    style={{
                      fontFamily: "GaretHeavy",
                      fontSize: "12px",
                      color: "#3C3837",
                    }}
                  >
                    {item.quantity}
                  </span>
                </Typography>
                {item.variant.stock < 100 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <AccessTimeIcon
                      sx={{
                        marginRight: "4px",
                        fontSize: "16px",
                        color: "#d73e3d",
                      }}
                    />
                    <Typography variant="body2" color="error">
                      Low in stock
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Price */}
            <Grid size={{ xs: 2.5 }} sx={{ textAlign: "right" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "60px" }}
              >
                SAR {item.variant.price.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>

      {/* Subtotal and Total (Fixed at the Bottom) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <Typography
          sx={{ color: "#444343", fontSize: "14px", lineHeight: "25px" }}
        >
          Subtotal
        </Typography>
        <Typography
          sx={{ color: "#A44819", fontSize: "12px", lineHeight: "50px" }}
        >
          SAR {subtotal.toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <Typography
          sx={{
            color: "#444343",
            fontSize: "14px",
            fontFamily: "GaretHeavy",
            lineHeight: "50px",
          }}
        >
          Grand Total
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "right" }}
        >
          VAT inclusive
        </Typography>
        <Typography
          sx={{
            color: "#444343",
            fontSize: "14px",
            fontFamily: "GaretHeavy",
            lineHeight: "50px",
          }}
        >
          SAR{" "}
          {orderData?.finalAmount !== null && orderData?.finalAmount > 0
            ? orderData.finalAmount
            : subtotal.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderSummary;
