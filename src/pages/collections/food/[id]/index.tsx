import Grid from "@mui/material/Grid2";

import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import ProductNotFound from "@/_components/common/ProductNotFound";

const foods = [
  {
    id: 1,
    name: "Organic Rainforest Spread",
    ingredients: "Brazil nuts + cacao nibs",
    price: "SAR30.00",
    description:
      "Wonders happen when you mix organic criollo cocoa beans, organic almonds, and organic Brazil nuts. So delicious! And it has 50% less sugar than the leading brand!",
    details: [
      "It elevates the mood.",
      "Increases energy.",
      "Rich in antioxidants.",
      "Great source of protein and fiber.",
      "Rich in selenium.",
      "A good source of calcium, iron, magnesium, and vitamin E.",
    ],
    imageUrl: "/Images/Mask group.svg",
  },
  // Other products...
];

const FoodDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const food = foods.find((f) => f.id === parseInt(id as string));

  if (!food) {
    return <ProductNotFound />;
  }

  const [quantity, setQuantity] = useState(1);
  let maxQuantity = 10;

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Box sx={{ margin: "50px auto", maxWidth: "1200px", padding: "20px" }}>
      {/* Breadcrumb */}
      <Typography
        sx={{
          fontSize: "16px",
          color: "#868282",
          marginBottom: 3,
          padding: "0 50px",
        }}
      >
        Home / Organic Spreads{" "}
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", display: "inline", color: "#868282" }}
        >
          / {food.name}
        </Typography>
      </Typography>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid
          component="div"
          size={{ xs: 12, md: 6 }}
          sx={{ padding: "0 50px" }}
        >
          <Box
            sx={{
              border: "1px solid #C48E70",

              overflow: "hidden",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F8F5F3",
              position: "relative",
              height: "710px",
            }}
          >
            <img
              src={food.imageUrl}
              // src={food.imageUrl}
              alt={food.name}
              style={{
                maxWidth: "100%",
                minHeight: "550px",

                objectFit: "contain",
              }}
            />
            <FaRegHeart
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                color: "#a44819",
                width: "20px",
                height: "20px",
              }}
            />
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid component="div" size={{ xs: 12, md: 6 }} sx={{}}>
          {/* Title and Price */}
          <Box
            className="flexCenter"
            sx={{
              height: "50px",
              width: "168px",
              backgroundColor: "#f0e2cb",
              color: "#3E3F20",
              fontSize: "16px",
              fontFamily: "GaretBook",
              borderRadius: "5px",
              lineHeight: "25px",
            }}
          >
            Only a Few Left!
          </Box>

          <Typography
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
              color: "#868282",
              margin: "20px 0",
            }}
          >
            {food.name}
          </Typography>

          <Divider sx={{ marginBottom: 1 }} />
          <Typography
            sx={{
              fontFamily: "GaretHeavy",
              fontSize: "16px",
              marginBottom: 3,
              color: "#3E3F20",
            }}
          >
            SAR {food.price}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "50px",
              color: "#3E3F20",
              marginBottom: "0px",
            }}
          >
            {food.ingredients}
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "20px",
              color: "#3E3F20",
              marginBottom: "20px",
            }}
          >
            {food.description}
          </Typography>

          {/* Features/Details */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 1, color: "#3E3F20" }}
          >
            Description
          </Typography>
          <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
            {food.details.map((detail, index) => (
              <li key={index} style={{ marginBottom: "8px", color: "#3E3F20" }}>
                <Typography variant="body2">{detail}</Typography>
              </li>
            ))}
          </ul>

          {/* Quantity Selector */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleDecrease}
              sx={{
                minWidth: "40px",
                height: "40px",
                borderColor: "#BA9775",
                color: "#BA9775",
                "&:hover": { backgroundColor: "#F8F5F3" },
              }}
            >
              -
            </Button>
            <Typography
              variant="body1"
              sx={{
                margin: "0 16px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {quantity}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleIncrease}
              sx={{
                minWidth: "40px",
                height: "40px",
                borderColor: "#BA9775",
                color: "#BA9775",
                "&:hover": { backgroundColor: "#F8F5F3" },
              }}
            >
              +
            </Button>
            <Typography
              sx={{ marginLeft: "16px", color: "#555", fontSize: "14px" }}
            >
              Max: {maxQuantity} units
            </Typography>
          </Box>

          {/* Add to Bag Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#f4a94d",
              color: "#A44819",
              fontFamily: "GaretHeavy",
              padding: "12px 20px",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",

              "&:hover": {
                color: "#fff",
                backgroundColor: "#D98F35",
                boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            ADD TO BAG
          </Button>

          {/* Payment Options */}
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <img
              src="/Images/apple pay.svg"
              alt="Payment Options"
              style={{ maxWidth: "150px", cursor: "pointer" }}
            />
            <img
              src="/Images/mastercard.svg"
              alt="Payment Options"
              style={{ maxWidth: "150px", cursor: "pointer" }}
            />
            <img
              src="/Images/visa.svg"
              alt="Payment Options"
              style={{ maxWidth: "150px", cursor: "pointer" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FoodDetails;
