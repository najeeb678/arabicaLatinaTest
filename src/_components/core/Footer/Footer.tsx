import CustomTypography from "@/_components/common/CustomTypography";
import GenericInput from "@/_components/common/GenericInput";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import Grid from "@mui/material/Grid2";
import { subscribeUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BasicModal from "@/_components/common/CustomModal/BasicModal";
import LoginPrompt from "../Shopping/LoginPrompt";
import { isLoggedIn } from "@/utils/utils";
import { useRouter } from "next/router";
const Footer = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const isBelow = useMediaQuery("(max-width:400px)");
  const router = useRouter();
  let customerServices = [
    { label: "Payment policy", path: "/legal/payment-policy" },
    { label: "Shipping policy", path: "/legal/shipping-policy" },
    { label: "Shipping and delivery", path: "/legal/shipping-and-delivery" },
    { label: "All sales are final", path: "/legal/all-sales-are-final" },
    { label: "Privacy policy", path: "/legal/privacy-policy" },
  ];
  let information = [
    { label: "About Us", path: "/information/about-us" },
    { label: "Size Guide", path: "/information/size-guide" },
    { label: "Jewelry Care", path: "/information/jewelry-care" },
    { label: "Jewelry Warranty", path: "/information/jewelry-warranty" },
  ];
  let contactUs = ["Phone: (123) 456-7890", "Email: info@example.com"];
  let subscribe = [
    "Join our subscriber list and receive updates on our unique natural alpaca fiber pieces and handmade jewelry.",
  ];
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() !== "") {
      dispatch(subscribeUser({ subscription: true, email: email }))
        .unwrap()
        .then(() => {
          toast.success(
            "Subscription successful! Check your inbox for updates."
          );
          setEmail("");
        })
        .catch((error) => {
          toast.error(
            error?.message || "Subscription failed. Please try again."
          );
        });
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#efe1ca",
        height: "auto",
      }}
    >
      <Grid
        container
        justifyContent={"space-between"}
        spacing={1}
        sx={{ width: "85%", margin: "0px auto 0px auto", padding: "0px 10px" }}
      >
        {/* Customer Service Section */}
        <Grid component="div" size={{ xs: 12, md: 3.5 }}>
          <CustomTypography
            sx={{
              fontSize: "12px",

              marginBottom: "20px",
              marginTop: "30px",
              fontFamily: "GaretHeavy",
            }}
          >
            Customer Service
          </CustomTypography>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            {customerServices.map((service, index) => (
              <CustomTypography
                key={index}
                onClick={() => {
                  router.push(service.path);
                }}
                sx={{
                  fontSize: "14px",
                  fontWeight: "300",
                  marginBottom: "10px",
                  cursor: "pointer",

                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {service?.label}
              </CustomTypography>
            ))}
          </Box>
        </Grid>

        {/* Information Section */}
        <Grid component="div" size={{ xs: 6, md: 2.5 }} flexDirection="column">
          <CustomTypography
            sx={{
              fontSize: "12px",

              marginBottom: "20px",
              marginTop: "30px",
              fontFamily: "GaretHeavy",
            }}
          >
            Information
          </CustomTypography>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "8px" }}
          >
            {information.map((info, index) => (
              <CustomTypography
                key={index}
                onClick={() => {
                  router.push(info?.path);
                }}
                sx={{
                  fontSize: "14px",
                  fontWeight: "300",
                  marginBottom: "8px",
                  cursor: "pointer",

                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {info?.label}
              </CustomTypography>
            ))}
          </Box>
        </Grid>

        {/* Contact Us Section */}
        <Grid
          component="div"
          size={{ xs: isBelow ? 12 : 6, md: 2.5 }}
          flexDirection="column"
        >
          <CustomTypography
            sx={{
              fontSize: "12px",

              marginBottom: "20px",
              marginTop: "30px",
              fontFamily: "GaretHeavy",
            }}
          >
            Contact Us
          </CustomTypography>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <CustomTypography
              sx={{
                fontSize: "14px",
                fontWeight: "300",
                marginBottom: "8px",
              }}
            >
              (01) 372 - 6060
            </CustomTypography>

            <a
              href="mailto:marhaba@arabmkt.com"
              style={{ textDecoration: "none" }}
            >
              <CustomTypography
                sx={{
                  marginTop: "10px",
                  fontSize: "14px",
                  fontWeight: "300",
                  marginBottom: "8px",
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#3E3F20",
                  "&:hover": { color: "#A44819" },
                }}
              >
                marhaba@arabmkt.com
              </CustomTypography>
            </a>

            <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {[
                {
                  icon: <FaInstagram />,
                  url: "https://www.instagram.com/arabica.latina/",
                },
                {
                  icon: <FaFacebook />,
                  url: "https://www.facebook.com/profile.php?id=61573982626748/",
                },
                {
                  icon: <FaLinkedin />,
                  url: "https://www.linkedin.com/company/arabicalatina/?viewAsMember=true",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {React.cloneElement(item.icon, {
                    size: 22,
                    style: { cursor: "pointer", color: "#000" },
                  })}
                </a>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Subscribe Section */}
        <Grid
          component="div"
          size={{ xs: 12, md: 3.5 }}
          flexDirection="column"
          sx={{ marginBottom: "50px" }}
        >
          <CustomTypography
            sx={{
              fontSize: "12px",
              marginBottom: "20px",
              marginTop: "30px",
              fontFamily: "GaretHeavy",
            }}
          >
            Subscribe
          </CustomTypography>
          <Box flexDirection={"column"}>
            <CustomTypography
              sx={{
                color: "#3E3F20",
                fontSize: "12px",
                maxWidth: "360px",
                lineHeight: "18px",
                marginBottom: "20px",
                marginTop: "25px",
              }}
            >
              Join our subscriber list and receive updates on our unique <br />
              natural alpaca fiber pieces and handmade jewelry
            </CustomTypography>
            <form onSubmit={handleSubscribe}>
              <GenericInput
                name="email"
                type="email"
                editIcon={false}
                value={email}
                onChange={(val) => setEmail(val)}
                placeholder="Enter Email"
                noBorderRadius
                sx={{
                  backgroundColor: "#f8f1e6",
                  width: "100%",
                  height: "40px",
                  marginTop: "25px",
                  marginBottom: "20px",
                }}
              />
              <Button
                type="submit"
                sx={{
                  width: "100%",
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#aaa6a3",
                  height: "40px",
                  backgroundColor: "#fff",
                  border: "1px solid #aaa6a3",
                  borderRadius: "0px",
                  transition: "background-color 0.3s, color 0.3s",
                  "&:hover": {
                    fontSize: "16px",
                    backgroundColor: "#aa7537",
                    color: "#fff",
                    border: "1px solid #fff",
                  },
                }}
              >
                Register Now
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
      <BasicModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      >
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      </BasicModal>
    </Box>
  );
};

export default Footer;
