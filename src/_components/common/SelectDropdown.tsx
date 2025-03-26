import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"; // Import cancel icon

type Option = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  options: Option[];
  placeholder?: string; // Optional placeholder
  onSelectChange?: (value: string) => void; // Callback for value change
  selectedValue?: string; 
  defaultValue?: string; // Default selected value
  label?: string; // Optional label for the select input
  sx?: { [key: string]: any }; // Optional sx prop for custom styles
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  placeholder = "",
  onSelectChange,
  selectedValue = "",
  label,
  defaultValue = "",
  sx = {},
}) => {
  // const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  // const handleChange = (event: SelectChangeEvent<string>) => {
  //   const value = event.target.value;
  //   setSelectedValue(value);
  //   if (onSelectChange) {
  //     onSelectChange(value);
  //   }
  // };

  // // Function to clear the selection
  // const handleClearSelection = () => {
  //   setSelectedValue("");
  //   if (onSelectChange) {
  //     onSelectChange(""); // Clear the value in the parent component as well
  //   }
  // };
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (onSelectChange) {
      onSelectChange(value);
    }
  };

  // Function to clear the selection
  const handleClearSelection = () => {
    if (onSelectChange) {
      onSelectChange(""); // Clear the value in the parent component as well
    }
  };

  return (
    <FormControl
      sx={{
        width: "150px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        ...sx,
      }}
      size="small"
    >
      {label && (
        <InputLabel
          id="custom-select-label"
          sx={{
            fontSize: "12px",
            color: "#a44819",
            "&.Mui-focused": {
              color: "#a44819",
            },
            "&.MuiInputLabel-outlined": {
              color: "#a44819",
            },
          }}
        >
          {label}
        </InputLabel>
      )}
      <Select
        labelId="custom-select-label"
        id="custom-select"
        label={label}
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": placeholder }}
        sx={{
          fontSize: "12px",
          height: "32px",
          width: "100%",
          border: "none",
          padding: "7px 10px",
          "& .MuiSelect-select": {
            padding: "7px 0px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          },
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              borderColor: "#a44819",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a44819",
            },
          },
          "& svg": {
            color: "#a44819",
          },
          ...sx,
        }}
        renderValue={(selected) => {
          if (!selected) return placeholder;
          const selectedOption = options.find(
            (option) => option.value === selected
          );
          return selectedOption ? selectedOption.label : "";
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
            sx={{ fontSize: "12px" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {/* Clear Icon/Button */}
      {selectedValue && (
        <IconButton
          onClick={handleClearSelection}
          sx={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#a44819",
            padding: "0",
            minWidth: "auto",
          }}
        >
          <CancelIcon sx={{ fontSize: "16px" }} />{" "}
        </IconButton>
      )}
    </FormControl>
  );
};

export default SelectDropdown;
