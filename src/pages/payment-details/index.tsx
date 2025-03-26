import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import ShippingInfo from "@/_components/core/PaymentDetails/ShippingInfo";

import OrderSummary from "@/_components/core/PaymentDetails/OrderSummary";
import { Stepper, Step, StepLabel } from "@mui/material";
import CustomStepIcon from "@/_components/core/PaymentDetails/CustomStepIcon";
import Grid from "@mui/material/Grid2";
import DeliveryAddressCard from "@/_components/core/PaymentDetails/DeliveryAddressCard";
import PaymentDetails from "@/_components/core/PaymentDetails/PaymentDetails";
import ThankYouPage from "../thank-you";
import PaymentWrapper from "@/_components/core/PaymentDetails/PaymentWrapper";
import { fetchAllCartItems } from "@/redux/slices/orderSlice";
import CustomLoader from "@/_components/common/CustomLoader";
import NoDataAvailable from "@/_components/common/NoDataAvailable/NoDataAvailable";
import { CheckCircleIcon, CircleCheck, CircleIcon } from "lucide-react";
const steps = ["Shipping information", "Payment details", "Order confirmation"];

const Payment = () => {
  const dispatch: AppDispatch = useDispatch();

  const { cartItems, cartItemsLoading } = useSelector(
    (state: RootState) => state.order
  );
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState();
  const [isClient, setIsClient] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  useEffect(() => {
    setIsClient(true);
    setOrderCompleted(false);
  }, []);

  const [orderDetailsForCardPayment, setOrderDetailsForCardPayment] = useState({
    orderId: null,
    finalAmount: null,
  });
  if (!isClient) {
    return null;
  }
  const CustomStepIcon = (props: any) => {
    const { active, completed } = props;

    if (completed) {
      return (
        <img
          src="/Images/checkCircle.svg"
          alt="Completed"
          style={{ width: "24px", height: "24px" }}
        />
      );
    }

    return active ? (
      <img
        src="/Images/checkCircle.svg"
        alt="Completed"
        style={{ width: "24", height: "24px" }}
      />
    ) : (
      <CircleIcon
        style={{
          color: "#C48E70",
          fill: "#C48E70",
          width: "22px",
          height: "22px",
        }}
      />
    );
  };

  return cartItemsLoading ? (
    <CustomLoader />
  ) : cartItems?.CartItems?.length === 0 && !orderCompleted ? (
    <NoDataAvailable
      message="Your cart is currently empty."
      description="Start shopping now and fill it up!"
      navigationLink="/"
    />
  ) : (
    <>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box> */}
      <Box sx={{ padding: { xs: "20px", md: "50px" } }}>
        <Stepper
          sx={{
            "& .MuiStepConnector-line": {
              borderColor: "#C48E70",
              borderTopWidth: 2,
            },
            "& .MuiStepLabel-label": {
              color: "#2E2B2A",
              fontSize: "14px",
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: "#8B5E3B",
              fontWeight: "bold",
            },
            "& .MuiStepLabel-label.Mui-completed": {
              color: "#8B5E3B",
              fontWeight: "bold",
            },
            "& .MuiStep-root": {
              padding: "0 0px",
            },
          }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          {/* Left Side - Dynamic Content */}
          <Grid size={{ xs: 12, md: 7 }}>
            {activeStep === 0 && (
              <ShippingInfo
                setShippingInfo={setShippingInfo}
                setActiveStep={setActiveStep}
                setOrderDetailsForCardPayment={setOrderDetailsForCardPayment}
                setOrderCompleted={setOrderCompleted}
              />
            )}
            {activeStep === 1 && (
              <PaymentWrapper
                orderDetailsForCardPayment={orderDetailsForCardPayment}
                setActiveStep={setActiveStep}
                setOrderCompleted={setOrderCompleted}
              />
            )}
          </Grid>

          {/* Right Side - Order Summary */}

          <Grid container spacing={2} size={{ xs: 12, md: 5 }}>
            {activeStep === 1 && (
              <DeliveryAddressCard
                shippingInfo={shippingInfo}
                setActiveStep={setActiveStep}
              />
            )}
            {(activeStep === 0 || activeStep === 1) && (
              <OrderSummary
                cartItems={cartItems.CartItems}
                orderDetailsForCardPayment={orderDetailsForCardPayment}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12 }}>{activeStep === 2 && <ThankYouPage />}</Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Payment;
