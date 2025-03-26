import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Stack,
  Link,
  Button,
} from "@mui/material";

import { fetchUserDetails, updateUserDetails } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { User } from "@/redux/slices/authSlice";
import BasicDatePicker from "@/_components/common/DatePicker/BasicDatePicker";
import dayjs, { Dayjs } from "dayjs";
import CustomLoader from "@/_components/common/CustomLoader";

interface AccountSectionProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

const AccountPage: React.FC<AccountSectionProps> = ({
  setActiveSection,
  activeSection,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user: User | any = useSelector((state: RootState) => state.auth.user);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    dateOfBirth: Dayjs | null;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dateOfBirth: null,
  });

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserDetails())
      .unwrap()
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const userData = user as User;
      setFormData({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        contactNumber: userData?.contactNumber || "",
        dateOfBirth: userData?.dateOfBirth ? dayjs(userData.dateOfBirth) : null,
      });
    }
  }, [user]);

  const handleSave = () => {
    const updatedUserDetails = {
      email: formData.email,
      contactNumber: formData.contactNumber,
      dateOfBirth: formData.dateOfBirth?.format("YYYY-MM-DD") || undefined,
    };

    dispatch(updateUserDetails(updatedUserDetails));
    setIsEditable(false);
    if (user) {
      const userData = user as User;
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: formData.email,
        contactNumber: formData.contactNumber,
        dateOfBirth: formData.dateOfBirth || null,
      });
    }
  };

  const handleCancel = () => {
    setIsEditable(false);
    if (user) {
      const userData = user as User;
      setFormData({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        contactNumber: userData?.contactNumber || "",
        dateOfBirth: userData?.dateOfBirth ? dayjs(userData.dateOfBirth) : null,
      });
    }
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontFamily: "GaretHeavy",
            color: "#3C3837",
            fontSize: "22px",
          }}
        >
          Profile
        </Typography>
        <Button
          variant="text"
          sx={{ color: "#5B4635", textTransform: "none" }}
          onClick={() => setIsEditable(true)}
        >
          Edit
        </Button>
      </Box>
      <Divider sx={{ marginY: "8px" }} />
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <Typography
            sx={{
              color: "#2E2B2A",
              fontSize: "14px",
              marginTop: "25px",
            }}
          >
            First Name
          </Typography>
          <TextField
            value={formData.firstName}
            placeholder={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            disabled={!isEditable}
            name="firstName"
            variant="outlined"
            sx={{
              marginLeft: "-10px",
              marginTop: "8px",
              fontSize: "14px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                border: "none",
                "& fieldset": {
                  border: "none",
                },
                "& input": {
                  height: "40px",
                  padding: "0 12px",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              style: {
                fontSize: "14px",
              },
            }}
          />

          <Typography
            sx={{
              color: "#2E2B2A",
              fontSize: "14px",
              marginTop: "25px",
            }}
          >
            Last Name
          </Typography>
          <TextField
            value={formData.lastName}
            placeholder={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            disabled={!isEditable}
            name="firstName"
            variant="outlined"
            sx={{
              marginLeft: "-10px",
              marginTop: "8px",
              fontSize: "14px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                border: "none",
                "& fieldset": {
                  border: "none",
                },
                "& input": {
                  height: "40px",
                  padding: "0 12px",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              style: {
                fontSize: "14px",
              },
            }}
          />

          <Typography
            sx={{
              color: "#2E2B2A",
              fontSize: "14px",
              marginTop: "25px",
            }}
          >
            Email
          </Typography>
          <TextField
            value={formData.email}
            placeholder={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={!isEditable}
            name="firstName"
            variant="outlined"
            sx={{
              marginLeft: "-10px",
              marginTop: "8px",
              fontSize: "14px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                border: "none",
                "& fieldset": {
                  border: "none",
                },
                "& input": {
                  height: "40px",
                  padding: "0 12px",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              style: {
                fontSize: "14px",
              },
            }}
          />

          <Typography
            sx={{
              color: "#2E2B2A",
              fontSize: "14px",
              marginTop: "25px",
            }}
          >
            Phone number
          </Typography>
          <TextField
            value={formData.contactNumber}
            placeholder={formData.contactNumber}
            onChange={(e) =>
              setFormData({ ...formData, contactNumber: e.target.value })
            }
            disabled={!isEditable}
            name="firstName"
            variant="outlined"
            sx={{
              marginLeft: "-10px",
              marginTop: "8px",
              fontSize: "14px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                border: "none",
                "& fieldset": {
                  border: "none",
                },
                "& input": {
                  height: "40px",
                  padding: "0 12px",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              style: {
                fontSize: "14px",
              },
            }}
          />

          <Typography
            sx={{
              color: "#2E2B2A",
              fontSize: "14px",
              marginTop: "25px",
            }}
          >
            Birthday
          </Typography>
          <BasicDatePicker
            label=""
            value={formData.dateOfBirth}
            disabled={!isEditable}
            format="MMM D, YYYY"
            onChange={(newValue: any) =>
              setFormData({ ...formData, dateOfBirth: newValue })
            }
            sx={{
              fontSize: "14px",
              height: "45px",
              border: "none !important",
            }}
          />

          {isEditable && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ marginTop: "10px" }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "0px ",
                  border: "1px solid #3C3837",
                  width: "50%",
                  color: "#3C3837",
                  height: "40px",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "0px ",
                  border: "1px solid #3C3837",
                  width: "50%",
                  color: "#3C3837",
                  height: "40px",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>
          )}
        </>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "80px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontFamily: "GaretHeavy",
            color: "#3C3837",
            fontSize: "22px",
          }}
        >
          Password
        </Typography>
        <Button
          variant="text"
          sx={{ color: "#5B4635", textTransform: "none" }}
          onClick={() => {
            setActiveSection("Password");
          }}
        >
          Edit
        </Button>
      </Box>
      <Divider sx={{ marginY: "8px" }} />

      <TextField
        placeholder="**************"
        name="password"
        variant="outlined"
        disabled
        sx={{
          marginLeft: "-10px",
          marginTop: "8px",
          fontSize: "14px",
          "& .MuiOutlinedInput-root": {
            border: "none",
            "& fieldset": {
              border: "none",
            },
            "& input": {
              height: "40px",
              padding: "0 12px",
              borderRadius: "8px",
            },
          },
        }}
        InputProps={{
          style: {
            fontSize: "14px",
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontFamily: "GaretHeavy",
            color: "#3C3837",
            fontSize: "22px",
          }}
        >
          Address Book
        </Typography>
      </Box>
      <Divider sx={{ marginY: "8px" }} />
      <Button
        variant="outlined"
        sx={{
          borderRadius: "0px",
          border: "1px solid #3C3837",
          width: "110px",
          color: "#A44819",
          height: "40px",
          marginTop: "10px",
        }}
        onClick={() => {
          setActiveSection("Address Book");
        }}
      >
        Add New
      </Button>
    </Box>
  );
};

export default AccountPage;
function useAppDispatch() {
  throw new Error("Function not implemented.");
}
function useAppSelector(arg0: (state: any) => any): {
  user: any;
  loading: any;
} {
  throw new Error("Function not implemented.");
}
