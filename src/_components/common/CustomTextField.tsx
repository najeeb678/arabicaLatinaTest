import React from 'react';
import { TextField, Box } from '@mui/material';
import CustomTypography from './CustomTypography';

const textFieldStyles = {
  width: '275px !important',
  height: '40px !important',
  background: '#FEF9F4 !important',
  borderRadius: '0 !important',
  '& .MuiOutlinedInput-root': {
    fontSize: '14px !important',
    borderRadius: '0 !important',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#868282 !important',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #868282 !important',
    borderRadius: '0 !important',
  },
  '& .MuiOutlinedInput-input': {
    padding: '8px 14px !important',
  },
};

interface CustomTextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | boolean;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
  width?: object;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = 'text',
  placeholder = '',
  fullWidth = false,
  width = {xs: '100%', md: '275px'},
}) => {
  return (
    <Box sx={{ width: fullWidth ? '100%' : width }}>
      <CustomTypography
        sx={{
          fontFamily: 'GaretBook',
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: '40px',
          color: '#2E2B2A',
          marginTop:"5px",
        }}
      >
        {label}
      </CustomTypography>
      <TextField
        type={type}
        sx={{ ...textFieldStyles, width: fullWidth ? '100%' : width,
          fontVariant: 'h1',
          fontFamily: 'GaretBook',
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: '40px',
          color: '#2E2B2A',
          marginBottom:"5px"
         }}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default CustomTextField;
