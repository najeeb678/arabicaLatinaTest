import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import Grid from "@mui/material/Grid2";
import CustomTypography from "../../../_components/common/CustomTypography";
import CustomTextField from "@/_components/common/CustomTextField";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { registerUser, resetPasswordEmail } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import GenericInput from "@/_components/common/GenericInput";
import CustomPhoneField from "@/_components/common/CustomPhoneField";

// Define reusable styles
const textFieldStyles = {
  width: "275px !important",
  height: "40px !important",
  background: "#FEF9F4 !important",
  borderRadius: "0 !important", // Ensures no border radius
  "& .MuiOutlinedInput-root": {
    fontSize: "14px !important",
    borderRadius: "0 !important", // Ensures no border radius on hover/focus
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
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]+$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 digit, and may include special characters"
    )
    .required("Password is required"),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Repeat password is required"),
  // contactNumber: Yup.string().required("Contact number is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, "Invalid phone number")
    .min(9, "Contact number must be at least 9 digits")
    .required("Contact number is required"),

  // address: Yup.string().required("Address is required"),
});

type RegisterProps = {
  setActiveTab: (tab: string) => void;
  setOtpVisibleOnRegister: (visible: boolean) => void;
};

export const Register = ({
  setActiveTab,
  setOtpVisibleOnRegister,
}: RegisterProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };
  const handleCLICK = () => {
    setOtpVisibleOnRegister(true);
    setActiveTab("login");
  };

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
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: "40px",
          color: "#2E2B2A",
          marginBottom: "7px",
        }}
      >
        Create an account
      </CustomTypography>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repeatPassword: "",
          contactNumber: "",
          phoneCode: "51",
          // address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setLoading(true);
          const {
            firstName,
            lastName,
            repeatPassword,
            phoneCode,
            contactNumber,
            ...rest
          } = values;
          localStorage.setItem("userEmail", values.email);
          const payload = {
            name: values.firstName + " " + values.lastName,
            subscription: checked,
            contactNumber: `${phoneCode}${contactNumber}`,
            ...rest,
          };

          dispatch(registerUser(payload))
            .unwrap()
            .then(() => {
              toast.success("Registration successful");
              setLoading(false);
              setOtpVisibleOnRegister(true);
              setActiveTab("login");
            })
            .catch((error) => {
              let errorMessage = "Registration failed";

              // Check if error.message is an array or string
              if (Array.isArray(error?.message)) {
                errorMessage = error.message.join(", ");
                // toast.error(errorMessage);
              } else if (typeof error?.message === "string") {
                errorMessage = error.message;
              }

              if (errorMessage.toLowerCase().includes("already exists")) {
                // toast.error(errorMessage);
                setOtpVisibleOnRegister(true);
                setActiveTab("login");
                dispatch(resetPasswordEmail({ email: values.email }));
              } else {
                toast.error(errorMessage);
              }

              setLoading(false);
            });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form>
            <Box
              sx={{
                width: { xs: "100%", md: "600px" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "start" },
              }}
            >
              {/* First Name and Last Name */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { xs: "40px", md: "50px" },
                }}
              >
                {/* First Name */}
                <CustomTextField
                  label="First Name*"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                {/* Last Name */}
                <CustomTextField
                  label="Last Name*"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Box>

              {/* Email */}
              <CustomTextField
                label="Email*"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
              />
              {/* Contact Number */}

              {/* <GenericInput
                label="Contact Number*"
                name="contactNumber"
                type="number"
                noBorderRadius
                value={values.contactNumber}
                onChange={handleChange("contactNumber")}
                onBlur={handleBlur}
                helperText={
                  errors.contactNumber && errors.contactNumber
                    ? (errors.contactNumber as any)
                    : undefined
                }
                placeholder=""
                inputfieldHeight="35px"
              /> */}
              <Grid
                size={{ xs: 12 }}
                container
                spacing={0.1}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid size={{ xs: 3, sm: 4, md: 2 }}>
                  <CustomPhoneField
                    label="Phone Code"
                    name="phoneCode"
                    value={values.phoneCode}
                    onChange={(val) => {
                      setFieldValue("phoneCode", val), console.log("val", val);
                    }}
                    onBlur={() => handleBlur("phoneCode")}
                    placeholder="+51"
                    sx={{ marginTop: "5px" }}
                    noBorderRadius
                    inputfieldHeight="35px"
                  />
                </Grid>
                <Grid size={{ xs: 9, sm: 8, md: 10 }} sx={{}}>
                  <GenericInput
                    label="Contact Number*"
                    name="contactNumber"
                    type="text"
                    value={values.contactNumber}
                    onChange={handleChange("contactNumber")}
                    onBlur={handleBlur("contactNumber")}
                    error={
                      touched.contactNumber && Boolean(errors.contactNumber)
                    }
                    placeholder="555123456"
                    sx={{ marginTop: "0px" }}
                    labelStyle={{ marginTop: "-5px", marginBottom: "10px" }}
                    noBorderRadius
                    inputfieldHeight="35px"
                  />
                </Grid>
                {touched.contactNumber && errors.contactNumber && (
                  <Typography color="error" variant="caption">
                    {typeof errors.contactNumber === "string"
                      ? errors.contactNumber
                      : ""}
                  </Typography>
                )}
              </Grid>

              {/* Address */}
              {/* <CustomTextField
                label="Address*"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                fullWidth
              /> */}
              {/* Password */}

              <GenericInput
                label="Create a password (min 8 characters)*"
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
              />
              <GenericInput
                type="text"
                label="Repeat password*"
                name="repeatPassword"
                noBorderRadius
                isPassword
                value={values.repeatPassword}
                onChange={handleChange("repeatPassword")}
                onBlur={handleBlur}
                helperText={
                  errors.repeatPassword && errors.repeatPassword
                    ? (errors.repeatPassword as any)
                    : undefined
                }

                placeholder=""
                inputfieldHeight="35px"
              />
              {/* Repeat Password */}
              {/* <CustomTextField
                type="password"
                label="Repeat password*"
                name="repeatPassword"
                value={values.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.repeatPassword && Boolean(errors.repeatPassword)}
                helperText={touched.repeatPassword && errors.repeatPassword}
                fullWidth
              /> */}
              {/* Checkbox with Subscription Text */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                <Box
                  onClick={toggleCheckbox}
                  sx={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "2px",
                    border: "1px solid #868282",
                    backgroundColor: checked ? "#C48E70" : "transparent",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  {checked && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <CheckIcon
                        sx={{
                          color: "white",
                          marginTop: "4px",
                          fontSize: "26px",
                        }}
                      />
                    </Box>
                  )}
                </Box>

                <Box sx={{ marginLeft: "9px" }}>
                  <CustomTypography
                    sx={{
                      fontFamily: "GaretBook",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: "20px",
                      color: "#2E2B2A",
                    }}
                  >
                    Newsletter subscription
                  </CustomTypography>
                  <CustomTypography
                    sx={{
                      fontFamily: "var(--font-garet-book)",
                      fontSize: "10px",
                      fontWeight: 300,
                      lineHeight: "20px",
                      color: "#2E2B2A",
                    }}
                  >
                    Receive announcements, recommendations, and updates about
                    Arabica Latina.
                  </CustomTypography>
                </Box>
              </Box>

              {/* Create Account Button */}
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
                  marginBottom: "12px",
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
                  " Create account"
                )}
              </Button>
              <CustomTypography
                sx={{
                  fontFamily: "GaretBook",
                  fontSize: "10px",
                  fontWeight: 300,
                  lineHeight: "20px",
                  letterSpacing: "0.06em",
                  textAlign: "left",
                  color: "#2E2B2A",
                }}
              >
                By signing up, you are agreeing to our{" "}
                <a
                  href="#"
                  style={{
                    fontFamily: "var(--font-garet-book)",
                    fontSize: "10px",
                    fontWeight: 300,
                    lineHeight: "20px",
                    letterSpacing: "0.06em",
                    textAlign: "left",
                    textDecoration: "underline",
                    color: "#2E2B2A",
                  }}
                >
                  Terms & Conditions
                </a>
              </CustomTypography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
