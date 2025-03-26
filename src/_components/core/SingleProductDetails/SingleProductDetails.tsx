import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, useMediaQuery } from "@mui/material";

import { useRouter } from "next/router";
import Grid from "@mui/material/Grid2";
import AddToCartProductDetails from "../AddToCart/AddToCartProductDetails";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Head from "next/head";

const SingleProductDetails = ({ info, categoryName, productId }: any) => {
  const isAbove800 = useMediaQuery("(min-width800px)");
  const [isClient, setIsClient] = useState(false);

 
  const { productDetails, productDetailsLoading } = useSelector(
    (state: RootState) => state.order
  );
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  const productName =
    productDetails.length > 0 && productDetails[0].variants.length > 0
      ? productDetails[0].variants[0].product.name
      : "Product";
  const router = useRouter();

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const pageTitle = productName
    ? `${categoryName} ${productName} - Shop Now`
    : "Product Page";

  const pageDescription = `Find the best deals on ${productName}. Shop now for high-quality products with great offers!`;

  // Generate Dynamic Keywords
  const keywords = `${productName?.toLowerCase()}, ${categoryName?.toLowerCase()}, buy ${productName?.toLowerCase()}, online shopping, best deals`;

  // Generate Dynamic URL
  const pageUrl = `https://arabiclatina.com/collections/${productId}`;

  // Dynamic Image URL (fallback in case no product image is found)
  const productImage =
    productDetails.length > 0 &&
    productDetails[0].variants.length > 0 &&
    productDetails[0].variants[0].product.image
      ? productDetails[0].variants[0].product.image
      : "https://arabiclatina.com/Images/JEWELRY.svg";

  return (
    <>
      <Head>
        {/* Dynamic Title & Meta Description */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (OG) Metadata for Facebook & Social Sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={productImage} />
        <meta property="og:site_name" content="Arabica Latina" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={productImage} />
        <meta name="twitter:creator" content="@ArabicaLatina" />

        {/* JSON-LD Schema for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: productName,
            description: pageDescription,
            image: productImage,
            brand: {
              "@type": "Brand",
              name: "Arabica Latina",
            },
            sku: productId,
            url: pageUrl,
            offers: {
              "@type": "Offer",
              url: pageUrl,
              priceCurrency: "SAR",
              availability: "https://schema.org/InStock",
            },
          })}
        </script>
      </Head>

      <Box sx={{ padding: "20px 50px" }}>
        {/* Breadcrumb */}
        <Box sx={{ margin: "20px 0 40px 20px" }}>
          <Typography sx={{ fontSize: "14px", color: "#868282" }}>
            Home / {capitalize(categoryName || "")}{" "}
            <Typography
              component="span"
              sx={{ fontWeight: "bold", color: "#000" }}
            >
              / {productName}
            </Typography>
          </Typography>
        </Box>
        <Grid container spacing={0}>
          <Grid component="div" size={{ xs: 12 }} sx={{}}>
            <AddToCartProductDetails product={productId} flag={true} />
          </Grid>

          <Grid container size={{ xs: 12 }} spacing={2}>
            <Grid component="div" size={{ xs: 12, md: 6 }} sx={{}}></Grid>
            <Grid component="div" size={{ xs: 12, md: 6 }} sx={{}}>
              <Divider sx={{ marginBottom: 1, marginTop: "0px" }} />
              {/* Fiber Care */}
              <Box sx={{ marginTop: "30px" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  fontSize={"16px"}
                  color="#3E3F20"
                >
                  Fiber Care
                </Typography>
                <ul style={{ paddingLeft: "30px", marginTop: "15px" }}>
                  {info.fiberCare?.map((care: string, index: number) => (
                    <li key={index}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          lineHeight: "25px",
                          marginTop: "6px",
                          color: "#3E3F20",

                          letterSpacing: "0.5px",
                        }}
                      >
                        {care}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              {/* Shipping Info */}
              <Box sx={{ marginTop: "30px" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  fontSize={"16px"}
                  color="#3E3F20"
                >
                  Shipping
                </Typography>
                {info?.shippingInfo.map((data: any, index: number) => (
                  <Box key={index} sx={{ marginTop: "15px" }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "25px",
                        color: "#3E3F20",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {data.country}
                    </Typography>
                    <ul style={{ paddingLeft: "30px", marginTop: "10px" }}>
                      {data.options.map(
                        (option: string, optionIndex: number) => (
                          <li key={optionIndex}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                lineHeight: "25px",
                                color: "#3E3F20",
                                letterSpacing: "0.5px",
                              }}
                            >
                              {option}
                            </Typography>
                          </li>
                        )
                      )}
                    </ul>
                    {data.note && (
                      <Typography
                        sx={{
                          fontSize: "14px",
                          lineHeight: "20px",
                          marginTop: "10px",
                          color: "#3E3F20",
                        }}
                      >
                        {data.note}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SingleProductDetails;
