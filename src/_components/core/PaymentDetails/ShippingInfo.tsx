import { useFormik } from "formik";
import * as Yup from "yup";
import GenericInput from "@/_components/common/GenericInput";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import SingleSelect from "@/_components/common/AdvancedUiElements/SingleSelect";
import router, { useRouter } from "next/router";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { createOrder, findUserAddress } from "@/redux/slices/orderSlice";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { getOrderData } from "@/utils/utils";
import CustomPhoneField from "@/_components/common/CustomPhoneField";

const ShippingInfo = ({
  setShippingInfo,
  setActiveStep,
  setOrderDetailsForCardPayment,
  setOrderCompleted,
}: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  let servicesData = [
    { id: 1, name: "1 - 3 Days (Free)" },
    { id: 2, name: "Same Day (Extra Fee)" },
  ];
  const handleServiceChange = (value: any) => {
    formik.setFieldValue("deliveryOption", value?.id || "");
  };
  useEffect(() => {
    dispatch(findUserAddress())
      .unwrap()
      .then((response) => {
        if (response && response.length > 0) {
          const userAddress = response[0];
          console.log("User Address: ", userAddress.contactNumber);

          const phoneMatch = userAddress?.contactNumber?.match(
            /^\+((92|51)(\d{6,15})|(\d{1,3})(\d{4,15}))$/
          );

          let phoneCode = "";
          let phoneNumber = userAddress?.contactNumber || "";

          if (phoneMatch) {
            if (phoneMatch[2]) {
              // Handle +92 or +51 cases (country code only)
              phoneCode = `+${phoneMatch[2]}`;
              phoneNumber = phoneMatch[3];
            } else if (phoneMatch[4]) {
              // Handle all other country codes (cut 4 digits)
              phoneCode = `+${phoneMatch[4]}`;
              phoneNumber = phoneMatch[5];
            }
          }
          formik.setValues({
            city: userAddress.city || "",
            area: userAddress.area || "",
            address: userAddress.address || "",
            apartment: userAddress.apartment || "",
            firstName: userAddress.firstName || "",
            lastName: userAddress.lastName || "",
            phoneCode,
            phoneNumber,
            deliveryOption: "",
            packaging: "Eco-Friendly Packaging",
            // mainAddress: userAddress.type === "PRIMARY",
          });
        }
      });
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      city: "",
      area: "",
      address: "",
      apartment: "",
      firstName: "",
      lastName: "",
      phoneCode: "+966",
      phoneNumber: "",
      deliveryOption: "",
      packaging: "Eco-Friendly Packaging",
      // mainAddress: false,
    },
    validationSchema: Yup.object({
      city: Yup.string().required("City is required"),
      area: Yup.string().required("Area is required"),
      address: Yup.string().required("Delivery address is required"),
      apartment: Yup.string().required("Apartment/Room/Villa is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phoneCode: Yup.string().required("Phone code is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: (values) => {
      const orderData = getOrderData();

      setShippingInfo(values);
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        contactNumber: `${values.phoneCode}${values.phoneNumber}`,
        address: values.address,
        city: values.city,
        area: values.area,
        apartment: values.apartment,
        type: "PRIMARY",
        discount: orderData?.discount || 0,
        paymentMethod: orderData?.paymentMethod || "CASH",
      };
      setLoading(true);
      dispatch(createOrder(payload))
        .unwrap()
        .then((res) => {
          if (res?.data.paymentMethod === "CASH") {
            toast.success("Order created successfully.");
            setActiveStep(2);
            setOrderCompleted(true);
            localStorage.removeItem("orderCreationData");
          } else if (res?.data.paymentMethod === "CARD") {
            setOrderDetailsForCardPayment({
              orderId: res.data.orderId,
              finalAmount: orderData.finalAmount,
            });
            setActiveStep(1);
          }
        })
        .catch((error) => {
          toast.error(error.message);
          // console.error("Error creating order:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ display: "grid", gap: 2 }}
    >
      <Box
        className="flex-space-between"
        sx={{
          backgroundColor: " #f0e2cb",
          height: "50px",
          flex: "0 0 auto",
          padding: "5px 15px",
        }}
      >
        <Typography
          component={"span"}
          sx={{
            fontSize: "14px",
            lineHeight: "50px",
            color: "#3E3F20",
            fontFamily: "GaretBook",
            letterSpacing: "0.6px",

            textTransform: "uppercase",
          }}
        >
          Location
        </Typography>
        <Typography
          component={"span"}
          sx={{
            fontSize: "14px",
            lineHeight: "50px",
            color: "#3E3F20",
            fontFamily: "GaretBook",
            letterSpacing: "0.6px",
          }}
        >
          *Required fields
        </Typography>
      </Box>
      <GenericInput
        label="City"
        name="city"
        type="text"
        value={formik.values.city}
        onChange={formik.handleChange("city")}
        onBlur={formik.handleBlur("city")}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={
          formik.touched.city && formik.errors.city
            ? formik.errors.city
            : undefined
        }
        placeholder="Riyadh"
        sx={{ marginTop: "-10px" }}
      />

      <GenericInput
        label="Area"
        name="area"
        type="text"
        value={formik.values.area}
        onChange={formik.handleChange("area")}
        onBlur={formik.handleBlur("area")}
        error={formik.touched.area && Boolean(formik.errors.area)}
        helperText={
          formik.touched.area && formik.errors.area
            ? formik.errors.area
            : undefined
        }
        placeholder="e.g. Al Wizarat"
        sx={{ marginTop: "-10px" }}
      />

      <GenericInput
        label="Delivery Address"
        name="address"
        type="text"
        value={formik.values.address}
        onChange={formik.handleChange("address")}
        onBlur={formik.handleBlur("address")}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={
          formik.touched.address && formik.errors.address
            ? formik.errors.address
            : undefined
        }
        placeholder="e.g. 11 Kaiyuan Road"
        sx={{ marginTop: "-10px" }}
        labelStyle={{ fontFamily: "poppins", fontWeight: "400" }}
      />

      <GenericInput
        label="Apartment / Hotel Room / Villa"
        name="apartment"
        type="text"
        value={formik.values.apartment}
        onChange={formik.handleChange("apartment")}
        onBlur={formik.handleBlur("apartment")}
        error={formik.touched.apartment && Boolean(formik.errors.apartment)}
        helperText={
          formik.touched.apartment && formik.errors.apartment
            ? formik.errors.apartment
            : undefined
        }
        placeholder="e.g. Apartment 2101"
        sx={{ marginTop: "-10px" }}
        labelStyle={{ fontFamily: "poppins", fontWeight: "400" }}
      />

      <Box
        className="flex-space-between"
        sx={{
          backgroundColor: " #f0e2cb",
          height: "50px",
          flex: "0 0 auto",
          padding: "5px 15px",
        }}
      >
        <Typography
          component={"span"}
          sx={{
            fontSize: "14px",
            lineHeight: "35px",
            color: "#2E2B2A",
            letterSpacing: "0.6px",
            fontFamily: "poppins",
            fontWeight: "400",
          }}
        >
          How can we reach you?
        </Typography>
        <Typography
          component={"span"}
          sx={{
            fontSize: "14px",
            lineHeight: "50px",
            color: "#3E3F20",
            letterSpacing: "0.6px",
            fontWeight: "bold",
            opacity: 0.5,
          }}
        >
          *Required fields
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }} component="div">
          {" "}
          <GenericInput
            label="First Name"
            name="firstName"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : undefined
            }
            placeholder="Anne Marie"
            sx={{ marginTop: "5px" }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} component="div">
          {" "}
          <GenericInput
            label="Last Name"
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : undefined
            }
            placeholder="Nichols"
            sx={{ marginTop: "5px" }}
          />
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid size={{ xs: 2 }} component="div">
          <GenericInput
            label="Phone Code"
            name="phoneCode"
            type="text"
            value={formik.values.phoneCode}
            onChange={formik.handleChange("phoneCode")}
            onBlur={formik.handleBlur("phoneCode")}
            error={formik.touched.phoneCode && Boolean(formik.errors.phoneCode)}
            helperText={
              formik.touched.phoneCode && formik.errors.phoneCode
                ? formik.errors.phoneCode
                : undefined
            }
            placeholder="+966"
            sx={{ marginTop: "5px" }}
          />
        </Grid>
        <Grid size={{ xs: 10 }} component="div">
          <GenericInput
            label="Phone Number"
            name="phoneNumber"
            type="text"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange("phoneNumber")}
            onBlur={formik.handleBlur("phoneNumber")}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? formik.errors.phoneNumber
                : undefined
            }
            placeholder="555123456"
            sx={{ marginTop: "5px" }}
          />
        </Grid>
      </Grid> */}
      <Grid container spacing={0.1} alignItems="center">
        {/* Phone Code Input */}
        <Grid size={{ xs: 3, sm: 4, md: 2 }}>
          <CustomPhoneField
            label="Phone Code"
            name="phoneCode"
            value={formik.values.phoneCode}
            // onChange={(val) => formik.setFieldValue("phoneCode", val)}
            onChange={formik.handleChange("phoneCode")}
            onBlur={() => formik.handleBlur("phoneCode")}
            placeholder="+51"
            sx={{ marginTop: "5px" }}
            noBorderRadius
            inputfieldHeight="35px"
          />
        </Grid>

        {/* Phone Number Input */}
        <Grid size={{ xs: 9, sm: 8, md: 10 }}>
          <GenericInput
            label="Phone Number*"
            name="phoneNumber"
            type="text"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange("phoneNumber")}
            onBlur={formik.handleBlur("phoneNumber")}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            placeholder="555123456"
            sx={{ marginTop: "0px" }}
            labelStyle={{ marginTop: "-5px", marginBottom: "10px" }}
            noBorderRadius
            inputfieldHeight="35px"
          />
        </Grid>

        {/* Error message */}
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <Typography color="error" variant="caption">
            {typeof formik.errors.phoneNumber === "string"
              ? formik.errors.phoneNumber
              : ""}
          </Typography>
        )}
      </Grid>

      {/* <FormControlLabel
        control={
          <Checkbox
            name="mainAddress"
            checked={formik.values.mainAddress}
            onChange={formik.handleChange("mainAddress")}
            onBlur={formik.handleBlur("mainAddress")}
            sx={{
              transform: "scale(0.8)",
              padding: "4px",
            }}
          />
        }
        label="Set as main delivery address"
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: "12px",
            fontFamily: "GaretBook",
          },
        }}
      /> */}

      <FormControlLabel
        control={
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 28,
                color: "#868282",
              },
              "&.MuiCheckbox-root": {
                padding: "4px",
              },
              "& .MuiSvgIcon-root path": {
                strokeWidth: 1,
              },
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "35px",
              color: "#2E2B2A",
              letterSpacing: "0.6px",

              fontFamily: "GaretBook",
            }}
          >
            Set as main delivery address
          </Typography>
        }
      />

      <Box
        className="flex-space-between"
        sx={{
          height: "40px",
          flex: "0 0 auto",
          padding: "5px 15px",
        }}
      >
        <Typography
          component={"span"}
          sx={{
            fontSize: "14px",
            lineHeight: "35px",
            color: "#2E2B2A",
            letterSpacing: "0.6px",
            fontWeight: "bold",
            fontFamily: "GaretHeavy",
          }}
        >
          Schedule Delivery
        </Typography>
        <Typography
          component={"span"}
          sx={{
            fontSize: "14px",
            lineHeight: "50px",
            color: "#A92323",
            letterSpacing: "0.6px",
            textDecoration: "underline",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => router.push("/legal/shipping-and-delivery")}
        >
          Shipping details
        </Typography>
      </Box>

      <SingleSelect
        textFieldLabel="Select Service"
        data={servicesData || []}
        onChange={handleServiceChange}
        onBlur={formik.handleBlur("serviceId")}
        name="serviceId"
        value={
          servicesData.find(
            (service: any) => service.id === formik.values.deliveryOption
          ) || null
        }
        sx={{ borderRadius: "0px", marginTop: "-20px" }}
      />
      {formik.touched.deliveryOption && formik.errors.deliveryOption && (
        <Typography color="error" variant="caption">
          {formik.errors.deliveryOption}
        </Typography>
      )}
      <Box
        className="flex-space-between"
        sx={{
          height: "20px",
          marginTop: "20px",
          flex: "0 0 auto",
          padding: "5px 15px",
        }}
      >
        <Typography
          component={"span"}
          sx={{
            fontSize: "14px",
            lineHeight: "35px",
            color: "#2E2B2A",
            letterSpacing: "0.6px",
            fontWeight: "bold",
            fontFamily: "GaretHeavy",
          }}
        >
          Packaging Options (Free)
        </Typography>
      </Box>
      <RadioGroup
        name="packaging"
        value={formik.values.packaging}
        onChange={formik.handleChange}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100px",
          gap: 0,
          "& .MuiFormControlLabel-root": {
            flex: 1,
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "0",
            alignItems: "flex-start",
            transition: "border 0.3s ease, box-shadow 0.3s ease",
            margin: "0",
            backgroundColor: "transparent",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            cursor: "pointer",
          },
          "& .MuiFormControlLabel-root:hover": {
            borderColor: "#000",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          },
          "& .MuiFormControlLabel-root.Mui-checked": {
            borderColor: "#000",
          },
          "& .Mui-checked + span": {
            fontWeight: "bold",
          },
          "& .MuiRadio-root": {
            color: "#000",
            marginLeft: "0",
            marginRight: "10px",
          },
          "& .MuiRadio-root.Mui-checked": {
            color: "#000",
          },
        }}
      >
        <FormControlLabel
          value="Premium Packaging"
          control={<Radio sx={{ padding: 0 }} />}
          label={
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight:
                    formik.values.packaging === "Premium Packaging"
                      ? "bold"
                      : "bold",
                  fontFamily: "GretHeavy, sans-serif",
                }}
              >
                Premium Packaging
              </Typography>
              <Typography variant="body2" color="textSecondary">
                True luxury for special occasions
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value="Eco-Friendly Packaging"
          control={<Radio sx={{ padding: 0 }} />}
          label={
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight:
                    formik.values.packaging === "Eco-Friendly Packaging"
                      ? "bold"
                      : "bold",
                  fontFamily: "GretHeavy, sans-serif",
                }}
              >
                Eco-Friendly Packaging
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Better for the planet. Beauty orders <br /> will be packed in
                padded envelopes.
              </Typography>
            </Box>
          }
        />
      </RadioGroup>

      {/* <RadioGroup
        name="packaging"
        value={formik.values.packaging}
        onChange={formik.handleChange}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          "& .MuiFormControlLabel-root": {
            flex: 1,
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            alignItems: "flex-start",

            transition: "border 0.3s ease",
            margin: "0",
          },
          "& .MuiFormControlLabel-root:hover": {
            borderColor: "#000",
          },
          "& .Mui-checked + span": {
            fontWeight: "bold",
          },
          "& .MuiRadio-root": {
            color: "#000",
            marginLeft: "0",
            marginRight: "0px",
          },
          "& .MuiRadio-root.Mui-checked": {
            color: "#000",
          },
        }}
      >
        <FormControlLabel
          value="Premium Packaging"
          control={<Radio sx={{ marginLeft: 0, marginRight: 8 }} />}
          label={
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "GretHeavy, sans-serif",
                }}
              >
                Premium Packaging
              </Typography>
              <Typography variant="body2" color="textSecondary">
                True luxury for special occasions
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value="Eco-Friendly Packaging"
          control={<Radio />}
          label={
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "GretHeavy, sans-serif",
                }}
              >
                l Eco-Friendly Packaging
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Better for the planet. Beauty orders will be packed in padded
                envelopes.
              </Typography>
            </Box>
          }
        />
      </RadioGroup> */}
      <Box className="flexCenter" sx={{ marginTop: "60px" }}>
        <Button
          variant="contained"
          sx={{
            fontFamily: "GaretHeavy",
            width: "50%",
            borderRadius: "0px",
            padding: "10px 0",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#F4A84D",
            letterSpacing: "2%",
            color: "#A44819",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              color: "#fff",
            },
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
            "  CONTINUE"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ShippingInfo;
