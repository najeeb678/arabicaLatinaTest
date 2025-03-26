import { Box, Typography } from "@mui/material";
import Link from "next/link";

const typographyStyles = {
  color: "#2E2B2A",
  fontSize: "14px",
  fontFamily: "GaretBook",
  lineHeight: "25px",
  letterSpacing: "-0.015em",
  marginTop: "0px",
};

const DeliveryAddressCard = ({ shippingInfo, setActiveStep }: any) => {
  return (
    <Box
      sx={{
        border: "1px solid #A09A97",

        padding: "16px 25px",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%", // Adjust as needed
      }}
    >
      {/* Header */}
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
          Delivery Address
        </Typography>
        <Box
          onClick={() => setActiveStep(0)}
          style={{
            fontSize: "14px",
            color: "#6A6461",
            fontFamily: "GaretBook",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          EDIT
        </Box>
      </Box>

      {/* Address Content */}
      <Typography sx={typographyStyles}>
        {shippingInfo.firstName} {shippingInfo.lastName}
      </Typography>
      <Typography sx={typographyStyles}>
        {shippingInfo.phoneCode} {shippingInfo.phoneNumber}
      </Typography>
      <Typography sx={typographyStyles}>{shippingInfo.address}</Typography>
      <Typography sx={typographyStyles}>{shippingInfo.area}</Typography>
      <Typography sx={typographyStyles}>{shippingInfo.city}</Typography>
      <Typography sx={typographyStyles}>{shippingInfo.apartment}</Typography>
      <Typography sx={typographyStyles}>Saudi Arabia</Typography>
    </Box>
  );
};
export default DeliveryAddressCard;
