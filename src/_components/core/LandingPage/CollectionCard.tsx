"use client";

import Image from "next/image";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

const CollectionCard = ({ item, index }: any) => {
  const router = useRouter();
  const isBelow = useMediaQuery("(max-width:400px)");
  const isBelow1200 = useMediaQuery("(max-width:1200px)");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: isBelow ? "100%" : "300px", sm: "380px", lg: "400px" },
        margin: "0 auto",
      }}
    >
      <Box sx={{ width: "100%", height: "567px", position: "relative" }}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
          style={{
            objectFit: "cover",
            // aspectRatio: "16 / 9",
            borderRadius: "0px",
            border: index === 2 ? "none" : "1px solid #e8e3e0",
          }}
          priority
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "84px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          borderBottom: "1px solid #b6b4a5",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "25px",
            marginTop: "8px",
            color: "#3E3F20",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            "&:hover": { color: "#A44819" },
          }}
          onClick={() => router.push(item.url)}
        >
          {item.name}
          <IoIosArrowForward
            style={{ marginLeft: "5px", fontSize: "18px", fontWeight: "bold" }}
          />
        </Typography>

        <Typography
          sx={{ fontSize: "14px", lineHeight: "25px", color: "#3E3F20" }}
        >
          {item.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default CollectionCard;
