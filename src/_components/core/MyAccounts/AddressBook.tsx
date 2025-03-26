import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import {
  createAddress,
  deleteAddress,
  fetchUserDetails,
  updateAddress,
} from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { User } from "@/redux/slices/authSlice";

import CustomPhoneField from "@/_components/common/CustomPhoneField";
import { ThreeDots } from "react-loader-spinner";

import { useFormik } from "formik";
import * as Yup from "yup";
import GenericInput from "@/_components/common/GenericInput";
import { getDecodedToken } from "@/utils/utils";
import { EditIcon } from "lucide-react";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import { addToFavorite } from "@/redux/slices/orderSlice";

interface AddressBookProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

const AddressBook: React.FC<AddressBookProps> = ({
  setActiveSection,
  activeSection,
}) => {
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [isUpdatedAddress, setIsUpdatedAddress] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user: any = useSelector((state: any) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const userData = user as User;

      if (userData && userData.address && userData.address.length > 0) {
        const { address, apartment, area, city, contactNumber } =
          userData.address[0];
        const firstName = userData.firstName;
        const lastName = userData.lastName;

        formik.setFieldValue("firstName", firstName);
        formik.setFieldValue("lastName", lastName);
        formik.setFieldValue("area", area);
        formik.setFieldValue("address", address);
        formik.setFieldValue("apartment", apartment);
        formik.setFieldValue("city", city);
        if (contactNumber) {
          const phoneMatch = contactNumber.match(/^(\+\d{1,3})\s*(\d+)$/);
          if (phoneMatch) {
            formik.setFieldValue("phoneCode", phoneMatch[1]);
            formik.setFieldValue("phoneNumber", phoneMatch[2]);
          }
        }
      }
    }
  }, [user]);

  const onRemoveAddress = (id: string) => {
    setIsDeleteModalOpen(true);
    setSelectedItemId(id);
  };
  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    if (!selectedItemId) {
      toast.error("No address selected for deletion");
      return;
    }
    dispatch(deleteAddress({ id: selectedItemId }))
      .unwrap()
      .then((res) => {
        toast.success(`Address removed successfully`);
      })
      .catch((err) => {
        toast.error("Failed to removed Address");
      });
  };
  const handleAddNewClick = () => {
    setIsNewAddress(true);
    setIsUpdatedAddress(false);
    setSelectedAddress(null);
    formik.resetForm();
  };
  const handleUpdate = (addressId: string) => {
    setIsUpdatedAddress(true);
    setIsNewAddress(false);

    const address = user?.address?.find(
      (addr: any) => addr.addressId === addressId
    );
    if (address) {
      setSelectedAddress(address);
      formik.setValues({
        firstName: address.firstName || "",
        lastName: address.lastName || "",
        city: address.city || "",
        area: address.area || "",
        address: address.address || "",
        apartment: address.apartment || "",
        phoneCode: address.contactNumber?.match(/^(\+\d{1,3})/)?.[1] || "",
        phoneNumber:
          address.contactNumber?.replace(/^(\+\d{1,3})\s*/, "") || "",
      });
    }
  };
  const handleCancel = () => {
    setIsNewAddress(false);
    setIsUpdatedAddress(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      city: "",
      area: "",
      address: "",
      phoneCode: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      apartment: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values: any) => {
      const token = getDecodedToken();
      setLoading(true);
      const { phoneNumber, phoneCode, ...rest } = values;

      const payload = {
        contactNumber: `${phoneCode} ${phoneNumber}`,
        type: "PRIMARY",
        userId: token?.userId,
        ...rest,
      };
      if (isUpdatedAddress) {
        dispatch(
          updateAddress({
            addressId: selectedAddress?.addressId,
            data: payload,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("Address updated successfully");
            setIsUpdatedAddress(false);
            setIsNewAddress(false);
            formik.resetForm();
          })
          .catch((error) => {
            toast.error(error || "Failed to update address");
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // If creating a new address
        dispatch(createAddress({ data: payload }))
          .unwrap()
          .then(() => {
            toast.success("Address created successfully");
            setIsNewAddress(false);
            formik.resetForm();
          })
          .catch((error) => {
            toast.error(error || "Failed to create address");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
  });
  return (
    <React.Fragment>
      <Grid
        size={{ xs: 12, md: 8 }}
        component="div"
        sx={{ marginLeft: "15px" }}
      >
        <>
          <Typography
            sx={{
              marginBottom: "20px",
              fontSize: "22px",
              color: "#3C3837",
              letterSpacing: "4%",
              fontFamily: "GaretHeavy",
            }}
          >
            {isNewAddress
              ? "Add a new address"
              : isUpdatedAddress
              ? "Update Address"
              : " Address Book"}
            {/* Change title based on the mode */}
          </Typography>
          {!isNewAddress && !isUpdatedAddress && (
            <>
              <Typography
                sx={{
                  marginTop: "5px",
                  fontSize: "14px",
                  color: "#2E2B2A",
                  letterSpacing: "2%",
                }}
              >
                You can update or delete your saved addresses during checkout.
              </Typography>

              <List
                sx={{ marginTop: "15px", maxHeight: "350px", overflow: "auto" }}
              >
                {user?.address?.map((addr: any) => (
                  <ListItem
                    key={addr?.addressId}
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px 10px 0px 10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: "14px", color: "#2E2B2A" }}>
                          {addr?.firstName} {addr?.lastName}, {addr?.address},{" "}
                          {addr?.apartment}, {addr?.area}, {addr?.city}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ fontSize: "12px", color: "#757575" }}>
                          Contact: {addr?.contactNumber}
                        </Typography>
                      }
                    />
                    <Tooltip title="Edit Address" arrow placement="top">
                      <IconButton
                        onClick={() => handleUpdate(addr?.addressId)}
                        sx={{ color: "#2E2B2A" }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Address" arrow placement="right">
                      <IconButton
                        onClick={() => onRemoveAddress(addr?.addressId)}
                        sx={{ color: "error" }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {!isNewAddress && !isUpdatedAddress && (
            <Button
              variant="outlined"
              sx={{
                borderRadius: "0px",
                border: "1px solid #3C3837",
                width: "110px",
                color: "#A44819",
                height: "40px",
                marginTop: "40px",
              }}
              onClick={handleAddNewClick}
            >
              Add New
            </Button>
          )}
          {(isNewAddress || isUpdatedAddress) && (
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ display: "grid", gap: 2 }}
            >
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
                    ? (formik.errors.city as any)
                    : undefined
                }
                placeholder="Riyadh"
                noBorderRadius
                sx={{ marginTop: "-10px" }}
                inputfieldHeight="35px"
              />

              <GenericInput
                label="Area"
                name="area"
                type="text"
                noBorderRadius
                value={formik.values.area}
                onChange={formik.handleChange("area")}
                onBlur={formik.handleBlur("area")}
                error={formik.touched.area && Boolean(formik.errors.area)}
                helperText={
                  formik.touched.area && formik.errors.area
                    ? (formik.errors.area as any)
                    : undefined
                }
                placeholder="e.g. Al Wizarat"
                sx={{ marginTop: "-10px" }}
                inputfieldHeight="35px"
              />

              <GenericInput
                label="Delivery Address"
                name="address"
                type="text"
                noBorderRadius
                inputfieldHeight="35px"
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                onBlur={formik.handleBlur("address")}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={
                  formik.touched.address && formik.errors.address
                    ? (formik.errors.address as any)
                    : undefined
                }
                placeholder="e.g. 11 Kaiyuan Road"
                sx={{ marginTop: "-10px" }}
              />
              <GenericInput
                label="Apartment "
                name="apartment"
                type="text"
                noBorderRadius
                value={formik.values.apartment}
                onChange={formik.handleChange("apartment")}
                onBlur={formik.handleBlur("apartment")}
                error={
                  formik.touched.apartment && Boolean(formik.errors.apartment)
                }
                helperText={
                  formik.touched.apartment && formik.errors.apartment
                    ? (formik.errors.apartment as any)
                    : undefined
                }
                placeholder="e.g. Apartment 2101"
                sx={{ marginTop: "-10px" }}
                inputfieldHeight="35px"
              />

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
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                        ? (formik.errors.firstName as any)
                        : undefined
                    }
                    placeholder="Anne Marie"
                    sx={{ marginTop: "5px" }}
                    inputfieldHeight="35px"
                    noBorderRadius
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
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                        ? (formik.errors.lastName as string)
                        : undefined
                    }
                    placeholder="Nichols"
                    sx={{ marginTop: "5px" }}
                    noBorderRadius
                    inputfieldHeight="35px"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid size={{ xs: 2.5 }} component="div">
                  <CustomPhoneField
                    label="Phone Code"
                    name="phoneCode"
                    value={formik.values.phoneCode}
                    onChange={formik.handleChange("phoneCode")}
                    onBlur={() => formik.handleBlur("phoneCode")}
                    error={
                      formik.touched.phoneCode &&
                      Boolean(formik.errors.phoneCode)
                    }
                    helperText={
                      formik.touched.phoneCode
                        ? (formik.errors.phoneCode as any)
                        : undefined
                    }
                    placeholder="+966"
                    sx={{ marginTop: "0px" }}
                    noBorderRadius
                    inputfieldHeight="35px"
                  />
                </Grid>
                <Grid size={{ xs: 9.5 }} component="div">
                  <GenericInput
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange("phoneNumber")}
                    onBlur={formik.handleBlur("phoneNumber")}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? (formik.errors.phoneNumber as any)
                        : undefined
                    }
                    placeholder="555123456"
                    sx={{ marginTop: "10px" }}
                    labelStyle={{ marginTop: "9px" }}
                    noBorderRadius
                    inputfieldHeight="35px"
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "0px",
                    border: "1px solid #3C3837",
                    width: "27%",
                    color: "#A44819",
                    height: "40px",
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    borderRadius: "0px",
                    border: "1px solid #3C3837",
                    width: "27%",
                    color: "#A44819",
                    height: "40px",
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
                    " Save"
                  )}
                </Button>
              </Box>
            </Box>
          )}

          <Box
            onClick={() => {
              setActiveSection("My account");
            }}
            sx={{
              marginTop: "50px",
              color: "#3C3837",
              textDecorationColor: "#3C3837",
              textDecorationThickness: "1px",
              textUnderlineOffset: "2px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Back to my account
          </Box>
        </>
      </Grid>
      <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Remove Address"
        description="Are you sure you want to remove this address?"
        proceed={() => handleDelete()}
        cancel={() => {
          setIsDeleteModalOpen(false);
        }}
      />
    </React.Fragment>
  );
};

export default AddressBook;
