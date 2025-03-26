import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentDetails from "./PaymentDetails";
import { useEffect, useMemo, useState } from "react";
import CustomLoader from "@/_components/common/CustomLoader";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
interface PaymentDetailsProps {
  setActiveStep: (step: number) => void;
  orderDetailsForCardPayment: any;
  setOrderCompleted: any;
}

export default function PaymentWrapper({
  orderDetailsForCardPayment,
  setActiveStep,
  setOrderCompleted,
}: PaymentDetailsProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch(
          "https://api.arabiclatina.com/payments/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: orderDetailsForCardPayment.orderId,
              amount: orderDetailsForCardPayment.finalAmount,
              currency: "sar",
            }),
          }
        );

        const data = await response.json();

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error fetching payment intent!", err);
      }
    };

    fetchPaymentIntent();
  }, [orderDetailsForCardPayment]);

  // const options = useMemo(() => ({ clientSecret }), [clientSecret]);
  const options = useMemo(
    () => (clientSecret ? { clientSecret } : undefined),
    [clientSecret]
  );

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <PaymentDetails
        setActiveStep={setActiveStep}
        amount={orderDetailsForCardPayment.finalAmount}
        orderId={orderDetailsForCardPayment.orderId}
        setOrderCompleted={setOrderCompleted}
      />
    </Elements>
  ) : (
    <CustomLoader />
  );
}
