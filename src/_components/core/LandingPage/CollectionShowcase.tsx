import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomTypography from "@/_components/common/CustomTypography";
import CollectionCard from "./CollectionCard";

const collections = [
  {
    name: "WOMAN’S COLLECTION",
    description: "Details of Timeless Warmth",
    // imageUrl:
    //   "https://res.cloudinary.com/drascgtap/image/upload/v1742552270/BookingEngine/hjwes5imb8kc6nkwikkr.png",
    imageUrl: "/Images/turtle sweater.svg",
    url: "/collections/women",
  },
  {
    name: "MEN’S COLLECTION",
    description: "Comfort at its Best",
    // imageUrl:
    //   "https://res.cloudinary.com/drascgtap/image/upload/v1742552374/BookingEngine/alcdejbfqz5brezfbq3l.png",

    imageUrl: "/Images/UNDYED textured scarf.svg",
    url: "/collections/men",
  },
  {
    name: "JEWELRY FOR YOU",
    description: "Silver and gold art for every special moment",
    // imageUrl:
    //   "https://res.cloudinary.com/drascgtap/image/upload/v1742552395/BookingEngine/bywmp7aehwwumdruxjkn.png",
    imageUrl: "/Images/JEWELRY.svg",
    url: "/collections/jewelry",
  },
];

const CollectionShowcase = () => {
  return (
    <Box sx={{ textAlign: "center", width: "90%", mx: "auto" }}>
      <Box
        sx={{
          width: "97%",
          mx: "auto",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Typography
          component={"span"}
          sx={{
            fontSize: "26px",
            lineHeight: "25px",
            color: "#3E3F20",
            fontWeight: "bold",
          }}
        >
          Impeccable Style, Incomparable Warmth
        </Typography>

        <CustomTypography
          sx={{
            fontSize: "14px",
            lineHeight: "25px",
            marginTop: "12px",
            color: "#3E3F20",
          }}
        >
          OUR FINEST COLLECTIONS
        </CustomTypography>
      </Box>

      <Grid
        container
        flexDirection={"row"}
        spacing={1.5}
        sx={{ margin: "0 auto" }}
      >
        {collections.map((item, index) => (
          <Grid
            key={index}
            size={{ xs: 12, md: 4 }}
            sx={{ height: "auto", textAlign: "center", marginBottom: "20px" }}
          >
            {/* Client Component */}
            <CollectionCard item={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CollectionShowcase;
