import { useState } from "react";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Typography
        sx={{ fontSize: "14px", marginTop: "10px", marginBottom: "10px" }}
      >
        {label} *
      </Typography>
      <TextField
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder || "Password"}
        fullWidth
        value={value}
        onChange={onChange}
        error={error}
        onBlur={onBlur}
        helperText={helperText}
        sx={{
          marginBottom: "15px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(226, 203, 162, 0.5)",
            borderRadius: "0px",
            height: "45px",
            fontSize: "14px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default PasswordInput;
