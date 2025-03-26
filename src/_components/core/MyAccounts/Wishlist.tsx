import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import MyAccountSidebarLinks from "@/_components/core/MyAccounts/MyAccountSidebarLinks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Link,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";
import CartToggle from "@/_components/core/AddToCart/CartToggle/CartToggle";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import { toast } from "react-toastify";
import { addToFavorite, getUserFavoriteItems } from "@/redux/slices/orderSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import CustomLoader from "@/_components/common/CustomLoader";
import NoDataAvailable from "@/_components/common/NoDataAvailable/NoDataAvailable";
import Image from "next/image";

interface WishlistProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

const Wishlist: React.FC<WishlistProps> = ({
  setActiveSection,
  activeSection,
}) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [wishlistState, setWishlistState] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getUserFavoriteItems())
      .unwrap()
      .then((data) => {
        // console.log("Fetched Favorite Items:", data.data.wishlist);
        if (data && Array.isArray(data.data.wishlist)) {
          setWishlistState(data.data.wishlist);
        }
      })
      .catch((error) => {
        console.error("Error fetching favorite items:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const onRemoveFromWishlist = (id: string) => {
    setIsDeleteModalOpen(true);
    setSelectedItemId(id);
  };

  const handleDelete = async (id: any) => {
    setIsDeleteModalOpen(false);
    // Make API call to remove the item from wishlist
    dispatch(
      addToFavorite({
        productId: selectedItemId,
      })
    )
      .unwrap()
      .then(() => {
        // Re-fetch the wishlist after the item is removed
        dispatch(getUserFavoriteItems())
          .unwrap()
          .then((data) => {
            // console.log("Fetched Favorite Items after removal:", data.data.wishlist);
            if (data && Array.isArray(data.data.wishlist)) {
              setWishlistState(data.data.wishlist); // Update state with the new wishlist data
            }
          })
          .catch((error) => {
            console.error("Error fetching favorite items:", error);
          });

        toast.success(`Product removed from wishlist`);
      })
      .catch((err) => {
        // console.log("err", err);
        toast.error("Failed to remove product from wishlist");
      });
  };

  const StyledTableHead = styled(TableHead)({
    backgroundColor: "rgba(226, 203, 162, 0.5)",
  });

  // Create a styled TableCell
  const StyledTableCell = styled(TableCell)({
    color: "#3C3837", // Set the color of table headers
    fontWeight: "bold",
    fontSize: "15px",
    backgroundColor: "#f0e2cb",
    boxShadow: "none",
    borderBottom: "none",
  });
  return (
    <Box sx={{ padding: "0px 10px", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        {/* <Grid size={{ xs: 12, md: 2.5 }} component="div">
               <MyAccountSidebarLinks activePath="/wishlist" />
            </Grid> */}

        <Grid
          size={{ xs: 12, md: 12 }}
          component="div"
          sx={{ marginLeft: "15px" }}
        >
          <Typography
            sx={{
              marginBottom: "20px",
              fontSize: "22px",
              color: "#3C3837",
              letterSpacing: "4%",
              fontFamily: "GaretHeavy",
            }}
          >
            My wishlist
          </Typography>
          <>
            {loading ? (
              <CustomLoader />
            ) : (
              <TableContainer
                sx={{
                  maxHeight: "500px",
                  overflow: wishlistState.length === 0 ? "hidden" : "auto",
                  width: "100%",
                }}
              >
                <Table stickyHeader>
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableCell>Product</StyledTableCell>
                      <StyledTableCell>Description</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Size</StyledTableCell>
                      <StyledTableCell>Color</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {Array.isArray(wishlistState) &&
                    wishlistState.length > 0 ? (
                      wishlistState.map((item: any) => {
                        const variant = item?.product?.Variants?.find(
                          (v: any) => !v.is_Deleted && v.isInStock
                        );

                        if (!variant) return null;

                        return (
                          <TableRow key={item.wishlistId}>
                            <TableCell>
                              <Image
                                src={variant?.attachment}
                                alt={item?.product?.name}
                                width={90}
                                height={90}
                                style={{
                                  objectFit: "cover",
                                }}
                                  loading="lazy"
                              />
                            </TableCell>
                            <TableCell>
                              <strong>{item.product.name}</strong>
                              <br />
                              {truncateDescription(
                                item.product.description,
                                40
                              )}
                            </TableCell>
                            <TableCell>SAR{variant.price}</TableCell>
                            <TableCell>{variant.size}</TableCell>
                            <TableCell>{variant.color}</TableCell>

                            <TableCell sx={{}}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <CartToggle
                                  isWishlist={true}
                                  productDetails={item}
                                  setShowLoginPrompt={setShowLoginPrompt}
                                />
                                <IconButton
                                  data-tooltip-id="cart-tooltip"
                                  data-tooltip-content={"Remove from wishlist"}
                                  color="error"
                                  sx={{ marginBottom: "4px" }}
                                  onClick={() =>
                                    onRemoveFromWishlist(item?.productId)
                                  }
                                >
                                  <Delete />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <NoDataAvailable
                            message=" No products in the wishlist!"
                            description=""
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Tooltip
              id="cart-tooltip"
              float={true}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#ffffff",
                fontSize: "10px",
                padding: "6px",
                borderRadius: "4px",
              }}
              border="1px solid #ffffff"
            />
            <TransitionsDialog
              open={isDeleteModalOpen}
              heading="Remove Product"
              description="Are you sure you want to remove this product from your Wishlist?"
              proceed={() => handleDelete("2")}
              cancel={() => {
                setIsDeleteModalOpen(false);
              }}
            />
          </>
          <Box
            onClick={() => {
              setActiveSection("My account");
            }}
            sx={{
              marginTop: "50px",
              color: "#3C3837",
              textDecorationColor: "#3C3837",
              textDecorationThickness: "1px",
              textUnderlineOffset: "2px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Back to my account
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wishlist;
