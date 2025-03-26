import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { getUserDetails, isLoggedIn } from "@/utils/utils";
import PaymentIcons from "@/_components/common/PaymentIcons/PaymentIcons";
import CustomLoader from "@/_components/common/CustomLoader";

import NoDataAvailable from "@/_components/common/NoDataAvailable/NoDataAvailable";
import BasicModal from "@/_components/common/CustomModal/BasicModal";
import {
  addToShoppingCart,
  createOrder,
  deleteCartItem,
} from "@/redux/slices/orderSlice";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import LoginPrompt from "./LoginPrompt";

import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
  Divider,
  TableHead,
  useMediaQuery,
  MenuItem,
  Select,
} from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import PromoCode from "./PromoCode";
import Image from "next/image";

const OrderSummaryItem = ({ label, value, dotCount }: any) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    }}
  >
    <Typography
      sx={{
        fontSize: "14px",
        color: "#6A6461",
      }}
    >
      {label}
      <span style={{ whiteSpace: "nowrap" }}> {".".repeat(dotCount)}</span>
    </Typography>
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: "bold",
        color: "#6A6461",
      }}
    >
      {value}
    </Typography>
  </Box>
);

const Shopping: React.FC<any> = ({ loading, cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const userDetails = getUserDetails();
  const SECRET_KEY =
    "a3f5e2d89b47c8a2d3e6f7b5c9d1a4e8f2b7d6c3a8e4f9d0b6c1e7a5d2f8c3b1";

  const [promoData, setPromoData] = useState({
    discountAmount: 0,
    finalPrice: 0,
    message: "Invalid or expired promo code",
  });

  const [cartItemsLength, setCartItemsLength] = useState(
    cartItems?.CartItems?.length || 0
  );
  const [updatedCartItems, setUpdatedCartItems] = useState(
    cartItems?.CartItems || []
  );
  // cartItemsCount

  useEffect(() => {
    setCartItemsLength(cartItems?.CartItems?.length);
    setUpdatedCartItems(cartItems?.CartItems);
  }, [cartItems]);
  const isBelow600 = useMediaQuery("(max-width:600px)");
  const isBetween1260And900 = useMediaQuery(
    "(max-width:1260px) and (min-width:900px)"
  );

  const debouncedDispatch = useCallback(
    debounce((variantId: number, quantity: number) => {
      dispatch(
        addToShoppingCart({
          variantId,
          quantity,
        })
      );
    }, 500),
    [dispatch]
  );

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItems = [...updatedCartItems];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: quantity > 0 ? quantity : 1,
    };
    setUpdatedCartItems(updatedItems);

    const updatedItem = updatedItems[index];
    debouncedDispatch(updatedItem.variantId, updatedItem.quantity);
  };

  const calculateSubtotal = () =>
    updatedCartItems?.reduce(
      (acc: number, item: any) => acc + item.quantity * item?.variant?.price,
      0
    );
  const handleCheckout = () => {
    if (!isLoggedIn()) {
      setOpenModal(true);
      return;
    }

    if (!paymentMethod) {
      setErrorMessage("Please select a payment method before proceeding.");
    } else {
      setIsLoading(true);

      const orderData = JSON.stringify({
        paymentMethod: paymentMethod,
        discount: promoData.discountAmount,
        finalAmount:
          promoData.finalPrice > 0 ? promoData.finalPrice : calculateSubtotal(),
      });

      // 🔒 Encrypt Data
      const encryptedData = CryptoJS.AES.encrypt(
        orderData,
        SECRET_KEY
      ).toString();

      localStorage.setItem("orderCreationData", encryptedData);
      router.push("payment-details");
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setSelectedItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async (id: any) => {
    dispatch(deleteCartItem(id))
      .unwrap()
      .then((res) => {
        setCartItemsLength(cartItemsLength - 1);
        toast.success("Item removed from cart successfully");
        setIsDeleteModalOpen(false);
      })
      .catch((err) => {
        // console.log("failure", err);
        toast.error("Failed to remove the item from cart");
        setIsDeleteModalOpen(false);
      });
  };

  return loading ? (
    <CustomLoader />
  ) : cartItemsLength === 0 ? (
    <NoDataAvailable
      message="Your cart is currently empty."
      description="Start shopping now and fill it up!"
      navigationLink="/"
    />
  ) : (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 7.5 }} component="div">
        <Box sx={{ overflow: "auto", maxWidth: "100%", maxHeight: "600px" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#efe1ca" }}>
                <TableCell
                  sx={{
                    width: "40%",
                    color: "#3E3F20",
                    fontSize: "14px",
                    fontFamily: "GaretBook",
                  }}
                >
                  ITEMS
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "10%",
                    color: "#3E3F20",
                    fontSize: "14px",
                    fontFamily: "GaretBook",
                  }}
                >
                  EACH
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "10%",
                    color: "#3E3F20",
                    fontSize: "14px",
                    fontFamily: "GaretBook",
                  }}
                >
                  QUANTITY
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "12%",
                    color: "#3E3F20",
                    fontSize: "14px",
                    fontFamily: "GaretBook",
                  }}
                >
                  TOTAL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedCartItems?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Image
                      src={item.variant?.attachment}
                      alt={item.variant?.product.name}
                      width={116}
                      height={174}
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        display: "block",
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          marginBottom: "25px",
                          fontFamily: "GaretHeavy",
                          fontSize: "12px",
                          color: "#3E3F20",
                          letterSpacing: "2%",
                        }}
                      >
                        {item.variant?.product.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#3E3F20",
                          fontFamily: "GaretBook",
                          marginBottom: "8px",
                        }}
                      >
                        COLOR: {item.variant?.color}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#3E3F20",
                          fontFamily: "GaretBook",
                          marginBottom: "8px",
                        }}
                      >
                        SIZE: {item.variant?.size}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: "12px",
                          marginTop: "60px",
                          flexWrap: "wrap",
                        }}
                      >
                        <Button
                          variant="text"
                          size="small"
                          sx={{
                            fontSize: "12px",
                            padding: 0,
                            color: "#A44819",
                            textTransform: "none",
                            minWidth: 0,
                          }}
                          onClick={() =>
                            handleOpenDeleteModal(item?.cartItemId)
                          }
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#A44819", fontFamily: "GaretBook" }}
                  >
                    SAR {item.variant?.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    <TextField
                      type="number"
                      sx={{ fontFamily: "GaretHeavy" }}
                      defaultValue={item.quantity}
                      InputProps={{
                        inputProps: { min: 1 },
                        style: { textAlign: "center", width: "70px" },
                      }}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value, 10)
                        )
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#868282", fontFamily: "GaretBook" }}
                  >
                    SAR {(item.quantity * item.variant?.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            padding: "8px 16px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "GaretHeavy",
              fontSize: "14px",
              marginLeft: { xs: "16px", sm: "129px" },
            }}
          >
            {cartItems?.CartItems?.length} Items
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              display: "flex",
              align: "center",
              fontWeight: "bold",
              color: "#868282",
            }}
          >
            SAR{`${calculateSubtotal()?.toFixed(2)}`}
          </Typography>
        </Box>
      </Grid>

      {/* Order Summary */}
      <Grid size={{ xs: 12, md: 4.5 }} component="div">
        <Box
          sx={{
            padding: "20px",
            minWidth: { xs: "100%", md: "100%" },
            overflow: "auto",
            backgroundColor: "#D9D9D980",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "GaretHeavy",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "30px",
              color: "#C48E70",
              letterSpacing: "2%",
              marginTop: "16px",
            }}
          >
            ORDER SUMMARY
          </Typography>

          <OrderSummaryItem
            label="Subtotal"
            // value="$ 250.00"
            value={`SAR ${calculateSubtotal()?.toFixed(2)}`}
            dotCount={isBelow600 ? 35 : isBetween1260And900 ? 35 : 75}
          />
          <OrderSummaryItem
            label="Shipping & Handling"
            value="TBD"
            dotCount={isBelow600 ? 10 : isBetween1260And900 ? 10 : 50}
          />
          <OrderSummaryItem
            label="Estimated Tax"
            value="TBD"
            // value={`$${(calculateSubtotal() * 0.1).toFixed(2)}`}
            dotCount={isBelow600 ? 25 : isBetween1260And900 ? 25 : 65}
          />
          <OrderSummaryItem
            label="Order Savings"
            value="SAR 0.00"
            dotCount={isBelow600 ? 25 : isBetween1260And900 ? 25 : 65}
          />

          <Divider sx={{ marginBottom: "16px" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "GaretHeavy",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#6A6461",
                letterSpacing: "2%",
              }}
            >
              Discount Applied
            </Typography>
            <Typography
              sx={{
                fontFamily: "GaretHeavy",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#6A6461",
                letterSpacing: "2%",
              }}
            >
              SAR {promoData.discountAmount.toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "GaretHeavy",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#6A6461",
                letterSpacing: "2%",
              }}
            >
              Estimated Total
            </Typography>
            <Typography
              sx={{
                fontFamily: "GaretHeavy",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#6A6461",
                letterSpacing: "2%",
              }}
            >
              SAR{" "}
              {promoData.finalPrice > 0
                ? promoData.finalPrice.toFixed(2)
                : calculateSubtotal()?.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: "16px" }}>
            <PromoCode
              setPromoData={setPromoData}
              totalAmount={calculateSubtotal()}
            />
          </Box>
          <Select
            value={paymentMethod}
            onChange={(e: any) => setPaymentMethod(e.target.value)}
            displayEmpty
            fullWidth
            sx={{
              marginBottom: "16px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
                lineHeight: "1.5",
                padding: "0 12px",
                border: "1px solid #C48E70",
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiSelect-select": {
                padding: "8px 12px",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Payment Method
            </MenuItem>
            <MenuItem value="CASH">Cash</MenuItem>
            <MenuItem value="CARD">Card</MenuItem>
          </Select>
          {errorMessage && (
            <Typography sx={{ color: "red", marginBottom: "16px" }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            sx={{
              fontFamily: "GaretHeavy",
              marginTop: "26px",
              padding: "10px 0",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#F4A84D",
              letterSpacing: "2%",
              color: "#A44819",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                color: "#fff",
              },
            }}
            onClick={handleCheckout}
          >
            {isloading ? (
              <ThreeDots
                height="28"
                width="40"
                radius="9"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
                visible
              />
            ) : (
              "   Checkout"
            )}
          </Button>

          <PaymentIcons />
        </Box>

        <Box sx={{ width: "100%", marginTop: "25px" }} className="flexCenter">
          <Box
            component="img"
            src="/Images/locker.svg"
            alt="locker icon"
            sx={{ marginRight: "8px", width: "15px", height: "15px" }}
          />
          <Typography fontSize="12px">All data is encrypted</Typography>
        </Box>
      </Grid>
      <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Remove Product"
        description="Are you sure you want to remove this product from your cart?"
        proceed={() => handleDelete(selectedItemId)}
        cancel={() => {
          setIsDeleteModalOpen(false);
        }}
      />

      <BasicModal open={openModal} onClose={() => setOpenModal(false)}>
        <LoginPrompt onClose={() => setOpenModal(false)} />
      </BasicModal>
    </Grid>
  );
};

export default Shopping;
