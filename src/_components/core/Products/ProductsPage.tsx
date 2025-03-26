import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  List,
  Checkbox,
  Divider,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Collapse,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomTypography from "@/_components/common/CustomTypography";
import { useRouter } from "next/router";
import SelectDropdown from "@/_components/common/SelectDropdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import CustomPagination from "@/_components/common/CustomTablePagination/CustomPagination";
import CustomLoader from "@/_components/common/CustomLoader";
import NoDataAvailable from "@/_components/common/NoDataAvailable/NoDataAvailable";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";

import BreadCrumb from "../BreadCrumb/BreadCrumb";
import WishlistButton from "../AddToCart/WishlistButton/WishlistButton";
import CartToggle from "../AddToCart/CartToggle/CartToggle";
import { Tooltip } from "react-tooltip";
import BasicModal from "@/_components/common/CustomModal/BasicModal";
import LoginPrompt from "../Shopping/LoginPrompt";
import Image from "next/image";

// Types for products and filters
interface Variant {
  attachment: string;
  color: string;
}

interface Product {
  productId: string;
  name: string;
  basePrice: string;
  Variants: Variant[];
  colorsAvailable: string[];
  totalColors: number;
}

interface Filter {
  label: string;
  options: string[];
}

interface ProductPageProps {
  heading: string;
  ProductDescriptionText?: string;
  products: Product[];
  filters: Filter[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (label: string, updatedOptions: string[]) => void;
  onClearFilters: () => void;
  selectedSort?: string;
  onSortChange?: (value: string) => void;

  isFullWidth?: (label: string) => boolean;
  categoryName?: string;
  loading?: boolean;
}

// Default props

const defaultIsFullWidth = (label: string) => false;

const ProductPage: React.FC<ProductPageProps> = ({
  heading,
  products,
  filters,
  selectedFilters,
  ProductDescriptionText,
  onFilterChange,
  onClearFilters,
  onSortChange,
  selectedSort,
  isFullWidth = defaultIsFullWidth,
  categoryName,
  loading = false,
}) => {
  const router = useRouter();
  const isBelow900 = useMediaQuery("(max-width:900px)");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [openFilters, setOpenFilters] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (loading) {
      setDelayedLoading(true);
      console.log("loading true");
      timer = setTimeout(() => setDelayedLoading(false), 10000);
    } else {
      console.log("loading false");
      setDelayedLoading(false);
    }

    return () => clearTimeout(timer);
  }, [loading]);
  const handleToggleFilter = (filterLabel: string) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterLabel]: !prev[filterLabel],
    }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    // console.log("Changing to page:", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sorting options
  const sortOptions = [
    { label: "Price: Low to High", value: "asc" },
    { label: "Price: High to Low", value: "desc" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];

  return (
    <>
      <Box
        sx={{
          padding: {
            xs: "10px 20px",
            sm: "10px 30px",
            md: "10px 50px",
            lg: "10px 70px",
          },
        }}
      >
        {/* Heading */}
        <Typography
          sx={{
            fontSize: "50px",
            lineHeight: "50px",
            color: "#A44819",
            marginBottom: "2rem",
            marginTop: "28px",
            fontFamily: "AestheticRomance",
            textAlign: "center",
          }}
        >
          {heading}
        </Typography>

        {/* Breadcrumb and Description */}
        <Box
          className="flex-space-between"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.3rem",
            position: "relative",
          }}
        >
          <BreadCrumb categoryName={categoryName} />
          {/* {ProductDescriptionText && (
            <Typography
              sx={{
                fontSize: "14px",
                color: "#3E3F20",
                display: { xs: "none", md: "block" },
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              {ProductDescriptionText}
            </Typography>
          )} */}
        </Box>

        {/* Filters and Sort */}
        {!isBelow900 && (
          <Box
            className="flex-space-between"
            sx={{
              padding: "0px 10px 0px 0px",

              marginTop: "-35px",
            }}
          >
            <Box>
              <Box
                sx={{
                  width: { xs: "120px", sm: "180px", md: "220", lg: "220px" },
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                }}
              >
                <CustomTypography
                  sx={{
                    fontSize: "14px",
                    lineHeight: "50px",
                  }}
                >
                  Filters
                </CustomTypography>

                <CustomTypography
                  sx={{
                    fontSize: "14px",
                    textDecoration: "underline",
                    lineHeight: "50px",
                    cursor: "pointer",
                  }}
                  onClick={onClearFilters} // Trigger clear filters in parent
                >
                  Clear All
                </CustomTypography>
              </Box>
              <Divider
                sx={{
                  color: "rgba(62, 63, 32, 0.5)",
                  width: "102%",
                  height: "2px",
                  marginBottom: "15px",
                }}
              />
            </Box>
            <Box>
              <SelectDropdown
                options={sortOptions}
                onSelectChange={onSortChange}
                selectedValue={selectedSort}
                // placeholder="Select Sort Order"
                label="Sort By"
              />
            </Box>
          </Box>
        )}

        {/* Accordion for Filters on Small Screens */}
        {isBelow900 && (
          <Accordion
            sx={{
              backgroundColor: "#faf6f3",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#ba9775" }} />}
              aria-controls="filters-content"
              id="filters-header"
              sx={{
                backgroundColor: "#fff",
                borderBottom: "1px solid #e0e0e0",
                padding: "10px 16px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#a44819",
                  height: "15px",
                }}
              >
                Filters
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "10px 16px",
              }}
            >
              {filters.map((filter, index) => (
                <Accordion
                  key={index}
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "4px",
                    marginBottom: "8px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#a44819" }} />}
                    aria-controls={`${filter.label}-content`}
                    id={`${filter.label}-header`}
                    sx={{
                      padding: "8px 12px",
                      backgroundColor: "#faf6f3",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#4a4a4a",
                      }}
                    >
                      {filter.label}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: "10px 12px",
                      height: "150px",
                      overflow: "auto",
                      scrollbarWidth: "thin", // For Firefox
                      scrollbarColor: "rgba(0, 0, 0, 0.0001) transparent",
                      "&::-webkit-scrollbar": {
                        width: "2px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0, 0, 0, 0.0001)",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.0001)",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                    }}
                  >
                    {filter?.options?.length > 0 ? (
                      <List>
                        {filter?.options?.map((option, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", color: "#4a4a4a" }}
                            >
                              {option}
                            </Typography>
                            <Checkbox
                              size="small"
                              sx={{
                                color: "#ba9775",
                                "&.Mui-checked": {
                                  color: "#ba9775",
                                },
                              }}
                              checked={
                                selectedFilters[filter.label]?.includes(
                                  option
                                ) || false
                              }
                              onChange={(e) =>
                                onFilterChange(
                                  filter.label,
                                  e.target.checked
                                    ? [
                                        ...(selectedFilters[filter.label] ||
                                          []),
                                        option,
                                      ]
                                    : selectedFilters[filter.label]?.filter(
                                        (item) => item !== option
                                      ) || []
                                )
                              }
                            />
                          </Box>
                        ))}
                      </List>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "#888",
                          textAlign: "center",
                          marginTop: "50px",
                        }}
                      >
                        No filters available
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>

            <Typography
              sx={{
                fontSize: "14px",
                textDecoration: "underline",
                cursor: "pointer",
                marginLeft: "18px",
                marginBottom: "10px",
                color: "#a44819",
                fontWeight: "bold",
              }}
              onClick={onClearFilters}
            >
              Clear All
            </Typography>
          </Accordion>
        )}

        {isBelow900 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "25px",
              marginBottom: "-10px",
            }}
          >
            <SelectDropdown
              options={sortOptions}
              onSelectChange={onSortChange}
              selectedValue={selectedSort}
              // placeholder="Select Sort Order"
              label="Sort By"
              sx={{ width: "180px" }}
            />
          </Box>
        )}
        {/* Filters and Products */}
        {delayedLoading ? (
          <CustomLoader height="50vh" circleSize={90} />
        ) : (
          <Grid container spacing={3}>
            <Grid size={{ xs: 0, md: 2.5 }} component="div">
              {!isBelow900 &&
                filters.map((filter: any, index: number) => (
                  <React.Fragment key={filter?.label || index}>
                    {index !== 0 && (
                      <Divider
                        sx={{
                          color: "rgba(62, 63, 32, 0.5)",
                          height: "2px",
                          marginBottom: "15px",
                          width: "93%",
                          marginTop: "-20px",
                        }}
                      />
                    )}

                    <Box
                      key={index}
                      sx={{
                        marginBottom: "1.5rem",
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        // backgroundColor: "red",
                      }}
                    >
                      {/* Static Label - Always show the heading */}
                      <Box
                        className="flex-space-between"
                        sx={{
                          flex: "0 0 auto",
                          paddingBottom: "5px",
                          padding: "0px 13px 5px 0px",
                          // backgroundColor: "red",
                          width: "90%",
                        }}
                      >
                        <Typography
                          component={"span"}
                          sx={{
                            fontSize: "16px",
                            lineHeight: "25px",
                            color: "#3E3F20",
                            fontWeight: "bold",
                          }}
                        >
                          {filter.label}
                        </Typography>
                        {filter.options.length > 0 && (
                          <IconButton
                            size="small"
                            onClick={() => handleToggleFilter(filter.label)}
                            sx={{ padding: 0 }}
                          >
                            {openFilters[filter.label] ? (
                              <ExpandLess
                                sx={{
                                  fontSize: "30px",
                                  transition: "transform 0.3s",
                                }}
                              />
                            ) : (
                              <AddIcon
                                sx={{
                                  fontSize: "25px",
                                  transition: "transform 0.3s",
                                }}
                              />
                            )}
                          </IconButton>
                        )}
                      </Box>

                      {/* Scrollable Options - Only show options if available */}
                      {filter.options && filter.options.length > 0 && (
                        <Collapse in={openFilters[filter.label]}>
                          <Box
                            sx={{
                              flex: "1 1 auto",
                              overflowY:
                                filter.options.length > 5 ? "auto" : "visible",
                              minHeight: "200px",
                              maxHeight:
                                filter.options.length > 5 ? "200px" : "auto",
                              scrollbarWidth: "thin", // For Firefox
                              scrollbarColor:
                                "rgba(0, 0, 0, 0.0001) transparent",
                              "&::-webkit-scrollbar": {
                                width: "2px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(0, 0, 0, 0.0001)", // Semi-transparent scrollbar
                                borderRadius: "10px",
                              },
                              "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.0001)", // Slightly darker on hover
                              },
                              "&::-webkit-scrollbar-track": {
                                background: "transparent", // Track remains invisible
                              },
                            }}
                          >
                            <List>
                              <Grid container spacing={1}>
                                {filter.options.map(
                                  (option: any, index: number) => (
                                    <Grid
                                      size={{
                                        xs: 12,
                                        md: isFullWidth(filter.label) ? 12 : 6,
                                      }}
                                      key={index}
                                      container
                                      alignItems="center"
                                    >
                                      <Box
                                        className="flex-space-between"
                                        sx={{
                                          marginBottom: "-15px",
                                          padding: "0px 10px 0px 0px",
                                        }}
                                      >
                                        <CustomTypography
                                          sx={{ fontSize: "12px" }}
                                        >
                                          {option}
                                        </CustomTypography>

                                        <Checkbox
                                          size="small"
                                          sx={{ transform: "scale(0.85)" }}
                                          checked={
                                            selectedFilters[
                                              filter.label
                                            ]?.includes(option) || false
                                          }
                                          onChange={(e) => {
                                            const updatedOptions = e.target
                                              .checked
                                              ? [
                                                  ...(selectedFilters[
                                                    filter.label
                                                  ] || []),
                                                  option,
                                                ]
                                              : (
                                                  selectedFilters[
                                                    filter.label
                                                  ] || []
                                                ).filter(
                                                  (item: any) => item !== option
                                                );

                                            onFilterChange(
                                              filter.label,
                                              updatedOptions
                                            );
                                          }}
                                        />
                                      </Box>
                                    </Grid>
                                  )
                                )}
                              </Grid>
                            </List>
                          </Box>
                        </Collapse>
                      )}
                    </Box>
                  </React.Fragment>
                ))}
            </Grid>
            {products?.length === 0 ? (
              <Grid size={{ xs: 12, md: 7.5 }} component="div">
                <NoDataAvailable message="No products available" />
              </Grid>
            ) : (
              <Grid size={{ xs: 12, md: 9.5 }} component="div">
                {/* Product Grid */}
                <Grid container spacing={1.5}>
                  {products
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((product, index) => (
                      <React.Fragment key={product?.productId || index}>
                        {/* {console.log("product", product)} */}
                        <Grid
                          component="div"
                          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                          key={index}
                        >
                          <Box
                            style={{ position: "relative", height: "450px" }}
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
                                  width: "100%",
                                }}
                              >
                                <Image
                                  src={
                                    product?.Variants?.[0]?.attachment ||
                                    "/Images/braclet.svg"
                                  }
                                  alt={product?.name || "Product Image"}
                                  layout="fill"
                                  style={{
                                    aspectRatio: "16 / 9",
                                  }}
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

                            <Box
                              sx={{
                                display: "flex",
                                gap: "5px",
                                marginTop: "10px",
                              }}
                            >
                              {product?.colorsAvailable?.map(
                                (color: any, index: any) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      width: "15px",
                                      height: "15px",
                                      borderRadius: "50%",
                                      backgroundColor: color,
                                      border: "1px solid #ddd",
                                    }}
                                  ></Box>
                                )
                              )}
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                marginTop: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              {product.name}
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
                                {product.basePrice} SAR
                              </CustomTypography>
                              <CartToggle
                                productDetails={product}
                                setShowLoginPrompt={setShowLoginPrompt}
                              />
                            </Box>
                            <CustomTypography
                              sx={{ fontSize: "14px", color: "#868282" }}
                            >
                              {`${product.totalColors} colors`}
                            </CustomTypography>

                            <WishlistButton
                              productDetails={product}
                              setShowLoginPrompt={setShowLoginPrompt}
                            />
                          </Box>
                        </Grid>{" "}
                      </React.Fragment>
                    ))}
                </Grid>
                {/* Pagination */}
                {products.length > rowsPerPage && (
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
                      count={products.length} // Total pages
                      page={page}
                      rowsPerPage={rowsPerPage}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
        )}
        <BasicModal
          open={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
        >
          <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
        </BasicModal>
      </Box>
    </>
  );
};

export default ProductPage;
