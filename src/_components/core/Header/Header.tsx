import React from "react";

import NavBar from "./NavBar";
import LogoSection from "./LogoSection";

import { Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Header = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          className="flexCenter"
          sx={{
            height: "50px",
            backgroundColor: "#efe1ca",
            color: "#bf805a",
            fontSize: "12px",
          }}
        >
          <AccessTimeIcon
            sx={{
              fontSize: "14px",
              marginRight: "5px",
            }}
          />
          Place your order and receive it in 2 days
        </Box>

        {/* Logo section */}
        <LogoSection />
        <Box>
          <NavBar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
