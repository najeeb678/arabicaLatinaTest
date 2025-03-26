import React from "react";
import { Box,  Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";


const foods = [
  {
    id: 1,
    title: "Highly nutritious",
    description: `Organic honey is full of antioxidants, enzymes, and minerals including iron, zinc, potassium, calcium, phosphorus, magnesium, and selenium.`,
    details: [
      {
        heading: "May reduce cholesterol levels",
        content:
          "It is also loaded with vitamin B6, thiamin, riboflavin, and niacin. The vitamins and minerals present in honey help reduce cholesterol levels.Its antioxidant properties make honey an excellent ally of the immune system. Industrial honey is usually processed, and this destroys its natural enzymes, vitamins, and minerals.",
      },
      {
        heading: "Boost your immune system",
        content:
          "Its antioxidant properties make honey an excellent ally of the immune system. Industrial honey is usually processed, and this destroys its natural enzymes, vitamins, and minerals.",
      },
    ],
    image: "/Images/HONEY.svg",
  },
  {
    id: 2,
    title: "Sweet and healthy",

    details: [
      {
        heading: "May reduce the risk of cancer",
        content:
          "Containing vitamins, antioxidants, and minerals, Brazil nuts are a fantastic source of selenium which protects cells from damage and may reduce the risk of certain types of cancer.",
      },
      {
        heading: "No more bad cholesterol",
        content: ` Brazil nuts also reduce LDL cholesterol, the "bad" cholesterol.`,
      },
    ],
    description: `Brazil nuts not only taste great, but they are also very healthy.`,

    image: "/Images/NUTS.svg",
  },

  {
    id: 3,
    title: "Organic variety",

    details: [
      {
        heading: "More benefits for your health",
        content:
          "More benefits for your health. Cacao is rich in polyphenols, a natural antioxidant linked to numerous health benefits: it reduces inflammation, improves cholesterol levels, and, because it has the highest concentration of flavanols, also improves heart function.And may help reduce the risk of brain disease.",
      },
    ],
    description: `Our organic criollo cocoa and organic cocoa nibs add flavor and nutrition to this unique variety.`,

    image: "/Images/CACAO NIBS.svg",
  },
];

const FoodsProperties = () => {
  return (
    <Box
      sx={{
        width: "85%",
        margin: "auto",
        padding: "40px 30px",
        backgroundColor: "#bb7550",
      }}
    >
      <Typography
        sx={{
          fontFamily: "GaretHeavy",
          fontSize: "25px",
          lineHeight: "30px",
          letterSpacing: "2%",
          padding: "20px 0",
          marginLeft: "20px",
          color: "#FFFFFF",
        }}
      >
        FOODS <br />
        PROPERTIES
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ padding: "0 20px", marginTop: "40px", marginBottom: "30px" }}
      >
        {foods.map((food, index) => (
          <Grid
            component="div"
            size={{ xs: 12, md: 4 }}
            key={index}
            sx={{ minHeight: "570px" }}
          >
            <Box
              sx={{
                backgroundColor: "#FEF9F4",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                padding: "0px 0px 20px 0px ",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Image Section */}
              <Box
                component="img"
                src={food.image}
                alt={food.title}
                sx={{
                  width: "100%",
                  height: "225px",
                  objectFit: "cover",
                }}
              />
              {/* Content Section */}
              <Box sx={{ padding: "16px", backgroundColor: "#FEF9F4" }}>
                <Typography
                  sx={{
                    fontFamily: "GaretHeavy",
                    fontSize: "14px",
                    color: "#6A6461",
                    marginBottom: "8px",
                  }}
                >
                  {food.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#6A6461",
                    marginBottom: "8px",
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "0.24px",
                  }}
                >
                  {food.description}
                </Typography>
                {food.details.map((detail, detailIndex) => (
                  <Box key={detailIndex} sx={{ marginTop: "15px" }}>
                    <Typography
                      sx={{
                        fontFamily: "GaretHeavy",
                        fontSize: "14px",
                        color: "#6A6461",
                        marginBottom: "8px",
                      }}
                    >
                      {detail.heading}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6A6461",
                        marginBottom: "8px",
                        fontSize: "12px",
                        lineHeight: "16px",
                        letterSpacing: "0.24px",
                      }}
                    >
                      {detail.content}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FoodsProperties;
