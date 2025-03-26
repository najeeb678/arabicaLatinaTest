import { Box, Badge, Tooltip, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { debounce } from "lodash";
import { RxPerson } from "react-icons/rx";
import { useRouter } from "next/router";
import {
  fetchAllCartItems,
  getUserFavoriteItems,
} from "@/redux/slices/orderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { isLoggedIn } from "@/utils/utils";
import WishListTable from "./Wishlist";
import BasicModal from "@/_components/common/CustomModal/BasicModal";
import LoginPrompt from "../Shopping/LoginPrompt";
import InputBase from "@mui/material/InputBase";
import SearchModal from "./SearchModal";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },

    width: "5ch",
  },
}));

const LogoSection = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const {
    cartItemsCount,
    UserFavoriteItemsList,
    favoriteItemsCount,
    favouriteItemsLoading,
  } = useSelector((state: RootState) => state.order);
  const isUserLoggedIn = isLoggedIn();

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchAllCartItems()).unwrap();
      dispatch(getUserFavoriteItems()).unwrap();
    }
  }, [dispatch, isUserLoggedIn]);

  const handleIconClick = (iconName: string) => {
    if (!isLoggedIn()) {
      setShowLoginPrompt(true);
      return;
    }

    switch (iconName) {
      case "Profile":
        router.push("/my-account");
        break;
      case "Wishlist":
        setOpenModal(true);
        break;
      case "ShoppingCart":
        router.push("/shopping-cart");
        break;

      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        color: "#bf805a",
        fontSize: "12px",
        position: "relative",
      }}
    >
      <Box
        onClick={() => router.push("/")}
        sx={{
          position: { sm: "none", md: "absolute" },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          paddingLeft: "100px",
          alignItems: "center",

          cursor: "pointer",
        }}
      >
        <img src="/Images/Capa.svg" alt="Logo" height="45px" width="auto" />
      </Box>

      {/* Icons section */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          position: "absolute",
          right: "6%",
        }}
      >
        <SearchModal />
        <Tooltip title="Profile">
          <Box onClick={() => handleIconClick("Profile")}>
            <RxPerson
              size={20}
              style={{ fontSize: "20px", cursor: "pointer",color:"#a4481a" }}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Wishlist">
          <Box
            onClick={() => handleIconClick("Wishlist")}
            sx={{
              position: "relative",
            }}
          >
            <Badge
              badgeContent={favoriteItemsCount}
              color="primary"
              overlap="circular"
              sx={{
                position: "absolute",
                top: "-5px",
                right: "-5px",

                "& .MuiBadge-badge": {
                  fontSize: "10px",
                  height: "18px",
                  minWidth: "18px",
                  backgroundColor: "#bf805a",
                  color: "#fff",
                },
              }}
            />

            {/* <FaHeart
            style={{
              color: "#a44819",
              width: "20px",
              height: "20px",
            }}
          /> */}

            <FaRegHeart
              style={{
                cursor: "pointer",
                width: "18px",
                height: "18px",
                color:"#a4481a"
              }}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Shopping Cart">
          <Box
            onClick={() => handleIconClick("ShoppingCart")}
            sx={{
              position: "relative",
            }}
          >
            <Badge
              badgeContent={cartItemsCount}
              color="primary"
              overlap="circular"
              sx={{
                position: "absolute",
                top: "-5px",
                right: "-5px",

                "& .MuiBadge-badge": {
                  fontSize: "10px",
                  height: "18px",
                  minWidth: "18px",
                  backgroundColor: "#bf805a",
                  color: "#fff",
                },
              }}
            />

            <FiShoppingCart
              size={20}
              style={{ fontSize: "20px", cursor: "pointer",color:"#a4481a" }}
            />
          </Box>
        </Tooltip>
      </Box>
      <CustomModal
        open={openModal}
        title={"Items in Your Wishlist"}
        handleClose={() => setOpenModal(false)}
        modalWidth="65%"
      >
        <WishListTable
          wishlist={UserFavoriteItemsList}
          loading={favouriteItemsLoading}
        />
      </CustomModal>
      <BasicModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      >
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      </BasicModal>
    </Box>
  );
};

export default LogoSection;
