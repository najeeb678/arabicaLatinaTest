import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { confirmOrder } from "@/redux/slices/orderSlice";

export default function PaymentDetails({
  setActiveStep,
  amount,
  orderId,
  setOrderCompleted,
}: {
  setActiveStep: (step: number) => void;
  amount: number;
    orderId: string;
    setOrderCompleted: any;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "SA", 
      currency: "sar", 
        total: {
          label: "Total",
          amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      if (pr) {
        pr.canMakePayment()
          .then((result: any) => {
            // console.log("Apple Pay Availability Result:", result);
            if (result?.applePay) {
              setPaymentRequest(pr);
            } else {
              // console.log("Apple Pay not available on this device.");
            }
          })
          .catch((error: any) => {
            console.error("Error checking canMakePayment:", error);
          });
      }
    }
  }, [stripe, amount]);
  const handlePayment = async () => {
    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet!");
      return;
    }

    setLoading(true);

    try {
      const response: any = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      // console.log("Raw Stripe response:", response);

      if ("error" in response) {
        // console.error("Payment error:", response.error);
        setMessage(response.error.message || "Payment failed!");
      } else if (
        "paymentIntent" in response &&
        response.paymentIntent?.status === "succeeded"
      ) {
        // console.log("Successful Payment Response:", response);
        dispatch(confirmOrder({ orderId: orderId })).unwrap();
        setActiveStep(2);
        setOrderCompleted(true);
        setMessage("Payment successful!");
      } else {
        // console.warn("Payment failed or pending:", response);
        setMessage("Payment failed or pending.");
      }
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  // const handlePayment = async () => {
  //   if (!stripe || !elements) {
  //     setMessage("Stripe has not loaded yet!");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response: any = await stripe.confirmPayment({
  //       elements,
  //       confirmParams: {
  //         return_url: window.location.href,
  //       },
  //       redirect: "if_required",
  //     });
  //     console.log("Raw response:", response);
  //     if ("error" in response) {
  //       setMessage(response.error.message || "Payment failed!");
  //     } else if (
  //       "paymentIntent" in response &&
  //       response.paymentIntent?.status === "succeeded"
  //     ) {
  //       console.log("payment response", response);
  //       setActiveStep(2);
  //       setMessage("Payment successful!");
  //     } else {
  //       setMessage("Payment failed or pending.");
  //     }
  //   } catch (err) {
  //     console.error("Payment error:", err);
  //     setMessage("An error occurred while processing the payment.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <Box
        sx={{ backgroundColor: "#f0e2cb", height: "50px", padding: "5px 15px" }}
      >
        <Typography
          sx={{ fontSize: "14px", lineHeight: "50px", fontWeight: "bold",color:"3E3F20" }}
        >
          SELECT PAYMENT METHOD
        </Typography>
      </Box>

      <Box
        sx={{
          border: "1px solid #2E2B2A",
          borderRadius: "5px",
          marginTop: "40px",
          padding: "20px",
          minHeight: "auto",
        }}
      >
        {/* Display Apple Pay if available */}
        {paymentRequest ? (
          <PaymentRequestButtonElement className="stripe-button" />
        ) : (
          <PaymentElement />
        )}
      </Box>
      <Divider sx={{ margin: "30px 0px 10px 0px" }} />
      <Box
        className="flex-space-between"
        sx={{
          height: "50px",
          flex: "0 0 auto",
          padding: "5px 15px",
        }}
      >
        <Typography
          component={"span"}
          sx={{
            fontSize: "12px",
            lineHeight: "35px",
            color: "#2E2B2A",
            letterSpacing: "0.6px",
            fontWeight: "bold",
          }}
        >
          By clicking place order, you are agreeing to the{" "}
          <span
            style={{
              fontFamily: "GaretHeavy",
              lineHeight: "35px",
              color: "#868282",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => router.push("/legal/payment-policy")}
          >
            Terms & Conditions
          </span>
        </Typography>
        <button
          onClick={handlePayment}
          disabled={!stripe || loading}
          style={{
            backgroundColor: "#3e3f20",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Processing..." : `Pay $ ${amount} `}
        </button>
      </Box>

      {message && <p>{message}</p>}
    </div>
  );
}

//working without apple pay
// import { useState } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { Box, Divider, Typography } from "@mui/material";

// export default function PaymentDetails({
//   setActiveStep,
//   amount,
// }: {
//   setActiveStep: (step: number) => void;
//   amount: number;
// }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = async () => {
//     if (!stripe || !elements) {
//       setMessage("Stripe has not loaded yet!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response: any = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: window.location.href,
//         },
//         redirect: "if_required",
//       });

//       if ("error" in response) {
//         setMessage(response.error.message || "Payment failed!");
//       } else if (
//         "paymentIntent" in response &&
//         response.paymentIntent?.status === "succeeded"
//       ) {
//         console.log("payment response", response);
//         setActiveStep(2);
//         setMessage("Payment successful!");
//       } else {
//         setMessage("Payment failed or pending.");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       setMessage("An error occurred while processing the payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Box
//         sx={{ backgroundColor: "#f0e2cb", height: "50px", padding: "5px 15px" }}
//       >
//         <Typography
//           sx={{ fontSize: "14px", lineHeight: "50px", fontWeight: "bold" }}
//         >
//           SELECT PAYMENT METHOD
//         </Typography>
//       </Box>

// <Box
//sx={{
// border: "1px solid #2E2B2A",
// borderRadius: "5px",
// marginTop: "40px",
// padding: "20px",
//height: "auto",
//}}
//> }
//         <PaymentElement />
//       </Box>
//       <Divider sx={{ margin: "22px 0px 5px 0px" }} />
//       <Box
//         className="flex-space-between"
//         sx={{
//           height: "50px",
//           flex: "0 0 auto",
//           padding: "5px 15px",
//         }}
//       >
//         <Typography
//           component={"span"}
//           sx={{
//             fontSize: "12px",
//             lineHeight: "35px",
//             color: "#2E2B2A",
//             letterSpacing: "0.6px",
//             fontWeight: "bold",
//           }}
//         >
//           By clicking place order, you are agreeing to the{" "}
//           <span
//             style={{
//               fontFamily: "GaretHeavy",
//               lineHeight: "35px",
//               color: "#868282",
//               textDecoration: "underline",
//             }}
//           >
//             Therms & Conditions
//           </span>
//         </Typography>
//         <button
//           onClick={handlePayment}
//           disabled={!stripe || loading}
//           style={{
//             backgroundColor: "#3e3f20",
//             color: "#fff",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: loading ? "not-allowed" : "pointer",
//             opacity: loading ? 0.6 : 1,
//           }}
//         >
//           {loading ? "Processing..." : `Pay $ ${amount} `}
//         </button>
//       </Box>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }
