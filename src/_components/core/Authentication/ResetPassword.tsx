import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomTextField from "@/_components/common/CustomTextField";
import CustomTypography from "../../../_components/common/CustomTypography";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPasswordEmail } from "@/redux/slices/authSlice";
import { ThreeDots } from "react-loader-spinner";

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ResetPassword = ({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
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
        }}
      >
        Reset Password
      </CustomTypography>
      <CustomTypography
        sx={{
          fontFamily: "GaretBook",
          fontSize: { xs: "13px", md: "14px" },
          fontWeight: 300,
          lineHeight: "40px",
          color: "#2E2B2A",
          marginBottom: "7px",
          textAlign: "center",
        }}
      >
        Enter email address to reset password
      </CustomTypography>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setLoading(true);
          dispatch(resetPasswordEmail({ email: values.email }))
            .unwrap()
            .then(() => {
              toast.success("Reset password link sent to your email");
              setLoading(false);
              onBack();
              onContinue();
            })
            .catch((error: any) => {
              setLoading(false);
              toast.error("Failed to send reset password link");
            });
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Box>
              {/* Email Field */}
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

              {/* Continue Button */}
              <Button
                sx={{
                  marginTop: "20px",
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
                  marginBottom: "12px",
                }}
                type="submit"
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
                  "Continue"
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Back to Login Link */}
      <CustomTypography
        sx={{
          fontFamily: "GaretHeavy",
          fontSize: "10px",
          fontWeight: 850,
          lineHeight: "20px",
          letterSpacing: "0.06em",
          textAlign: "center",
          textDecorationLine: "underline",
          textDecorationStyle: "solid",
          color: "#2E2B2A",
          cursor: "pointer",
        }}
        onClick={onBack}
      >
        Back to Login
      </CustomTypography>
    </Box>
  );
};

export default ResetPassword;
