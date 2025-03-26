import React, { useEffect } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomTypography from "@/_components/common/CustomTypography";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlanketsProducts } from "@/redux/slices/productSlice";
import CustomLoader from "@/_components/common/CustomLoader";
import NoDataAvailable from "@/_components/common/NoDataAvailable/NoDataAvailable";
import Image from "next/image";
import { slice } from "lodash";

const products = [
  {
    id: 1,
    name: "Ayacucho Throw",
    price: "$150.00",
    colors: 10,
    image: "/Images/Undyed boucle throw.svg",
  },
  {
    id: 2,
    name: "Ayacucho Throw",
    price: "$180.00",
    colors: 8,
    image: "/Images/UNDYED OMBRE THROW.svg",
  },
  {
    id: 3,
    name: "Ayacucho Throw",
    price: "$200.00",
    colors: 12,
    image: "/Images/Undyed reversible throw.svg",
  },
];

const CozyComfortsCollection = () => {
  const router = useRouter();
  const isAbove1050 = useMediaQuery("(min-width:1050px)");
  const isBelow600 = useMediaQuery("(max-width:600px)");
  const isBelow500 = useMediaQuery("(max-width:500px)");
  const dispatch: AppDispatch = useDispatch();
  const {
    productData: { blankets },
    loading: { blankets: isBlanketsLoading },
    errors: { blankets: blanketsError },
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      categoryName: "Blanket",
    };

    dispatch(fetchBlanketsProducts(params)).unwrap();
  }, [dispatch]);

  return (
    <Box
      sx={{
        padding: {
          xs: "50px 30px",
          lg: "50px 100px",
        },

        backgroundColor: "rgba(226, 203, 162, 0.5)",
      }}
    >
      <Box sx={{ marginBottom: "50px" }}>
        <Typography
          component="span"
          sx={{
            fontSize: { xs: "22px", md: "26px" },
            lineHeight: "25px",
            color: "#3E3F20",
            fontWeight: "bold",
          }}
        >
          Bring tradition to your home
        </Typography>
        <CustomTypography
          sx={{
            fontSize: "14px",
            lineHeight: "25px",
            margin: "12px 0",
            color: "#3E3F20",
          }}
        >
          TIMELESS DESIGNS IN THE SOFTEST TEXTURES
        </CustomTypography>
      </Box>
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid
          size={{ xs: 12, md: isAbove1050 ? 4 : 12 }}
          component="div"
          className={isAbove1050 ? "" : "flexCenter"}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: { xs: "530px", sm: "568px" },
              width: { xs: isBelow500 ? "100%" : "360px", sm: "389px" },
              position: "relative",
            }}
          >
            <Image
              src="/Images/Home - UNDYED PLAID THROW.svg"
              alt="Cozy Comforts Collection"
              fill
              style={{ width: "100%", height: "100%" }}
              loading="lazy"
            />
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              sx={{
                fontSize: "14px",
                lineHeight: "25px",
                marginTop: "8px",
                color: "#3E3F20",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  color: "#A44819",
                },
              }}
              onClick={() => console.log("Clicked HOME LINE COLLECTION")}
            >
              HOME LINE COLLECTION
              <IoIosArrowForward
                style={{
                  marginLeft: "5px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              />
            </Typography>
            <CustomTypography
              sx={{
                fontSize: "14px",
                lineHeight: "25px",
                marginTop: "12px",
                color: "#3 E3F20",
              }}
            >
              Smoothness at its best
            </CustomTypography>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid
          size={{ xs: 12, md: isAbove1050 ? 8 : 12 }}
          component="div"
          padding="0px 60px"
        >
          {isBlanketsLoading ? (
            <CustomLoader />
          ) : blankets.length === 0 ? (
            <NoDataAvailable description="Please try again later" />
          ) : (
            <>
              <Box
                className={isBelow600 ? "" : "flex-space-between"}
                marginBottom="50px"
              >
                <CustomTypography
                  sx={{
                    width: {
                      xs: isBelow600 ? "100%" : "60%",
                      sm: "65%",
                      md: "70%",
                    },
                    fontSize: "14px",
                    lineHeight: "25px",
                    marginTop: "12px",
                    color: "#3E3F20",
                  }}
                >
                  Wrap your moments of rest with the incomparable softness of
                  our alpaca wool blankets and throws.
                </CustomTypography>
                <Button
                  variant="outlined"
                  sx={{
                    fontFamily: "GaretBook",
                    backgroundColor: "transparent",
                    color: "#3E3F20",
                    height: { xs: "30px", sm: "35px", md: "35px" },
                    width: { xs: "100px", sm: "120px", md: "150px" },
                    fontSize: { xs: "10px", sm: "12px", md: "14px" },
                    marginTop: isBelow600 ? "20px" : "0",
                    borderColor: "#3E3F20",
                    textTransform: "none",
                  }}
                  onClick={() => router.push("/collections/blankets")}
                >
                  See More
                </Button>
              </Box>

              <Grid container spacing={2}>
                {blankets?.slice(0, 3).map((product, index) => (
                  <Grid size={{ xs: 12, sm: 4 }} component="div" key={index}>
                    <Box
                      sx={{
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className={isBelow600 ? "flexCenter" : ""}
                    >
                      <Box
                        sx={{
                          height: "350px",
                          width: "250px",
                          position: "relative",
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

                      <Box sx={{ padding: "10px" }}>
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
                          sx={{ fontSize: "14px", color: "#A44819" }}
                        >
                          {product.price}
                        </CustomTypography>
                        <CustomTypography sx={{ fontSize: "14px" }}>
                          {product.colors} colors
                        </CustomTypography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CozyComfortsCollection;
