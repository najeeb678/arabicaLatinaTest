import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { resetPassword } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import PasswordInput from "./PasswordInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const PasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one special character"
      )
      .required("New password is required"),

    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(resetPassword(values)).unwrap();
        toast.success("Password changed successfully!");
        resetForm();
      } catch (err: any) {
        toast.error(err?.message || "Failed to change password.");
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <PasswordInput
          label="Current Password"
          name="oldPassword"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur("oldPassword")}
          placeholder="Enter Current Password"
          error={
            formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
          }
          helperText={
            formik.touched.oldPassword && formik.errors.oldPassword
              ? formik.errors.oldPassword
              : undefined
          }
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter New Password"
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={
            formik.touched.newPassword && formik.errors.newPassword
              ? formik.errors.newPassword
              : undefined
          }
        />

        <Typography
          sx={{ fontSize: "14px", marginTop: "15px", color: "#444343" }}
        >
          * 8 characters minimum
        </Typography>
        <Typography
          sx={{ fontSize: "14px", marginTop: "5px", color: "#444343" }}
        >
          * One uppercase letter
        </Typography>
        <Typography
          sx={{ fontSize: "14px", marginTop: "5px", color: "#444343" }}
        >
          * One speacial character
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            marginTop: "5px",
            marginBottom: "15px",
            color: "#444343",
          }}
        >
          * One number
        </Typography>

        <PasswordInput
          label="Confirm New Password"
          name="confirmNewPassword"
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirm New Password"
          error={
            formik.touched.confirmNewPassword &&
            Boolean(formik.errors.confirmNewPassword)
          }
          helperText={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
              ? formik.errors.confirmNewPassword
              : undefined
          }
        />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ marginTop: "10px" }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "0px",
              border: "1px solid #3C3837",
              width: "50%",
              color: "#3C3837",
              height: "40px",
            }}
            type="button"
            onClick={() => formik.resetForm()}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              borderRadius: "0px",
              backgroundColor: "rgba(226, 203, 162, 0.5)",
              border: "1px solid #A44819",
              width: "50%",
              color: "#3C3837",
            }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PasswordPage;
