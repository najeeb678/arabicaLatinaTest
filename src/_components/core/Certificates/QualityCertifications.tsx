import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid2";
// Data array for certification cards
const certifications = [
  {
    title: "Fair Trade Peru",
    description:
      "WRAP certification is recognised around the world as proof of social compliance in the apparel industry. WRAP ensures that our factory operate in a safe, responsible and ethical manner.",

    image: "/Images/CERTIF-COMERCIO-JUSTO_ENGLISH-01-1024x1024 1.png",
  },
  {
    title: "Peru Carbon Footprint",
    description:
      "Peru Carbon Footprint is an official tool of the Peruvian government that recognises how public and private organisations manage their greenhouse gas (GHG) emissions for the benefit of the environment.",
    image: "/Images/hcperu.png 1.png",
  },
  {
    title: "BASC Certification",
    description:
      "BASC certification is designed to secure and facilitate international trade based on trust and confidence by confirming the control work carried out in all production, packing, shipping and transport processes.",

    image: "/Images/BASC sin fondo 1.png",
  },
  {
    title: "BioTrade Peru",
    description:
      "Bio Trade Peru confirms that the certified company operates according to the Bio Trade model, with mechanisms for the conservation and sustainable use of biodiversity through a sustainable chain.",
    image: "/Images/Bio trade peru 1.png",
  },
  {
    title: "Worldwide Responsible Accreditation",
    description:
      "This certification confirms our commitment to principles such as opportunities for disadvantaged producers, transparency, fair trade practices, promotion of fair trade and respect for the environment.",
    image: "/Images/WRAP-Logo 1.png",
  },
];

const QualityCertifications = () => {
  return (
    <Box sx={{ padding: "50px", backgroundColor: "#FEF9F4", height: "auto" }}>
      {/* Title */}
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "GaretHeavy",
          fontSize: "26px",
          marginBottom: "30px",
          color: "#C48E70",
        }}
      >
        QUALITY CERTIFICATIONS
      </Typography>

      {/* Grid Layout */}
      <Grid container spacing={1}>
        {certifications.map((cert, index) => (
          <Grid
            size={{ xs: 12, sm: 4, md: 4, lg: 2.4 }}
            component="div"
            key={index}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "10px 20px",
                borderRadius: "none",
                boxShadow: "none",

                border: "1px solid #C49C81",
              }}
            >
              {/* Card Image */}
              <CardMedia
                component="img"
                image={cert.image}
                alt={cert.title}
                sx={{
                  height: "100px",
                  width: index === 2 ? "180px" : "120px",
                  marginBottom: "15px",
                  objectFit: index === 1 ? "contain" : "cover",
                  marginTop: "25px",
                }}
              />

              {/* Card Content */}
              <CardContent sx={{ padding: "0px 30px", marginTop: "15px" }}>
                {/* <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    color: "#8B4513",
                    marginBottom: "10px",
                  }}
                >
                  {cert.title}
                </Typography> */}
                <Typography sx={{ color: "#000000", fontSize: "12px" }}>
                  {cert.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QualityCertifications;
