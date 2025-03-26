import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";
import { Dayjs } from "dayjs";

type BasicDatePickerProps = {
  label?: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  sx?: React.CSSProperties;
  disabled?: boolean;
  format?: string;
};

export default function BasicDatePicker({
  label,
  value,
  onChange,
  sx,
  disabled,
  format,
}: BasicDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        variant="h6"
        sx={{ color: "#B2B2B2", fontSize: "10px", marginTop: "5px" }}
      >
        {label}
      </Typography>
      <DatePicker
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...(format ? { format } : {})}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",

            sx: {
              margin: "8px 0",
              "& .MuiOutlinedInput-root": {
                fontSize: "12px",
                color: "#393939",
                "&:hover fieldset": {
                  borderColor: "#B2B2B2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#B2B2B2",
                },
                ...sx,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
