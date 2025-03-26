import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomTypography from "../../../_components/common/CustomTypography";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

// Dynamically import the OTPInput component
const OTPInput: any = dynamic(() => import("otp-input-react"), { ssr: false });

// Validation schema with Yup
const validationSchema = Yup.object({
  otp: Yup.string()
    .length(4, "OTP must be 4 digits")
    .matches(/^\d+$/, "OTP must be a number")
    .required("OTP is required"),
});

type OTPVerificationProps = {
  otpVisibleOnRegister: boolean;
  onContinue: () => void;
  email: string;
};

export const OTPVerification = ({
  onContinue,
  otpVisibleOnRegister,
  email,
}: OTPVerificationProps) => {
  const dispatch: AppDispatch = useDispatch();
  const registerUserEmail = useSelector(
    (state: any) => state.auth.registerUserEmail
  );
  const resetPasswordUserEmail = useSelector(
    (state: RootState) => state.auth.resetPasswordUserEmail
  );
  const [loading, setLoading] = useState(false);

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
      <CustomTypography
        sx={{
          fontFamily: "GaretBook",
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "40px",
          color: "#2E2B2A",
          marginBottom: "12px",
        }}
      >
        Verify OTP
      </CustomTypography>
      {otpVisibleOnRegister && (
        <CustomTypography
          sx={{
            fontFamily: "GaretBook",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "28px",
            color: "#2E2B2A",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Please check your email. An OTP has been sent to your registered email
          address.
        </CustomTypography>
      )}
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setLoading(true);
          localStorage.setItem("email", resetPasswordUserEmail);
          const userEmail = localStorage.getItem("userEmail");
          dispatch(
            verifyUser({
              email: email || resetPasswordUserEmail || userEmail || "",
              code: values.otp,
            })
          )
            .unwrap()
            .then(() => {
              toast.success("OTP verified successfully");
              localStorage.removeItem("userEmail");
              setLoading(false);
              onContinue();
            })
            .catch((error) => {
              setLoading(false);
              console.log("error", error);
              toast.error(error) || "something went wrong";
            });
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* OTP Input Field */}
              <Box sx={{ marginBottom: "12px" }}>
                <OTPInput
                  value={values.otp}
                  onChange={(otp: string) => setFieldValue("otp", otp)} // Sync with Formik
                  autoFocus={true}
                  OTPLength={4}
                  otpType="number"
                  secure={false}
                  className="otp-input"
                />
                {touched.otp && errors.otp && (
                  <Box
                    sx={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {errors.otp}
                  </Box>
                )}
              </Box>

              {/* Verify Button */}
              <Button
                sx={{
                  fontFamily: "GaretBook",
                  height: "40px",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "40px",
                  letterSpacing: "0.06em",
                  backgroundColor: "#C48E70",
                  color: "white",
                  width: "300px",
                  border: "none",
                  borderRadius: "4px",
                  padding: "10px",
                  cursor: "pointer",
                  textTransform: "none",
                  marginTop: "12px",
                  marginBottom: "12px",
                }}
                type="submit"
                disabled={!values.otp || values.otp.length < 4}
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
                  "  Verify"
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OTPVerification;
