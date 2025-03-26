import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface BasicModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const BasicModal: React.FC<BasicModalProps> = ({ children, open, onClose }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300, 
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          background: "#fff",

          maxWidth: "400px",
          width: "100%",
          padding: "10px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#868282",
            "&:hover": {
              color: "#aa7537", 
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Box>
  );
};

export default BasicModal;
