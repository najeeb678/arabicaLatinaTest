import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import CustomTypography from "@/_components/common/CustomTypography";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import CustomPagination from "@/_components/common/CustomTablePagination/CustomPagination";
import { Router, useRouter } from "next/router";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CustomLoader from "@/_components/common/CustomLoader";
import NoDataAvailable from "@/_components/common/NoDataAvailable/NoDataAvailable";
import CartToggle from "../AddToCart/CartToggle/CartToggle";
import { Tooltip } from "react-tooltip";
import WishlistButton from "../AddToCart/WishlistButton/WishlistButton";
import BasicModal from "@/_components/common/CustomModal/BasicModal";
import LoginPrompt from "../Shopping/LoginPrompt";
import index from "@/pages/authentication/sign-in";
import Image from "next/image";

interface OrganicSpreadsProps {
  categoryName: string;
}

const OrganicSpreads: React.FC<OrganicSpreadsProps> = ({ categoryName }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const {
    productData: { organic: organicSpreads },

    loading: { organic: isLoading },
    errors: { organic: organicError },
  } = useSelector((state: RootState) => state.products);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "..."; // Add ellipsis if truncated
    }
    return description;
  };
  return (
    <Box sx={{ padding: "0 50px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Typography sx={{ fontSize: "14px", color: "#868282" }}>
          Home
          <Typography
            component="span"
            sx={{ fontWeight: "bold", color: "#000" }}
          >
            / Organic Spreads
          </Typography>
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "50px",
          lineHeight: "50px",
          color: "#A44819",
          marginBottom: "1rem",
          marginTop: "28px",
          fontFamily: "AestheticRomance",
          textAlign: "center",
        }}
      >
        Organic Spreads
      </Typography>

      <Grid container spacing={3} sx={{ padding: "0 50px", marginTop: "60px" }}>
        {isLoading ? (
          <Grid component="div" size={{ xs: 12 }} sx={{}}>
            <CustomLoader />
          </Grid>
        ) : organicSpreads.length === 0 ? (
          <NoDataAvailable />
        ) : (
          organicSpreads
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <Grid
                component="div"
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={index}
                sx={{}}
              >
                <Box
                  style={{
                    position: "relative",
                    height: "600px",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    className="flexCenter"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(
                        `/collections/${categoryName}/${product.productId}`
                      )
                    }
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="View Product Details!"
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: "350px",
                        width: "240px",
                      }}
                    >
                      <Image
                        src={product.Variants[0].attachment}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                      />
                    </Box>
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
                  <Box sx={{ marginLeft: "20px" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        marginTop: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {product.name}
                    </Typography>

                    <CustomTypography
                      sx={{
                        fontSize: "12px",
                        marginTop: "10px",
                        color: "#868282",
                      }}
                    >
                      {product.composition}
                    </CustomTypography>

                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        marginTop: "5px",
                      }}
                    >
                      <CustomTypography
                        sx={{ fontSize: "14px", color: "#A44819" }}
                      >
                        {`SAR ${product.basePrice}`}
                      </CustomTypography>

                      <CartToggle
                        productDetails={product}
                        setShowLoginPrompt={setShowLoginPrompt}
                      />
                    </Box>
                    <CustomTypography
                      sx={{
                        width: "200px",
                        fontSize: "12px",
                        marginTop: "10px",
                        color: "#868282",
                      }}
                    >
                      {truncateDescription(product?.description, 160)}
                    </CustomTypography>
                  </Box>

                  <WishlistButton
                    productDetails={product}
                    setShowLoginPrompt={setShowLoginPrompt}
                  />
                </Box>
              </Grid>
            ))
        )}
        {organicSpreads.length > rowsPerPage && (
          <Box
            sx={{
              display: "flex",
              mt: 3,
              height: "40px",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <CustomPagination
              count={organicSpreads.length} // Total pages
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        )}
      </Grid>
      <BasicModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      >
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      </BasicModal>
    </Box>
  );
};

export default OrganicSpreads;
