import React, { ReactNode } from "react";
import { Button, ButtonProps, SxProps } from "@mui/material";

type CustomButtonProps = {
  text: string;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  textColor?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  variant?: "contained" | "outlined" | "text"; // Material-UI button variants
  sx?: SxProps;
} & ButtonProps;

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  width = "auto",
  height = "auto",
  backgroundColor = "#1976d2",
  textColor = "#fff",
  leadingIcon,
  trailingIcon,
  variant = "contained",
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        width: width || "150px",
        height: height || "50px",
        backgroundColor:
          variant === "contained" ? backgroundColor : "transparent",
        color: textColor,
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1.5,
        fontFamily: "Poppins, sans-serif",
        fontSize: "11px",
        fontWeight: "bold",
        letterSpacing: "1%",
        border:
          variant === "outlined" ? `2px solid ${backgroundColor}` : "none",
        "&:hover": {
          backgroundColor:
            variant === "contained" ? backgroundColor : "transparent",
          opacity: 0.9,
        },
        ...sx,
      }}
      {...props}
    >
      {leadingIcon && <span style={{ marginRight: "8px" }}>{leadingIcon}</span>}
      {text}
      {trailingIcon && (
        <span style={{ marginLeft: "2px" }}>{trailingIcon}</span>
      )}
    </Button>
  );
};

export default CustomButton;
