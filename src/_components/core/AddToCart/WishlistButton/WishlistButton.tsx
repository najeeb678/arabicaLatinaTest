import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addToFavorite } from "@/redux/slices/orderSlice";
import { isLoggedIn } from "@/utils/utils";

interface HeartProps {
  productDetails: any;
  setShowLoginPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

const WishlistButton: React.FC<HeartProps> = ({
  productDetails,
  setShowLoginPrompt,
}) => {
  const [isWishlist, setIsWishlist] = useState<boolean>(
    productDetails.isInWishlist
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setIsWishlist(productDetails.isInWishlist);
  }, [productDetails]);

  const handleWishlistToggle = (e: React.MouseEvent, Id: string) => {
    e.stopPropagation();
    if (isLoggedIn()) {
      const newWishlistState = !isWishlist;
      setIsWishlist(newWishlistState);
      dispatch(addToFavorite({ productId: Id }))
        .unwrap()
        .then(() => {
          toast.success(
            newWishlistState
              ? "Product added to wishlist"
              : "Product removed from wishlist"
          );
        })
        .catch((err) => {
          toast.error("Failed to update wishlist");
          setIsWishlist(!newWishlistState); // Revert state on failure
        });
    } else {
      setShowLoginPrompt(true);
    }
  };

  return (
    <Tooltip title={isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
      <div
        onClick={(e) => handleWishlistToggle(e, productDetails.productId)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      >
        {isWishlist ? (
          <FaHeart
            style={{
              color: "#a44819",
              width: "20px",
              height: "20px",
            }}
          />
        ) : (
          <FaRegHeart
            style={{
              color: "#a44819",
              width: "20px",
              height: "20px",
            }}
          />
        )}
      </div>
    </Tooltip>
  );
};

export default WishlistButton;
