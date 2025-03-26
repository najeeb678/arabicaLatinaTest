import React, { useState, useEffect } from "react";
import styles from "./SubscribeModal.module.css";
import Grid from "@mui/material/Grid2";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { RxCross2 } from "react-icons/rx";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { subscribeUser } from "@/redux/slices/authSlice";
import BasicModal from "@/_components/common/CustomModal/BasicModal";
import LoginPrompt from "../Shopping/LoginPrompt";
import { isLoggedIn } from "@/utils/utils";

import dynamic from "next/dynamic";

const MaskGroupImage = dynamic(() => import("./MaskGroupImage"), { ssr: true });
const SubscribeModal = ({
  isModalVisible = false,
  flag = false,
  onClose,
}: {
  isModalVisible?: boolean;
  flag?: boolean;
  onClose?: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(isModalVisible);
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const isBelow700 = useMediaQuery("(max-width:700px)");
  useEffect(() => {
    setIsVisible(isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    const lastSeenTime = localStorage.getItem("subscribeModalLastSeen");
    const THIRTY_MINUTES = 30 * 60 * 1000; // Convert 30 min to milliseconds

    if (!flag) {
      const currentTime = Date.now(); // Get current timestamp

      if (
        !lastSeenTime ||
        currentTime - parseInt(lastSeenTime) > THIRTY_MINUTES
      ) {
        const timer = setTimeout(() => {
          setIsVisible(true);
          localStorage.setItem(
            "subscribeModalLastSeen",
            currentTime.toString()
          ); // Store new timestamp
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [flag, isModalVisible]);

  const handleClose = () => {
    setIsVisible(false);

    if (onClose) onClose();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }

    dispatch(subscribeUser({ subscription: true, email: email }))
      .unwrap()
      .then(() => {
        toast.success("Subscription successful! Check your inbox for updates.");
        setEmail("");
        setTimeout(() => handleClose(), 2000);
      })
      .catch((error) => {
        toast.error(error?.message || "Subscription failed. Please try again.");
      });
  };
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <div
      className={`${styles.modalContainer} ${
        isVisible && isImageLoaded ? styles.visible : ""
      }`}
    >
      <div className={styles.modal}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: "0 20px",

            width: { xs: "auto", md: "800px" },
            height: { xs: "auto", md: "495px" },
          }}
        >
          <Grid
            component="div"
            size={{ xs: 12, sm: isBelow700 ? 12 : 7.5 }}
            sx={{ minHeight: "" }}
            className="flexCenter"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: { xs: "0 10px", sm: "0 30px" },
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "22px", sm: "25px" },
                  fontFamily: "GaretHeavy",
                  color: "#FFFFFF",
                  lineHeight: "24px",
                  width: "100%",
                  marginTop: "80px",
                  textAlign: "center",
                  marginBottom: "50px",
                }}
              >
                SUBSCRIBE NOW
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  color: "#FFFFFF",
                  lineHeight: "20px",
                  textAlign: "center",
                  letterSpacing: "0.2px",
                  marginBottom: "45px",
                }}
              >
                Join our subscriber list and receive updates on our unique
                alpaca fiber pieces, handmade jewelry and masbaha.
              </Typography>
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  style={{ width: "100%", height: "35px", paddingLeft: "10px" }}
                />
                <button type="submit" className={styles.subscribeBtn}>
                  Subscribe now
                </button>
              </form>

              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  color: "#FFFFFF",
                  lineHeight: "20px",
                  textAlign: "center",
                  letterSpacing: "0.2px",

                  marginBottom: "20px",
                }}
              >
                New registrants receive code for a 10% discount on first
                purchase.
              </Typography>
            </Box>
          </Grid>
          <Grid component="div" size={{ xs: 12, sm: 4.5 }} sx={{}}>
            {/* Load Image via Dynamic Import */}
            {!isBelow700 && <MaskGroupImage onLoad={handleImageLoad} />}
          </Grid>
          <RxCross2
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "5px",
              color: "#a44819",
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          />
        </Grid>
      </div>
      <BasicModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      >
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      </BasicModal>
    </div>
  );
};

export default SubscribeModal;
