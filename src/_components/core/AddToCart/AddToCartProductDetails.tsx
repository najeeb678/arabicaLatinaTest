import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PaymentIcons from "@/_components/common/PaymentIcons/PaymentIcons";
import CustomLoader from "@/_components/common/CustomLoader";
import { addToShoppingCart } from "@/redux/slices/orderSlice";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import BasicModal from "@/_components/common/CustomModal/BasicModal";
import LoginPrompt from "../Shopping/LoginPrompt";
import { isLoggedIn } from "@/utils/utils";
import Image from "next/image";

const buttonStyle = {
  backgroundColor: "#f4a94d",
  color: "#A44819",
  fontFamily: "GaretHeavy",
  padding: "12px 20px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: "bold",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#D98F35",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
  },
};

const AddToCartProductDetails = ({
  flag = false,
  setOpenModal = () => {},
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { productDetails, productDetailsLoading } = useSelector(
    (state: RootState) => state.order
  );
  const [data, setData] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(productDetails);
    setSelectedColor(productDetails[0]);
    setSelectedVariant(productDetails[0]?.variants[0]);
  }, [dispatch, productDetails]);

  const handleAddToBag = () => {
    if (isLoggedIn()) {
      dispatch(
        addToShoppingCart({
          variantId: selectedVariant?.variantId,
          quantity: quantity,
        })
      )
        .unwrap()
        .then((res) => {
          // console.log("res", res);
          toast.success("Product added to bag");
          setOpenModal(false);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Failed to add product to bag");
          setLoading(false);
        });
    } else {
      setShowLoginPrompt(true);
    }
  };

  // Handle color selection
  const handleColorSelect = (color: any) => {
    setSelectedColor(color);
    setSelectedVariant(color.variants[0]);
  };

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    const variant = selectedColor.variants.find((v: any) => v.size === size);
    if (variant) setSelectedVariant(variant);
  };

  // Handle quantity change
  const handleQuantityChange = (amount: number) => {
    if (quantity + amount > 0) setQuantity(quantity + amount);
  };
  if (productDetailsLoading) {
    return <CustomLoader />;
  }
  const productOverView =
    productDetails.length > 0 && productDetails[0].variants.length > 0
      ? productDetails[0].variants[0].product
      : "Product Name Not Available";

  // Calculate total price
  const totalPrice = selectedVariant ? selectedVariant.price * quantity : 0;

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          gap: 3,
          borderRadius: "12px",
          maxWidth: flag ? "100%" : "1000px",
          margin: "auto",
        }}
      >
        <Grid component="div" size={{ xs: 12, md: 5 }} sx={{}}>
          <Box
            sx={{
              minHeight: { xs: "auto", md: flag ? "600px" : "600px" },
              height: "70%",
              width: "100%",
              border: "1px solid #DEDEDE",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={selectedVariant?.attachment}
              alt="product"
              layout="fill"
              style={{ objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </Box>
        </Grid>
        <Grid component="div" size={{ xs: 12, md: 6 }} sx={{}}>
          <Box
            sx={{
              marginLeft: { xs: "10", md: flag ? "100px" : "10px" },
              maxHeight: "auto",
              marginBottom: flag ? "" : "0px",
              marginTop: "2px",
            }}
          >
            <Box
              className="flexCenter"
              sx={{
                height: "50px",
                width: "200px",
                backgroundColor: "#f0e2cb",
                color: selectedVariant?.stock > 0 ? "green" : "red",
                fontSize: "16px",
                fontFamily: "GaretBook",
                borderRadius: "5px",
                lineHeight: "25px",
              }}
            >
              {selectedVariant?.stock > 0 ? "In Stock" : "Out of Stock!"}
            </Box>
            <Typography
              sx={{
                fontWeight: "bold",
                marginBottom: 1,
                color: "#868282",
                margin: "20px 0",
              }}
            >
              {productOverView?.name}
            </Typography>
            <Divider sx={{ marginBottom: 1 }} />
            <Typography
              sx={{
                fontFamily: "GaretHeavy",
                fontSize: "16px",
                marginTop: "10px",
                marginBottom: 3,
                color: "#3E3F20",
              }}
            >
              {/* SAR {selectedVariant?.price}.00 */}
              SAR {totalPrice}.00
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",

                color: "#3E3F20",
                marginTop: "40px",
                fontSize: "16px",
              }}
            >
              Details:{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "25px",
                color: "#3E3F20",
                marginTop: "15px",
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                COMPOSITION:
              </span>
              {productOverView?.composition} <br />
              <span
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                WEIGHT:
              </span>
              {productOverView?.weight}
              <br />
              <span
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                DESCRIPTION:
              </span>
              {/* {productOverView?.description} */}
              <div
                dangerouslySetInnerHTML={{
                  __html: productOverView?.description,
                }}
              />
            </Typography>
            {/* Color Selector */}
            <Typography
              variant="body1"
              sx={{ mb: 2, mt: 4, fontWeight: "600", color: "#3E3F20" }}
            >
              Select Color:
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {data.map((colorGroup: any) => (
                <Grid key={colorGroup.color}>
                  <Box
                    onClick={() => handleColorSelect(colorGroup)}
                    sx={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: colorGroup.color,
                      border:
                        selectedColor?.color === colorGroup.color
                          ? "3px solid #333"
                          : "2px solid #ddd",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {selectedColor && (
              <>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, fontWeight: "600", color: "#3E3F20" }}
                >
                  Select Size:
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {selectedColor.variants.map((variant: any) => (
                    <Grid key={variant.variantId}>
                      <Button
                        variant={
                          selectedVariant?.size === variant.size
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => handleSizeSelect(variant.size)}
                        sx={{
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "16px",
                          padding: "3px 10px",
                          fontFamily: "GaretHeavy",
                          borderRadius: "6px",
                          backgroundColor:
                            selectedVariant?.size === variant.size
                              ? "#f4a94d"
                              : "#fff",
                          color:
                            selectedVariant?.size === variant.size
                              ? "#fff"
                              : "#A44819",
                          border:
                            selectedVariant?.size === variant.size
                              ? "none"
                              : "1px solid #A44819",
                          "&:hover": {
                            backgroundColor:
                              selectedVariant?.size === variant.size
                                ? "#D98F35"
                                : "#f0f0f0",
                            color:
                              selectedVariant?.size === variant.size
                                ? "#fff"
                                : "#A44819",
                            boxShadow:
                              selectedVariant?.size === variant.size
                                ? "0 6px 10px rgba(0, 0, 0, 0.15)"
                                : "none",
                          },
                        }}
                      >
                        {variant.size}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {/* Quantity Selector */}
            <Typography
              variant="body1"
              sx={{ mb: 1, fontWeight: "600", color: "#3E3F20" }}
            >
              Quantity:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                sx={{
                  color: quantity > 1 ? "#333" : "#ccc",
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  mx: 3,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {quantity}
              </Typography>
              <IconButton
                onClick={() => handleQuantityChange(1)}
                sx={{
                  color: "#333",
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Add to Bag Button */}
            <Button
              variant="contained"
              className="buttonStyle"
              fullWidth
              sx={{
                ...buttonStyle,
              }}
              disabled={selectedVariant?.stock === 0}
              onClick={handleAddToBag}
            >
              {loading ? (
                <ThreeDots
                  height="28"
                  width="40"
                  radius="9"
                  color="#FFFFFF"
                  ariaLabel="three-dots-loading"
                  visible
                />
              ) : (
                "  Add to Bag"
              )}
            </Button>
            <PaymentIcons />
          </Box>
        </Grid>
      </Grid>
      <BasicModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      >
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      </BasicModal>
    </>
  );
};

export default AddToCartProductDetails;
