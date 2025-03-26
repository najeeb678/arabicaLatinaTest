import React, { useCallback, useEffect, useState } from "react";
import { Box, IconButton, InputBase, Modal, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import CustomTypography from "@/_components/common/CustomTypography";
import { useRouter } from "next/router";
import { debounce } from "lodash";

const SearchModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  marginTop: 0,
});

const SearchContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "180px",
  backgroundColor: "#fef9f4",
  position: "absolute",
  top: 0,
  left: 0,
  padding: "20px 40px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    padding: "10px 20px",
  },
}));

const SearchBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f5efef",
  borderRadius: "8px",
  padding: "10px 15px",
  width: "50%",
  margin: "0 auto",
  marginTop: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    padding: "8px 10px",
  },
}));

const SuggestedSearches = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "15px",
  marginTop: "20px",
  color: "#9c5735",
  fontSize: "14px",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
  },
}));

const SearchIconComponent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        router.push(
          `/collections/search-products?query=${encodeURIComponent(query)}`
        );
      } else {
        router.push(`/`);
      }
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() === "") {
      debouncedSearch.cancel();
      router.push(`/`);
    } else {
      debouncedSearch(value);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SearchIcon  style={{ fontSize: "22px", cursor: "pointer",color:"#a4481a" }}/>
      </IconButton>
      <SearchModal open={open} onClose={handleClose}>
        <SearchContainer>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <SearchBar>
              <InputBase
                placeholder="Search..."
                fullWidth
                value={searchText}
                onChange={handleSearchChange}
              />
              <SearchIcon style={{ color: "#9c5735" }} />
            </SearchBar>
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ color: "#9c5735" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "50px",
              marginLeft: "10%",
              ["@media (max-width:600px)"]: {
                flexDirection: "column",
                gap: "10px",
                marginLeft: 0,
                textAlign: "center",
              },
            }}
          >
            <CustomTypography
              sx={{
                fontSize: "18px",
                color: "#A44819",
                marginTop: "20px",
                fontFamily: "GaretHeavy",
              }}
            >
              Suggested searches
            </CustomTypography>
            <SuggestedSearches>
              <Typography>Season deals</Typography>
              <Typography>Offers</Typography>
              <Typography>Trendy</Typography>
              <Typography>Scarfs</Typography>
              <Typography>Jackets</Typography>
            </SuggestedSearches>
          </Box>
        </SearchContainer>
      </SearchModal>
    </>
  );
};

export default SearchIconComponent;
