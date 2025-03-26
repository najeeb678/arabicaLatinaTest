import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Theme,
  SxProps,
} from "@mui/material";

type GenericInputProps = {
  label?: string;
  inputfieldHeight?: string;
  name?: string;
  value: string;
  onChange: (newValue: string) => void;
  type?: "text" | "number" | "date" | "time" | "email";
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  editIcon?: boolean;
  readonly?: boolean;
  multiLine?: boolean;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  labelStyle?: SxProps<Theme>;
  error?: boolean; // Add error prop
  helperText?: string; // Add helperText prop
  disabled?: boolean;
  noBorderRadius?: boolean;
  isPassword?: boolean;
};

const GenericInput: React.FC<GenericInputProps> = ({
  label,
  value,
  name,
  onChange,
  type = "text",
  onBlur,
  placeholder,
  readonly = false,
  editIcon = false,
  multiLine = false,
  icon,
  sx,
  labelStyle,
  inputfieldHeight,
  error, // Destructure error
  helperText, // Destructure helperText
  disabled = false,
  noBorderRadius,
  isPassword = false,
}) => {

  const [showPassword, setShowPassword] = useState(false);


  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (type === "number") {
      if (newValue === "") {
        onChange("");
        return;
      }

      const parsedValue = parseFloat(newValue);
      if (isNaN(parsedValue)) {
        return;
      }
      newValue = parsedValue.toString();
    }

    onChange(newValue);
  };
 //updating code for deployment
  return (
    <>
     
      <Typography
        sx={{
          marginTop: "10px",
          color: "#2E2B2A",
          fontSize: "14px",
          marginBottom: "5px",
          ...labelStyle,
        }}
      >
        {label}
      </Typography>
      <TextField
        id={label}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        value={value}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        variant="outlined"
        onBlur={onBlur}
        autoComplete="on"
        fullWidth
        placeholder={placeholder}
        multiline={multiLine}
        minRows={multiLine ? 4 : 1}
        InputProps={{
          readOnly: readonly,
          inputMode: type === "number" ? "numeric" : "text",
          endAdornment: (
            <InputAdornment position="end">
              {isPassword ? (
                <IconButton size="small" edge="end" onClick={handleTogglePassword}>
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </IconButton>
              ) : editIcon ? (
                <IconButton size="small" edge="end" disabled>
                  {icon || <CiEdit />}
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
          style: { fontSize: "12px", color: "#393939" },
        }}
        inputProps={{
          pattern: type === "number" ? "[0-9]*" : undefined,
        }}
        error={error}
        helperText={helperText}
        sx={{
          // marginBottom: "30px",
          margin: "0px 0",
          ...sx,
          "& .MuiOutlinedInput-root": {
            borderRadius: noBorderRadius ? "0px" : "5px",
            height: inputfieldHeight || "40px",
            fontSize: "14px",
            padding: "0px 6px",
            "& fieldset": {
              borderColor: "#878282", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#878282", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#878282", // Border color when focused
              borderWidth: "1px",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#7B7B7B",
            fontSize: "12px",
          },
          "& .MuiFormHelperText-root": {
            color: "red",
          },
        }}
        
      />
    </>
  );
};

export default GenericInput;
