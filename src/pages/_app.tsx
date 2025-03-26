import Layout from "@/_components/core/Layout/Layout";
import store from "@/redux/store";
import "@/styles/globals.css";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Theme from "@/styles/Theme/Theme";
import { ThemeProvider } from "@emotion/react";
import { Provider as StoreProvider } from "react-redux";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     // Fetch clientSecret from backend
//     fetch("https://api.arabiclatina.com/payments/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization only if token exists
//       },
//       body: JSON.stringify({
//         orderId: "29853ad0-e94c-4c58-a2c6-da2c21c4e309",
//         amount: 5000,
//         currency: "sar",
//       }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setClientSecret(data.clientSecret); // Save clientSecret
//       })
//       .catch((error) => {
//         console.error("Error fetching clientSecret:", error);
//       });
//   }, []);

//   if (!clientSecret) {
//     return <p>Loading...</p>; // Show a loading indicator while fetching
//   }
// // pi_3Qoi0qIbcr1VQY2l2FFxyYgN_secret_fpEHiH27NOQQoP7yMatG5WpyI
//   const options = {
//     clientSecret,
//     appearance: {
//       theme: "flat",
//     },
//   } as StripeElementsOptions;
  return (
    <div>
      <StoreProvider store={store}>
        <Elements stripe={stripePromise} >
          <ThemeProvider theme={Theme}>
            <ToastContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Elements>
      </StoreProvider>
    </div>
  );
}
