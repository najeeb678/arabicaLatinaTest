import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { CiShoppingCart } from "react-icons/ci";
import { isLoggedIn } from "@/utils/utils";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getallVariantsOfAProduct } from "@/redux/slices/orderSlice";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import AddToCartProductDetails from "../AddToCartProductDetails";

interface CartProps {
  isWishlist?: boolean;
  productDetails: any;
  setShowLoginPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartToggle: React.FC<CartProps> = ({
  productDetails,
  setShowLoginPrompt,
  isWishlist,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleCartToggle = (productId: string) => {
    if (isLoggedIn()) {
      setOpenModal(true);
      dispatch(getallVariantsOfAProduct({ productId: productId })).unwrap();
    } else {
      setShowLoginPrompt(true);
    }
  };
  return (
    <>
      <div data-tooltip-id="cart-tooltip" data-tooltip-content={"Add to Cart"}>
        <CiShoppingCart
          onClick={(e) => handleCartToggle(productDetails?.productId)}
          style={{
            borderRadius: "3px",
            border: "1px solid #a44819",
            color: "#a44819",
            width: "25px",
            height: "20px",
            cursor: "pointer",
            position: isWishlist ? "static" : "absolute",
            bottom: "0px",
            right: isWishlist ? "0px" : "20px",
          }}
        />
      </div>
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
      <CustomModal
        open={openModal}
        title={"Add Product"}
        handleClose={() => setOpenModal(false)}
        modalWidth="70%"
      >
        <AddToCartProductDetails flag={false} setOpenModal={setOpenModal} />
      </CustomModal>
    </>
  );
};

export default CartToggle;
