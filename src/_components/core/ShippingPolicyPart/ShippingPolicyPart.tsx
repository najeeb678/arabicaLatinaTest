import { Box, Typography, Divider } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ShippingPolicy = () => {
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
        Shipping and delivery
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
        Order Delivery
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
        Arabica Latina delivers across the GCC, with the delivery methods
        outlined below. We’re constantly striving to improve your experience,
        and are working on introducing more delivery methods across our
        channels. Kindly continue checking back for any updated. Deliveries take
        place between 10:00am - 10:59pm. The following options are available for
        delivery to your requested address in the KSA.* Orders above 500 SAR
        qualify for free shipping:
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
          marginTop: "30px",
        }}
      >
        Shipping from KSA Warehouse
      </Typography>

      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          border: "1px solid #A44819",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                fontSize: "14px",
                fontFamily: "GaretHeavy",
                fontWeight: "bold",
                padding: "10px",
                border: "1px solid #A44819",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                paddingTop: "40px",
                paddingBottom: "40px",
              }}
            >
              Location
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "GaretHeavy",
                padding: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                border: "1px solid #A44819",
              }}
            >
              Delivery Timescales
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "GaretHeavy",
                padding: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                border: "1px solid #A44819",
              }}
            >
              Cut-Off Time
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "GaretHeavy",
                padding: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                border: "1px solid #A44819",
              }}
            >
              Cost (order value less than 500 SAR)
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "GaretHeavy",
                padding: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                border: "1px solid #A44819",
              }}
            >
              Cost (order value more than 500 SAR)
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              location: "Riyadh",
              timescales: [
                {
                  description: "Within 3 hours",
                  cutOff: "8:00 PM",
                  costs: ["50 SAR", "Free"],
                },
                {
                  description: "Same Day",
                  cutOff: "8:00 PM",
                  costs: ["50 SAR", "Free"],
                },
                {
                  description: "Next Day",
                  cutOff: "-",
                  costs: ["25 SAR", "Free"],
                },
              ],
            },
            {
              location: (
                <>
                  Jeddah,
                  <br />
                  Dammam and Khobar
                </>
              ),
              timescales: [
                {
                  description: (
                    <>
                      Between 1-2 <br />
                      KSA working <br />
                      days
                    </>
                  ),
                  cutOff: "-",
                  costs: ["25 SAR", "Free"],
                },
              ],
            },
            {
              location: "Rest of KSA",
              timescales: [
                {
                  description: (
                    <>
                      Between 3- <br />
                      KSA working <br />
                      days
                    </>
                  ),
                  cutOff: "-",
                  costs: ["25 SAR", "Free"],
                },
              ],
            },
          ].map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.timescales.map((timescale, timescaleIndex) => (
                <tr key={timescaleIndex}>
                  {timescaleIndex === 0 && (
                    <td
                      rowSpan={row.timescales.length}
                      style={{
                        fontSize: "14px",
                        color: "#3E3F20",
                        padding: "10px",
                        border: "1px solid #A44819",
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      {row.location}
                    </td>
                  )}
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#3E3F20",
                      padding: "10px",
                      border: "1px solid #A44819",
                      textAlign: "center",
                    }}
                  >
                    {timescale.description}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#3E3F20",
                      padding: "10px",
                      border: "1px solid #A44819",
                      textAlign: "center",
                    }}
                  >
                    {timescale.cutOff}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#3E3F20",
                      padding: "10px",
                      border: "1px solid #A44819",
                      textAlign: "center",
                    }}
                  >
                    {timescale.costs[0]}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#3E3F20",
                      padding: "10px",
                      border: "1px solid #A44819",
                      textAlign: "center",
                    }}
                  >
                    {timescale.costs[1]}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Box>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "50px",
          cursor: "pointer",
          fontFamily: "GaretHeavy",
          letterSpacing: "2%",
          marginRight: "20px",
          marginTop: "30px",
        }}
      >
        Shipping from UAE Warehouse
      </Typography>

      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          border: "1px solid #A44819",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                fontSize: "14px",
                fontFamily: "GaretHeavy",
                fontWeight: "bold",
                padding: "10px",
                border: "1px solid #A44819",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                paddingTop: "40px",
                paddingBottom: "40px",
              }}
            >
              Location
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "GaretHeavy",
                padding: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                border: "1px solid #A44819",
              }}
            >
              Delivery Timescales
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "GaretHeavy",
                padding: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                border: "1px solid #A44819",
              }}
            >
              Cut-Off Time
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "GaretHeavy",
                padding: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                border: "1px solid #A44819",
              }}
            >
              Cost (order value less than 500 SAR)
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "GaretHeavy",
                padding: "10px",
                textAlign: "center",
                verticalAlign: "middle",
                color: "#94624A",
                border: "1px solid #A44819",
              }}
            >
              Cost (order value more than 500 SAR)
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              location: "AII KSA Addresses",
              timescales: [
                {
                  description: (
                    <>
                      Between 1-6 <br />
                      working days
                    </>
                  ),
                  cutOff: "-",
                  costs: ["Up to 50 SAR*", "Free"],
                },
              ],
            },
          ].map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.timescales.map((timescale, timescaleIndex) => (
                <tr key={timescaleIndex}>
                  {timescaleIndex === 0 && (
                    <td
                      rowSpan={row.timescales.length}
                      style={{
                        fontSize: "14px",
                        color: "#3E3F20",
                        padding: "10px",
                        border: "1px solid #A44819",
                        verticalAlign: "middle",
                        textAlign: "center",
                        paddingTop: "40px",
                        paddingBottom: "40px",
                      }}
                    >
                      {row.location}
                    </td>
                  )}
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#3E3F20",
                      padding: "10px",
                      border: "1px solid #A44819",
                      textAlign: "center",
                    }}
                  >
                    {timescale.description}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#3E3F20",
                      padding: "10px",
                      border: "1px solid #A44819",
                      textAlign: "center",
                    }}
                  >
                    {timescale.cutOff}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#3E3F20",
                      padding: "10px",
                      border: "1px solid #A44819",
                      textAlign: "center",
                    }}
                  >
                    {timescale.costs[0]}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      color: "#3E3F20",
                      padding: "10px",
                      border: "1px solid #A44819",
                      textAlign: "center",
                    }}
                  >
                    {timescale.costs[1]}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Box>
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
        *If multiple shipments below 500 SAR, shipment from UAE warehouse will
        not be charged.
        <br />
        <br />
        Orders placed outside of our working hours (9am-8pm), after the cut-off
        time, on Fridays, and/or on any KSA public holidays, will be deemed
        placed on the first KSA working day following the Order's submission.
        <br />
        <br /> Delivery timelines are estimates, order delivery may face delays
        during promotional activity, sale season and bank holidays.
        <br />
        <br />
        We reserve the right to impose a re-delivery charge where your Order is
        not accepted at the address supplied to us on the confirmed date of
        delivery.
        <br />
        <br /> Please note that orders paid for by Cash on Delivery attract an
        additional 25 SAR delivery fee.
        <br />
        Costs subject to customs clearance.
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
          marginTop: "30px",
        }}
      >
        Pre-Order Delivery
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
        The above table of delivery times does not apply to Pre-Orders. Your
        item will be shipped according to the expected release date, as
        indicated on the product page of the item.
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
          marginTop: "30px",
        }}
      >
        Scheduled Time Slots
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
        You can now schedule your delivery by picking a time slot most
        convenient for you at checkout. The first available time slot is
        10am-12pm and then every hour until 11pm. Orders must be placed by 8pm
        in order to receive them the same day. If you place your order after 8pm
        you will select a delivery time for the next day.
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
          marginTop: "30px",
        }}
      >
        General Delivery Conditions
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
        Although we are strongly committed to delivering in the timelines
        estimated in our Order confirmation or displayed on our Website or
        above, delivery timelines are estimates only. Time shall not be
        considered of the essence. Timelines start from Order confirmation.
        However, if we have not delivered your Order within 30 days of Order
        confirmation, we will provide you with a full refund. We are not
        responsible for failures to deliver for reasons outside our reasonable
        control, including where you are not available to take delivery of your
        Order or request postponement.
        <br />
        <br />
        Orders are delivered daily excluding Fridays and KSA public holidays. It
        is your duty to ensure appropriate access for deliveries, including in
        particular but without limitation on Fridays.
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
          marginTop: "30px",
        }}
      >
        Delivery of Furniture or Bulky Items
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
        All furniture orders are final and non-returnable. When your Order is
        ready for delivery, we will contact you to agree a delivery date. Once
        agreed, you will be responsible for accepting delivery and arranging
        appropriate means of access and installation on that date. It is your
        responsibility to ensure that our delivery team has access to the
        delivery address, and that sufficient space for the goods is available,
        hallways are measured and doors and lifts can grant full access.
        <br />
        <br />
        Delivery on the first floor and above requires service elevator access
        arranged by you and it is your responsibility to notify us of any
        potential problems with access to the premises, building, service
        elevators, etc… and make any related delivery arrangements. Where
        delivery is complicated by such factors, additional charges may apply.
        If delivery is not accepted on the agreed delivery date, goods shall be
        kept in storage free of charge for a period of up to thirty (30) days.
        If you fail to agree a revised delivery date falling within thirty (30)
        days of the initial delivery date, we retain the right to cancel your
        Order, retain all monies paid and resell the goods with no further
        liability.
        <br />
        <br />
        If on the delivery date our delivery team is unable to obtain access to
        the delivery address, a reasonable re-delivery charge may be applied. We
        will pre-inform you of this charge. In the absence of negligence, we
        will not be liable for loss or damage to the goods or your property,
        including where caused by: (i) us following your specific instructions;
        (ii) limited or no access to your nominated premises; and/or (iii) goods
        not fitting into your property. Any request to hang, erect or build
        items shall be at our discretion and we will not be responsible for any
        damage to your home in connection with such hanging, erection or
        building, nor for the integrity of such hanging, erection or building.
        Additional charges for such services may apply.
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
          marginTop: "30px",
        }}
      >
        Address Changes & Tracking
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2E2B2A",
          lineHeight: "20px",
          cursor: "pointer",
          letterSpacing: "2%",
          marginRight: "20px",
          marginBottom: "400px",
        }}
      >
        Our Customer Care team will be happy to assist with changing your
        preferred delivery date and address should you require. However, if you
        have received an email informing you that your order has been
        dispatched, we won’t be able to change your address. Please note that a
        change to an address outside of the original delivery country will not
        be possible.
        <br />
        <br />A tracking number will be provided by SMS once your order is
        confirmed. You will then be able to use the tracking number to track
        your order by contacting the customer care team from 10am-10pm on our
        KSA toll free number [372 - 6060](tel: 372 - 6060) or email
        marbaha@arabmkt.com
      </Typography>
    </>
  );
};

export default ShippingPolicy;
