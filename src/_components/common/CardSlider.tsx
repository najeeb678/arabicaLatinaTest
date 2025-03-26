import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import CustomLoader from "./CustomLoader";
import NoDataAvailable from "./NoDataAvailable/NoDataAvailable";
import CartToggle from "../core/AddToCart/CartToggle/CartToggle";
import WishlistButton from "../core/AddToCart/WishlistButton/WishlistButton";
import { Tooltip } from "react-tooltip";
import router from "next/router";
import LoginPrompt from "../core/Shopping/LoginPrompt";
import BasicModal from "./CustomModal/BasicModal";
import Image from "next/image";
interface CardSliderProps {
  items: Array<{
    id: number;
    name: string;
    price: string;
    colors: number;
    imageUrl: string;
    productDetails: { productId: number };
  }>;

  title?: string;
  slidesToShow?: number;
  slidesToScroll?: number;
  onSeeMore?: () => void;
  titleStyle?: React.CSSProperties;
  loading?: boolean;
  categoryName?: string;
}

const CardSlider: React.FC<CardSliderProps> = ({
  title,
  items,
  categoryName,
  slidesToShow = 5,
  slidesToScroll = 2,
  titleStyle,
  loading,
  onSeeMore,
}) => {
  const sliderRef = useRef<any | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  // const shouldShowArrows = items.length > slidesToShow;
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const shouldShowArrows = isXs
    ? items.length > 1
    : items.length > slidesToShow;

  const settings = {
    dots: false,
    infinite: items.length > slidesToShow,
    speed: 200,
    slidesToShow,
    slidesToScroll,
    arrows: shouldShowArrows,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: items.length > 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: items.length > 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: items.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: items.length > 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ minHeight: "600px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100px",
          marginBottom: "30px ",
        }}
      >
        <Typography
          component={"span"}
          sx={{
            fontSize: { xs: "16px", md: "26px" },
            lineHeight: "25px",
            color: "#3E3F20",
            fontWeight: "bold",
            ...titleStyle,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "4px", md: "10px" },
          }}
        >
          {shouldShowArrows && (
            <>
              {onSeeMore && (
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    onClick={onSeeMore}
                    sx={{
                      fontSize: { xs: "10px", md: "14px" },
                      cursor: "pointer",
                      color: "#A44819",
                      "&:hover": { color: "#843513", cursor: "pointer" },
                    }}
                  >
                    See more
                  </Typography>
                </Box>
              )}

              <IoIosArrowBack
                onClick={() => sliderRef.current?.slickPrev()}
                style={{
                  cursor: "pointer",
                  color: "#a44819",
                  fontSize: "30px",
                }}
              />
              <IoIosArrowForward
                onClick={() => sliderRef.current?.slickNext()}
                style={{
                  cursor: "pointer",
                  color: "#a44819",
                  fontSize: "30px",
                }}
              />
            </>
          )}
        </Box>
      </Box>
      {loading ? (
        <CustomLoader />
      ) : items.length === 0 ? (
        <NoDataAvailable description="Please try again later" />
      ) : (
        <>
          <Slider ref={sliderRef} {...settings}>
            {items?.map((item, index) => (
              <div key={index} style={{ margin: "0 10px" }}>
                <Box
                  key={item.id}
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "265px",
                    height: "auto",
                  }}
                >
                  <Box
                    className="flexCenter"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(
                        `/collections/${categoryName}/${item?.productDetails?.productId}`
                      );
                    }}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="View Product Details!"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      height={0}
                      width={0}
                      sizes="(max-width: 700px) 100vw, 265px" 
                      style={{
                        width: "100%", 
                        height: "auto",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  </Box>

                  <Tooltip
                    id="my-tooltip"
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
                  <Typography
                    sx={{
                      fontSize: "14px",
                      marginTop: "10px",
                      fontFamily: "poppins",
                      fontWeight: "500",
                      color: "#3E3F20",
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <CustomTypography
                      sx={{ fontSize: "14px", color: "#A44819" }}
                    >
                      {item.price}
                    </CustomTypography>

                    <CartToggle
                      productDetails={item?.productDetails}
                      setShowLoginPrompt={setShowLoginPrompt}
                    />
                  </Box>
                  <CustomTypography sx={{ fontSize: "14px", color: "#868282" }}>
                    {`${item.colors} colors`}
                  </CustomTypography>
                  <WishlistButton
                    productDetails={item?.productDetails}
                    setShowLoginPrompt={setShowLoginPrompt}
                  />
                </Box>
              </div>
            ))}
          </Slider>

          <BasicModal
            open={showLoginPrompt}
            onClose={() => setShowLoginPrompt(false)}
          >
            <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
          </BasicModal>
        </>
      )}
    </Box>
  );
};

export default CardSlider;
