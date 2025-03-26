import { Box, Typography, Divider } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const PaymentPolicyPart = () => {
  return (
    <>
      <Typography
        sx={{
          fontSize: "25px",
          color: "#2E2B2A",
          lineHeight: "50px",
          cursor: "pointer",
          marginTop: "60px",
          letterSpacing: "2%",
          marginRight: "20px",
        }}
      >
        Payment information
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "50px",
          cursor: "pointer",
          fontFamily: "GaretHeavy",
          letterSpacing: "2%",
          marginRight: "20px",
        }}
      >
        What payment methods can I use to shop at Arabica Latina?
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginRight: "20px",
        }}
      >
        At Arabica Latina, we offer a variety of convenient payment methods to
        make your shopping experience smooth and easy:
        <br />
        Credit/Debit Cards: Visa, Mastercard, and Apple pay.
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "50px",
          cursor: "pointer",
          fontFamily: "GaretHeavy",
          letterSpacing: "2%",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        Why is my payment declined?
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginRight: "20px",
        }}
      >
        This may happen for a few reasons, like the CVV number not matching your
        card, the card number is wrong, or that your card has insufficient
        funds. In these cases, you will see an instant message on your order
        review screen. If the error persists, please contact your bank to see if
        there's an issue with your card.
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "50px",
          cursor: "pointer",
          fontFamily: "GaretHeavy",
          letterSpacing: "2%",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        I'm having trouble using my promo code. What could be the issue?
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginRight: "20px",
        }}
      >
        There are a few reasons why your promo code may not be working. Let's
        check some common reasons:
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginLeft: "20px",
          marginTop: "10px",
        }}
      >
        <ul>
          <li>
            Validity and Terms: Promo codes have specific terms and conditions,
            make sure you're using the code before it expires, and check if your
            purchase meets the criteria stated in the terms. 
          </li>
          <br />

          <li>
            Exclusivity: Some codes may be limited to a specific brand or item
            and limited to single use only. If you've already used the code, it
            won't work again. 
          </li>
          <br />
          <li>
            Exclusions Apply: Keep in mind that certain items, like fine
            jewellery and select products, may not be eligible for the discount.
            Make sure your chosen items qualify for the offer.
          </li>
          <br />
          <li>
            Combining Offers: Promo codes usually cannot be used with other
            offers, sales, or promotions. Check if you're trying to use the code
            alongside another deal.
          </li>
          <br />
          <li>
            Cash Redemption: Promo codes typically cannot be exchanged for
            cash.  If your code still isn't working and you believe it should,
            feel free to reach out to our Customer Care team. They'll be happy
            to assist you and ensure you get the discount you deserve!
          </li>
        </ul>
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "50px",
          cursor: "pointer",
          fontFamily: "GaretHeavy",
          letterSpacing: "2%",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        How can I get details about my instalment plan?
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginRight: "20px",
        }}
      >
        For specific details about your instalment plan, kindly communicate with
        your bank. To review your selected instalment plans, visit the Order
        Details page under My Account. There, you can find information about
        your instalment payments. If you need further assistance, don't hesitate
        to reach out to us. 
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "50px",
          cursor: "pointer",
          fontFamily: "GaretHeavy",
          letterSpacing: "2%",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        How do I pay using Apple Pay?
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginRight: "20px",
        }}
      >
        We now accept Apple Pay to facilitate payment on our app and devices
        that support Apple Pay. If you are using an iOS device, Apple Pay will
        be only available on Ounass app. If you are using a Mac device, Apple
        Pay will be only available on Safari browser. You can pay with Apple Pay
        using a Visa, Mastercard or American Express. To pay using Apple Pay,
        add the items to your bag and when you are ready to place your order,
        select Apple Pay at checkout.
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "50px",
          cursor: "pointer",
          fontFamily: "GaretHeavy",
          letterSpacing: "2%",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        How can I select my preferred payment currency?
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginRight: "20px",
          marginBottom: "100px",
        }}
      >
        We've made it easy for you, the currency will automatically be set to
        the currency of the region you're shopping from.
        <br />
        <br />
        If you have any further questions or doubts, please contact us through
        our whatsapp contact number, by email or through our official social
        media accounts.
      </Typography>
    </>
  );
};

export default PaymentPolicyPart;
