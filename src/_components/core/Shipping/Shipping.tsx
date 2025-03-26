import { Box, Typography, Divider } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Shipping = () => {
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
        Shipping policy
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
        I missed the delivery, how do I get the order reshipped?
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
        If you have missed the delivery of your order, don't worry; we're here
        to assist you.
        <br />
        We understand that sometimes it's challenging to be available for
        deliveries at all times. That's why we ensure 3 delivery attempts to
        accommodate your schedule in UAE.
        <br />
        <br />
        If you have missed all the delivery attempts or wish to schedule the
        delivery at a specific date and time that suits you best, please reach
        out to our customer care team via call or WhatsApp for instant support,
        or you can send us an email with your order number and delivery request.
        You can do this by visiting the Contact Us section on our website or
        app.
        <br />
        <br />
        Our dedicated customer care team will be delighted to assist you in
        rescheduling the delivery, ensuring you receive your order conveniently
        and without any hassle.
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
        How can I change my delivery address or scheduled delivery date?
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
        To update your delivery address or reschedule the delivery date, simply
        contact us using your registered phone number or send an email from the
        email associated with your account. Email verification might be
        necessary for any modifications. Our team will guide you through the
        process.
        <br />
        <br />
        Please remember that if your order is already shipped, changing the
        address might not be possible. Also, note that any changes should be
        within the original delivery country. If you used PayPal for payment,
        changing the address might not be possible as well.
        <br />
        <br />
        Do keep in mind that modifying the delivery address could affect the
        delivery timeline, possibly causing a delay in receiving your order.
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
        I didn't receive the gift with purchase with my purchase. What should I
        do?
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
        We are sorry to hear that. If you have not received your gift with
        purchase, there are a few possibilities to consider:
        <br />
        <br />
        Stock Availability: If you did not receive a gift with the purchase, it
        might be due to the stock being depleted. Please note that gifts with
        purchases are only available until stock lasts.
        <br />
        <br />
        Criteria for Eligibility: Make sure you meet all the criteria specified
        for receiving the gift with purchase, as mentioned on the banner or
        promotion details.
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
        When and how can I cancel my order?
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
        You can cancel your order if it has not been shipped yet. To do so,
        follow these simple steps:
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
        1. Visit the My Orders section on our app or website.
        <br />
        2. Click on "View Order Details" for the specific order you wish to
        cancel.
        <br />
        3. At the bottom of the order details page, you will find the option to
        "Cancel Order."
        <br />
        4. Click on "Cancel Order" to initiate the cancellation process.
        <br />
        If your payment has already been processed, rest assured that a refund
        will be issued within 5-14 business days.
        <br />
        <br />
        Please keep in mind that you can only cancel your order if it has not
        been dispatched for shipping. Once the order has been shipped, the
        cancellation option will no longer be available.
        <br />
        <br />
        If your order has already been shipped and you need to request a
        cancellation or assistance, please visit the Contact Us section on our
        app or website. You can reach out to us through phone or WhatsApp for
        instant support or send us an email. Our team will look into your
        request and get back to you in 2-3 days.
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
        My order was delivered to the wrong address. What should I do?
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
        If you think that your order was delivered to an incorrect address,
        please visit the Contact Us section on our app or website. You can reach
        out to us through phone or WhatsApp for instant support or send us an
        email. Our team will look into your request and get back to you in 2-3
        days.
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
          marginTop: "10px",
        }}
      >
        How do I track my order?
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
        Tracking your order is easy. Just follow these steps:
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
        1. If you're using the app, head to "My Orders" under the "More"
        section. For desktop users, find it under "My Account"..
        <br />
        2. Check the status of your order, which might be "Order received",
        "Shipped" or "Delivered".
        <br />
        If you placed your order as a guest, you could access "Track My Order"
        from the app menu or the website footer, then enter your order number
        and email to get started.
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
          marginTop: "10px",
        }}
      >
        Why I haven't received my order yet?
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
        For orders placed within KSA, Oman, Bahrain, Qatar, and Kuwait, the
        delivery time can range from 2 to 6 days. To track the status of your
        order, please click on the "Track My Order" or "My Orders" sections. In
        case we are unable to reach you during the scheduled delivery time, our
        team will make two more attempts. If needed, you can also get in touch
        with our customer care team. You can contact us through phone or
        WhatsApp for instant support, or send us an email with your order number
        and full address details. Our team will promptly look into your request
        and respond within 2-3 days.
        <br />
        <br />
        If all delivery attempts are missed, the package will be returned to our
        warehouse, and your order will be cancelled. Your refund will be
        processed and will reflect depending on the payment method used when
        placing the order.
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
          marginTop: "10px",
        }}
      >
        What are the shipping fees and how long does it take to deliver my
        order?
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
        All shipping costs and estimated delivery times can be found in the
        Shipping and Delivery page.
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
        How long does it take to deliver my order?
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
        Please see the delivery timelines below for each country:
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
            UAE: 2-hour delivery, same-day delivery & next day delivery in
            Dubai. Next day delivery & 3-4 day delivery (if item is being
            shipped from KSA) across the rest of UAE.
          </li>
          <li>
            KSA: 3-hour delivery in Riyadh with same day and next day delivery.
            1-3 days across the rest of KSA. 2-6 days if the order is being
            shipped from UAE.
          </li>
          <li>Oman: 2-4 days</li>
          <li>
            Kuwait: 2-hour delivery, same day and next day delivery. 1-6 days if
            the order is being shipped from UAE.
          </li>
          <li>Bahrain: 2-4 days</li>
          <li>Qatar: 1-3 days</li>
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
        Can I place an order outside GCC?
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
        We only deliver to Gulf Cooperation Countries:
        <br />
        United Arab Emirates, Kingdom of Saudi Arabia, Bahrain, Qatar, Kuwait &
        Oman.
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
        How fast is the Express Delivery service and does it cover all cities?
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
        Arabica Latina offers exclusive Express Delivery to customers in Dubai
        and Riyadh only.
        <br />
        Dubai: 2-hour delivery
        <br />
        Riyadh: 3-hour delivery
        <br />
        Enjoy swift and efficient service with Ounass Express Delivery. Please
        check availability during checkout.
        <br />
        Please note: Some remote areas in Riyadh are not eligible for 3-hour
        delivery.
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
        Do you support International Shipping?
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
        Arabica Latina exclusively delivers within the GCC (Gulf Cooperation
        Council) region.
        <br />
        We value your interest and apologize for any inconvenience.
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
        Why am I unable to order beauty items in Qatar?
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
        Due to customs regulations and authorities' restrictions, Arabica Latina
        is currently unable to deliver beauty items classified as "Dangerous
        Goods" to Qatar.
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
        What should I do if I believe I should have received the gift with
        purchase?
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginRight: "20px",
          marginBottom: "80px",
        }}
      >
        If you are certain that you meet all the criteria, and the gift was
        shown in your bag during checkout, but you still did not receive it, we
        are sorry to hear that. Please reach out to our customer care team via
        call or WhatsApp for instant support, or you can send us an email with
        your order number and delivery request.
        <br />
        You can do this by visiting the Contact Us section on our website or
        app.
      </Typography>
    </>
  );
};

export default Shipping;
