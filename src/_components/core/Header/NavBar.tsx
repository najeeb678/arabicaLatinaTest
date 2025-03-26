import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getAllCategories } from "@/redux/slices/productSlice";

const NavBar = () => {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0); // Tracks the starting index of visible items
  const [visibleItemsCount, setVisibleItemsCount] = useState(9); // Number of visible items
  const [categoriesData, setCategoriesData] = useState<any>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const isBelow900 = useMediaQuery("(max-width:900px)");
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Scarf", path: "/collections/scarfs" },
    { label: "Shawl", path: "/collections/shawls" },
    { label: "OutWear", path: "/collections/outWear" },
    { label: "Women", path: "/collections/women" },
    { label: "Men", path: "/collections/men" },
    { label: "Blanket", path: "/collections/blankets" },
    { label: "Jewelry", path: "/collections/jewelry" },
    { label: "Masbaha", path: "/collections/masbaha" },
    { label: "Food", path: "/collections/food" },
    { label: "LimitedEdition", path: "/collections/limited-edition" },
  ];

  const categoryNamesAndIds =
    categoriesData &&
    categoriesData.map((category: any) => ({
      categoryId: category.categoryId,
      name: category.name,
    }));
  const dynamicCategories =
    categoryNamesAndIds?.filter(
      (category: any) =>
        !navItems.some(
          (item) => item.label?.toLowerCase() === category.name?.toLowerCase()
        )
    ) || [];

  // Convert them to the required format
  const dynamicNavItems = dynamicCategories.map((category: any) => ({
    label: category.name,
    path: `/collections/${category.name?.toLowerCase()}`,
  }));

  const allnavItems = [...navItems, ...dynamicNavItems];

  useEffect(() => {
    dispatch(getAllCategories())
      .unwrap()
      .then((data) => {
        setCategoriesData(data); // Update categories
        setVisibleItemsCount(9); // Ensure only 9 items are shown initially
      });

    const calculateVisibleItems = () => {
      if (navRef.current) {
        const itemWidth = 120; // Adjust based on actual width
        const containerWidth = navRef.current.offsetWidth;

        // Prevent overriding the initially set 9 items
        setVisibleItemsCount((prev) =>
          prev !== 9
            ? Math.max(1, Math.floor(containerWidth / itemWidth))
            : prev
        );
      }
    };

    setTimeout(calculateVisibleItems, 100);

    window.addEventListener("resize", calculateVisibleItems);
    return () => window.removeEventListener("resize", calculateVisibleItems);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleNext = () => {
    if (startIndex + visibleItemsCount < allnavItems.length) {
      setStartIndex((prev) =>
        Math.min(prev + 1, allnavItems.length - visibleItemsCount)
      );
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <Box
      sx={{
        // backgroundColor: "red",
        height: "50px",
        width: "100%",
        position: "relative",
        borderTop: router.pathname !== "/" ? "1px solid #efe1ca" : "none",
        "&::before":
          router.pathname === "/"
            ? { display: "none" }
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                borderTop: "1.2px solid #efe1ca",
              },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: router.pathname === "/" ? "5%" : 0,
          width: router.pathname === "/" ? "90%" : "100%",
          borderBottom: "1.2px solid #efe1ca",
        },
      }}
    >
      <Box
        ref={navRef}
        sx={{
          width: "90%",
          margin: "0 auto",
          height: "50px",
          display: "flex",
          overflow: "auto",
          justifyContent: "space-between",
          alignItems: "center",

          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Left Arrow */}
        {startIndex > 0 && (
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: "absolute",
              left: 0,
              zIndex: 10,
              marginLeft: "20px",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}

        {/* Navigation Items */}
        <Box
          sx={{
            position: isBelow900 ? "absolute" : "relative",
            left: isBelow900 ? "8%" : "0%",
            width: isBelow900 ? "84%" : "100%",
            display: "flex",
            overflow: "hidden",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {allnavItems
            .slice(startIndex, startIndex + visibleItemsCount)
            .map((item, index) => (
              <Typography
                key={index}
                sx={{
                  fontSize: "14px",
                  width: "auto",

                  color: "#3E3F20",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Typography>
            ))}
        </Box>

        {/* Right Arrow */}

        {startIndex + visibleItemsCount <= allnavItems.length && (
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 0,
              zIndex: 10,
              marginRight: "15px",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
