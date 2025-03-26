import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomTextField from "@/_components/common/CustomTextField";
import CustomTypography from "../../../_components/common/CustomTypography";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword, verifyUser } from "@/redux/slices/authSlice";
import { ThreeDots } from "react-loader-spinner";
import GenericInput from "@/_components/common/GenericInput";

// Validation schema with Yup
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]+$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
type UpdatePasswordProps = {
  setCurrentView: (tab: string) => void;
};

export const UpdatePassword = ({ setCurrentView }: UpdatePasswordProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const resetPasswordUserEmail = useSelector(
    (state: RootState) => state.auth.resetPasswordUserEmail
  );
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
        Update Password
      </CustomTypography>

      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setLoading(true);
          dispatch(
            updatePassword({
              email:
                resetPasswordUserEmail || localStorage.getItem("email") || "",
              newPassword: values.newPassword,
              confirmNewPassword: values.confirmPassword,
            })
          )
            .unwrap()
            .then(() => {
              toast.success("Password updated successfully");
              setLoading(false);
              setCurrentView("login");
            })
            .catch((error) => {
              setLoading(false);

              toast.error(error) || "something went wrong";
            });
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", md: "600px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", md: "600px" },
                }}
              >
                <GenericInput
                  label="New Password*"
                  name="newPassword"
                  type="text"
                  noBorderRadius
                  isPassword
                  value={values.newPassword}
                  onChange={handleChange("newPassword")}
                  onBlur={handleBlur}
                  helperText={
                    errors.newPassword && errors.newPassword
                      ? (errors.newPassword as any)
                      : undefined
                  }
                  placeholder=""
                  inputfieldHeight="35px"
                />

                <GenericInput
                  label="Confirm New Password*"
                  name="confirmPassword"
                  type="text"
                  noBorderRadius
                  isPassword
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur}
                  helperText={
                    errors.confirmPassword && errors.confirmPassword
                      ? (errors.confirmPassword as any)
                      : undefined
                  }
                  placeholder=""
                  inputfieldHeight="35px"
                />

                {/* Update Password Button */}
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
                    width: "100%",
                    border: "none",
                    borderRadius: "4px",
                    padding: "10px",
                    cursor: "pointer",
                    textTransform: "none",
                    marginTop: "12px",
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
                    " Update Password"
                  )}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdatePassword;
