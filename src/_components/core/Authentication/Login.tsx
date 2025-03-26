import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { Box, TextField, Button } from "@mui/material";
import CustomTextField from "@/_components/common/CustomTextField";
import CustomTypography from "../../../_components/common/CustomTypography";
import ResetPassword from "./ResetPassword";
import OTPVerification from "./OTPVerification";
import UpdatePassword from "./UpdatePassword";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";
import GenericInput from "@/_components/common/GenericInput";

// Define reusable styles
const textFieldStyles = {
  width: "275px !important",
  height: "40px !important",
  background: "#FEF9F4 !important",
  borderRadius: "0 !important",
  "& .MuiOutlinedInput-root": {
    fontSize: "14px !important",
    borderRadius: "0 !important",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#868282 !important",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #868282 !important",
    borderRadius: "0 !important",
  },
  "& .MuiOutlinedInput-input": {
    padding: "8px 14px !important",
  },
};

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type LoginProps = {
  otpVisibleOnRegister: boolean;
  setActiveTab: (tab: string) => void;
};
export const Login = ({ otpVisibleOnRegister, setActiveTab }: LoginProps) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("login");
  const [otpEmail, setOtpEmail] = useState<string>("");

  useEffect(() => {
    if (otpVisibleOnRegister) setCurrentView("otpVerification");
  }, [otpVisibleOnRegister]);

  const handleForgotPassword = () => setCurrentView("resetPassword");
  const handleOTPVerification = () => setCurrentView("otpVerification");
  const handleUpdatePassword = () => {
    otpVisibleOnRegister
      ? setCurrentView("login")
      : setCurrentView("updatePassword");
  };
  const handleBackToLogin = () => setCurrentView("login");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: { xs: "100%", md: "600px" },
      }}
    >
      {currentView === "login" && (
        <>
          <CustomTypography
            sx={{
              fontFamily: "GaretBook",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "40px",
              color: "#2E2B2A",
            }}
          >
            Welcome
          </CustomTypography>
          <CustomTypography
            sx={{
              fontFamily: "GaretBook",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "40px",
              color: "#2E2B2A",
              marginBottom: "7px",
            }}
          >
            Log in to continue
          </CustomTypography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              setOtpEmail(values.email);
              
             

              try {
                await dispatch(loginUser(values)).unwrap();
                toast.success("Successfully logged in");
                router.push("/");
              } catch (error: any) {
                const errorMessage = Array.isArray(error.message)
                  ? error.message.join(" ")
                  : error.message || "Login failed";
                toast.error(errorMessage);
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <Box sx={{ width: { xs: "100%", md: "600px" } }}>
                  {/* Email */}
                  <CustomTextField
                    label="Email*"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    width={{ xs: "90vw", md: "600px" }}
                  />
                  {/* Password */}
                  <GenericInput
                    label="Password*"
                    name="password"
                    type="text"
                    noBorderRadius
                    isPassword
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur}
                    helperText={
                      errors.password && errors.password
                        ? (errors.password as any)
                        : undefined
                    }
                    placeholder=""
                    inputfieldHeight="35px"
                    sx={{
                      marginBottom: "20px",
                    }}
                  />
                  {/* Log in Button */}
                  <Button
                    type="submit"
                    sx={{
                      fontFamily: "GaretBook",
                      height: "40px",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "40px",
                      letterSpacing: "0.06em",
                      backgroundColor: "#C48E70",
                      color: "white",
                      width: "100%",
                      border: "none",
                      borderRadius: "4px",
                      padding: "10px",
                      cursor: "pointer",
                      textTransform: "none",
                      marginTop: "10px",
                      marginBottom: "25px",
                    }}
                  >
                    {loading ? (
                      <ThreeDots
                        height="28"
                        width="40"
                        radius="9"
                        color="#FFFFFF"
                        ariaLabel="three-dots-loading"
                        visible
                      />
                    ) : (
                      "Log In"
                    )}
                  </Button>

                  <CustomTypography
                    onClick={handleForgotPassword}
                    sx={{
                      fontFamily: "GaretHeavy",
                      fontSize: "10px",
                      lineHeight: "20px",
                      letterSpacing: "0.06em",
                      textAlign: "center",
                      textDecorationLine: "underline",
                      textDecorationStyle: "solid",
                      color: "#2E2B2A",
                      cursor: "pointer",
                    }}
                  >
                    FORGOT YOUR PASSWORD?
                  </CustomTypography>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}

      {currentView === "resetPassword" && (
        <ResetPassword
          onBack={handleBackToLogin}
          onContinue={handleOTPVerification}
        />
      )}
      {currentView === "otpVerification" && (
        <OTPVerification
          email={otpEmail}
          onContinue={handleUpdatePassword}
          otpVisibleOnRegister={otpVisibleOnRegister}
        />
      )}
      {currentView === "updatePassword" && (
        <UpdatePassword setCurrentView={setCurrentView} />
      )}
    </Box>
  );
};

export default Login;
