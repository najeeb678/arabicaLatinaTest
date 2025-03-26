import React, { useState } from "react";
import { Box } from "@mui/material";

import CustomTypography from "@/_components/common/CustomTypography";
import Login from "./Login";
import Register from "./Register";

const SignInForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [otpVisibleOnRegister, setOtpVisibleOnRegister] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        borderTop: "1px solid #E2CBA2",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "auto",
          marginBottom: { xs: "70px", md: "145px" },
          backgroundColor: "#FEF9F4",
          marginTop: { xs: "70px", md: "99px" },
        }}
      >
        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: { xs: "90%", md: "600px" },
            height: "45px",
            marginBottom: "39px",
          }}
        >
          {/* Log In Tab */}
          <Box
            sx={{
              width: { xs: "50%", md: "300px" },
              height: "45px",
              border:
                activeTab === "login"
                  ? "1px solid #3E3F20"
                  : "1px solid #868282",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab("login")} // Set active tab
          >
            <CustomTypography
              variant="h1"
              sx={{
                fontFamily: "GaretBook",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "40px",
                color: activeTab === "login" ? "#3E3F20" : "#868282",
              }}
            >
              LOG IN
            </CustomTypography>
          </Box>

          {/* Register Tab */}
          <Box
            sx={{
              width: { xs: "50%", md: "300px" },
              height: "45px",
              border:
                activeTab === "register"
                  ? "1px solid #3E3F20"
                  : "1px solid #868282",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setActiveTab("register")} // Set active tab
          >
            <CustomTypography
              variant="h1"
              sx={{
                fontFamily: "GaretBook",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "40px",
                color: activeTab === "register" ? "#3E3F20" : "#868282",
              }}
            >
              REGISTER
            </CustomTypography>
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            width: { xs: "90%", md: "600px" },
            //height: '500px',
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {activeTab === "login" && (
            <Login otpVisibleOnRegister={otpVisibleOnRegister}    setActiveTab={setActiveTab}/>
          )}
          {activeTab === "register" && (
            <Register
              setActiveTab={setActiveTab}
              setOtpVisibleOnRegister={setOtpVisibleOnRegister}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
