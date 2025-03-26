import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";
import CartToggle from "../AddToCart/CartToggle/CartToggle";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import { toast } from "react-toastify";
import { addToFavorite, getUserFavoriteItems } from "@/redux/slices/orderSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import CustomLoader from "@/_components/common/CustomLoader";
import NoDataAvailable from "@/_components/common/NoDataAvailable/NoDataAvailable";
import Image from "next/image";

const WishListTable = ({ wishlist, loading }: any) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFavoriteItems()).unwrap();
  }, [dispatch]);

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "..."; // Add ellipsis if truncated
    }
    return description;
  };
  const onRemoveFromWishlist = (id: string) => {
    setIsDeleteModalOpen(true);
    setSelectedItemId(id);
  };
  const handleDelete = async (id: any) => {
    setIsDeleteModalOpen(false);
    dispatch(
      addToFavorite({
        productId: selectedItemId,
      })
    )
      .unwrap()
      .then((res) => {
        toast.success(`Product removed from wishlist`);
      })
      .catch((err) => {
        toast.error("Failed to removed product from wishlist");
      });
  };
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <TableContainer
          sx={{ maxHeight: "500px", overflow: "auto", width: "100%" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ fontWeight: "bold", fontSize: "17px" }}>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Product
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Description
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Price
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Size
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Color
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlist?.length > 0 ? (
                wishlist?.map((item: any) => {
                  const variant = item?.product?.Variants?.find(
                    (v: any) => !v.is_Deleted && v.isInStock
                  );

                  if (!variant) return null;

                  return (
                    <TableRow key={item.wishlistId}>
                      <TableCell>
                        <Image
                          src={variant?.attachment}
                          alt={item?.product.name}
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

                        {truncateDescription(item.product.description, 40)}
                      </TableCell>
                      <TableCell>${variant.price}</TableCell>
                      <TableCell>{variant.size}</TableCell>
                      <TableCell>{variant.color}</TableCell>

                      <TableCell sx={{}}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
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
  );
};

export default WishListTable;
