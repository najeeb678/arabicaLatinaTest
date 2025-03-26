import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CustomTypography from "./CustomTypography";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface CustomPhoneFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: boolean;
  helperText?: string | boolean;
  placeholder?: string;
  fullWidth?: boolean;
  width?: object;
  defaultCountryCode?: string;
  noBorderRadius?: boolean;
  inputfieldHeight?: string;
  sx?: object;
}

const CustomPhoneField: React.FC<CustomPhoneFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder = "",
  fullWidth = false,
  width = { xs: "100%" },
  defaultCountryCode = "+966",
  noBorderRadius = false,
  inputfieldHeight = "40px",
  sx = {},
}) => {
  const [countryCode, setCountryCode] = useState<string>(defaultCountryCode);

  useEffect(() => {
    setCountryCode(defaultCountryCode);
  }, [defaultCountryCode]);

  const handleCountryChange = (value: string, country: any) => {
    const formattedCode = `+${country.dialCode}`;
    setCountryCode(formattedCode);
    onChange(formattedCode); // Pass the updated code
  };

  return (
    <Box
      sx={{ marginBottom: "19px", width: fullWidth ? "100%" : width, ...sx }}
    >
      <CustomTypography
        sx={{
          fontFamily: "GaretBook",
          fontSize: "14px",
          fontWeight: 300,
          lineHeight: "40px",
          color: "#2E2B2A",
        }}
      >
        {label}
      </CustomTypography>

      {/* Country Code Selector */}
      <PhoneInput
        country={countryCode.slice(1)} // Extract country code without '+' for PhoneInput
        value={value}
        onChange={handleCountryChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disableCountryCode={false} // Keep country code visible
        disableDropdown={false} // Allow changing country
        enableSearch // Let user search countries
        inputStyle={{
          backgroundColor: "transparent",
          width: "100%",
          border: "1px solid #868282",
          borderRadius: noBorderRadius ? "0" : "5px",
          height: inputfieldHeight,
        }}
        containerStyle={{
          width: "100%",
          marginBottom: "8px",
        }}
      />
    </Box>
  );
};

export default CustomPhoneField;
