import React, { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../../../redux/slices/orderSlice";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import CustomLoader from "@/_components/common/CustomLoader";
import moment from "moment";

import InquiryForm from "./InquiryForm";
import Image from "next/image";

const statusStyles: Record<any, { color: string; label: string }> = {
  InProcess: { color: "#FFC107", label: "In Process" },
  Sent: { color: "#00796B", label: "Sent" },
  Inquiries: { color: "#2196F3", label: "Inquiries" },
};
const filterOptions = [
  { value: "last_six_months", label: "Last six months" },
  { value: "last_year", label: "Last year" },
];
const MyOrdersPage = () => {
  const [activeTabs, setActiveTabs] = useState<{ [orderId: string]: string }>(
    {}
  );
  const [selectedFilterOption, setSelectedFilterOption] =
    useState("last_six_months");
  const { orders, ordersLoading }: any = useSelector(
    (state: any) => state.order
  );
  const isBetween900And1120 = useMediaQuery(
    "(min-width:900px) and (max-width:1120px)"
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOrdersByUser({ filter: selectedFilterOption }))
      .unwrap()
      .then((data) => {
        const initialTabs = data.reduce((acc: any, order: any) => {
          acc[order.orderId] = "InProcess";
          return acc;
        }, {});
        setActiveTabs(initialTabs);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [dispatch, selectedFilterOption]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          mb: 2,
          marginTop: "50px",
        }}
      >
        <Select
          value={selectedFilterOption}
          onChange={(e) => setSelectedFilterOption(e.target.value)}
          displayEmpty
          sx={{
            backgroundColor: "rgba(226, 203, 162, 0.5)",
            borderColor: "#A09A97",
            width: "20%",
            height: "40px",
            borderRadius: "6px",

            "& .MuiSelect-icon": {
              color: "#94624A",
            },
            "&:hover": {
              backgroundColor: "rgba(226, 203, 162, 0.7)",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#A09A97",
              },
              "&:hover fieldset": {
                borderColor: "#A09A97",
              },
            },
          }}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {ordersLoading ? (
        <CustomLoader />
      ) : (
        orders.map((order: any, index: number) => {
          const orderStatus = order.sentTime
            ? "Sent"
            : order.packedTime
            ? "Packed"
            : "Received";
          const getStatusStyles = (status: string) => ({
            backgroundColor: orderStatus === status ? "#FEF9F4" : "#E7E7E7",
            borderTop:
              orderStatus === status
                ? "12px solid #A44819"
                : "12px solid #C48E70",
            borderColor: "#C48E70",

            height: isBetween900And1120
              ? orderStatus === status
                ? "136px"
                : "124px"
              : orderStatus === status
              ? "124px"
              : "102px",
          });
          return (
            <React.Fragment key={index}>
              <Divider
                sx={{
                  mb: 2,
                  bgcolor: "#C48E70",
                  height: 10,
                  marginTop: "40px",
                }}
              />
              <Box key={order.orderId} sx={{ marginBottom: "40px" }}>
                <Typography sx={{ color: "#000000", fontSize: "14px" }}>
                  Order ID: {order.orderId} made on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Typography
                  sx={{ color: "#000000", fontSize: "14px", marginTop: "10px" }}
                >
                  Address: {order.address.apartment}, {order.address.address},{" "}
                  {order.address.city}
                </Typography>
                <Typography
                  sx={{ color: "#868282", fontSize: "14px", marginTop: "10px" }}
                >
                  Total: {order.total} SAR
                </Typography>

                <Box
                  border={1}
                  borderColor="#A44819"
                  sx={{
                    marginTop: "20px",

                    borderRadius: "0px",
                  }}
                >
                  <Grid
                    container
                    borderBottom={1}
                    borderColor="#A44819"
                    sx={{ borderBottom: "none" }}
                  >
                    {["InProcess", "Sent", "Inquiries"].map((status, index) => (
                      <Grid
                        key={status}
                        item
                        xs={12}
                        md={4}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          fontFamily: "GaretHeavy",
                          color:
                            status === activeTabs[order.orderId]
                              ? statusStyles[status].color
                              : "#94624A",
                          height: "65px",
                          fontWeight: "bold",
                          borderRight:
                            index !== 2 ? "1px solid #A44819" : "none",
                          borderBottom:
                            status === activeTabs[order.orderId]
                              ? "none"
                              : "1px solid #A44819",
                          cursor: "pointer",
                          position: "relative",
                          "&:after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-2px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width:
                              status === activeTabs[order.orderId]
                                ? "40%"
                                : "0",
                            height: "2px",
                            backgroundColor:
                              status === activeTabs[order.orderId]
                                ? "#A44819"
                                : "transparent",
                            transition: "width 0.3s ease",
                          },
                        }}
                        onClick={() =>
                          setActiveTabs((prev) => ({
                            ...prev,
                            [order.orderId]: status,
                          }))
                        }
                      >
                        {statusStyles[status].label}
                        {/* {status === activeTabs[order.orderId] && (
                          <span
                            style={{ marginLeft: "18px", fontSize: "10px" }}
                          >
                            ✔️
                          </span>
                        )} */}
                      </Grid>
                    ))}
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    mt={2}
                    sx={{
                      marginBottom: "20px",
                      width: "100%",
                    }}
                  >
                    {activeTabs[order.orderId] === "InProcess" && (
                      <>
                        <Grid
                          item
                          xs={12}
                          md={4}
                          sx={{
                            maxHeight: "200px",
                            overflow: "auto",
                          }}
                        >
                          {order.orderItems.map((item: any, index: number) => (
                            <React.Fragment key={item.orderItemId}>
                              <Box
                                display="flex"
                                gap={2}
                                sx={{
                                  marginTop: index === 0 ? "0px" : "15px",
                                  borderTop:
                                    index === 0 ? "0px" : "1px solid #C48E70",
                                }}
                              >
                                <Image
                                  src={item?.variant?.attachment}
                                  alt={item?.variant?.product?.name}
                                  width={80}
                                  height={100}
                                    loading="lazy"
                                />

                                <Box
                                  display="flex"
                                  alignItems="flex-start"
                                  gap={7}
                                >
                                  <Box>
                                    <Typography
                                      sx={{
                                        fontSize: "12px",
                                        fontFamily: "GaretHeavy",
                                        color: "#3E3F20",
                                        letterSpacing: "2%",
                                        marginTop: index === 0 ? "0px" : "15px",
                                      }}
                                    >
                                      {item.quantity} x{" "}
                                      {item.variant.product.name}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "12px",
                                        marginTop: "15px",
                                        color: "#3E3F20",
                                      }}
                                    >
                                      COLOR: {item.variant.color}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "12px",
                                        marginTop: "7px",
                                        color: "#3E3F20",
                                      }}
                                    >
                                      SIZE: {item.variant.size}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "12px",
                                        fontFamily: "GaretHeavy",
                                        color: "#3E3F20",
                                        marginTop: "15px",
                                        letterSpacing: "2%",
                                      }}
                                    >
                                      Subtotal: {item.price} SAR
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </React.Fragment>
                          ))}
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          md={8}
                          spacing={1}
                          display="flex"
                          sx={{
                            width: "100%",
                          }}
                        >
                          {/* Order Received */}
                          <Grid item xs={12} md={3.6}>
                            <Paper
                              sx={{
                                width: "100%",

                                borderRadius: "0px",

                                ...getStatusStyles("Received"),
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontFamily: "GaretHeavy",
                                  marginTop: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "#C48E70",
                                }}
                              >
                                Order received
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#2E2B2A",
                                  fontSize: "14px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginTop: "20px",
                                }}
                              >
                                {moment(order.createdAt).fromNow()}
                              </Typography>
                            </Paper>
                          </Grid>

                          {/* Item Packed */}
                          <Grid item xs={12} md={3.6}>
                            <Paper
                              sx={{
                                width: "100%",
                                borderRadius: "0px",

                                ...getStatusStyles("Packed"),
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontFamily: "GaretHeavy",
                                  marginTop: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "#C48E70",
                                }}
                              >
                                Item packed
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#2E2B2A",
                                  fontSize: "14px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginTop: "20px",
                                }}
                              >
                                {order.packedTime
                                  ? moment(order.packedTime).format(
                                      "YYYY - MM - DD"
                                    )
                                  : "Not Packed Yet"}
                              </Typography>
                            </Paper>
                          </Grid>

                          {/* Sent */}
                          <Grid item xs={12} md={3.6}>
                            <Paper
                              sx={{
                                width: "100%",
                                borderRadius: "0px",

                                ...getStatusStyles("Sent"),
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontFamily: "GaretHeavy",
                                  marginTop: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "#C48E70",
                                }}
                              >
                                Sent
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#2E2B2A",
                                  fontSize: "14px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginTop: "20px",
                                }}
                              >
                                {order.sentTime
                                  ? moment(order.sentTime).format(
                                      "YYYY - MM - DD"
                                    )
                                  : "Not Sent Yet"}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </>
                    )}{" "}
                    {activeTabs[order.orderId] === "Sent" && (
                      <Box
                        sx={{
                          width: "100%",
                          height: "200px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#2E2B2A",
                        }}
                      >
                        {orderStatus === "Sent" ? (
                          <Typography>This order has been shipped.</Typography>
                        ) : (
                          <Typography>
                            This order has no products shipped yet.
                          </Typography>
                        )}
                      </Box>
                    )}
                    {activeTabs[order.orderId] === "Inquiries" && (
                      <Grid
                        item
                        xs={12}
                        sx={{
                          overflow: "auto",
                        }}
                      >
                        <InquiryForm orderId={order.orderId} />
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Box>
            </React.Fragment>
          );
        })
      )}
    </Box>
  );
};

export default MyOrdersPage;
