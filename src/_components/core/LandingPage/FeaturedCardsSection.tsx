import React, { ReactNode } from "react";
import { Box, Button } from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography";
import Grid from "@mui/material/Grid2";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { useRouter } from "next/router";
import SubscribeModal from "../SubscribeModal/SubscribeModal";
import { lineHeight } from "@mui/system";

const FeaturedCardsSection = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const data = [
    {
      description: "Limited edition pieces Only a few units left!",
      descriptionColor: "#3C3837",
      descriptionBoxWidth: "274px",
      buttonText: "Take a look",
      buttonColor: "#A44819",
      width: "160px",
      height: "50px",
      trailingIcon: <ArrowRightAltIcon />,
      backgroundColor: "#d1a187",
      hoverColor: "#fff",
      actionType: "navigate",
      actionLink: "/collections/limited-edition",
      fontSize: "20px",
      lineHeight: "auto",
    },
    {
      description: (
        <>
          Subscribe now and get first <br />
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {" "}
            Our limited collections
          </Box>
        </>
      ),
      descriptionColor: "#987851",
      descriptionBoxWidth: "394px",
      buttonText: "Subscribe",
      buttonColor: "#987851",
      width: "80px",
      height: "50px",
      lineHeight: "25px",
      backgroundColor: "#e2cba2",
      hoverColor: "#fff",
      actionType: "modal",
      fontSize: "22px",
    },
    {
      description: (
        <>
          Get the perfect accessory <br />
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {" "}
            For any occasion
          </Box>
        </>
      ),
      descriptionColor: "#3C3837",
      descriptionBoxWidth: "360px",
      buttonText: "Take a look",
      buttonColor: "#A44819",
      width: "160px",
      height: "50px",
      trailingIcon: <ArrowRightAltIcon />,
      backgroundColor: "#d1a187",
      hoverColor: "#fff",
      actionType: "navigate",
      actionLink: "/collections/jewelry",
      fontSize: "20px",
      lineHeight: "auto",
    },
  ];

  const handleButtonClick = (actionType: string, actionLink?: string) => {
    if (actionType === "navigate" && actionLink) {
      router.push(actionLink);
    } else if (actionType === "modal") {
      setOpenModal(true);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        flexDirection={"row"}
        spacing={1}
        size={{ xs: 12 }}
        sx={{}}
      >
        {data.map((item, index) => (
          <Grid
            key={index}
            size={{ xs: 12, md: 4 }}
            component="div"
            className="flexCenter"
            flexDirection={"column"}
            sx={{
              backgroundColor: item.backgroundColor,
              height: "150px",
              padding: "10px 30px",
            }}
          >
            <Box sx={{ width: item.descriptionBoxWidth, textAlign: "center" }}>
              <CustomTypography
                sx={{
                  fontSize: item.fontSize,
                  lineHeight: item.lineHeight,
                  letterSpacing: "4%",
                  color: item.descriptionColor,
                  textTransform: "uppercase",
                }}
              >
                {item.description}
              </CustomTypography>
            </Box>
            <Button
              onClick={() =>
                handleButtonClick(item.actionType, item.actionLink)
              }
              sx={{
                color: item.buttonColor,
                width: item.width || "130px",
                height: item.height,
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "Poppins",
                textDecoration: "underline",
                backgroundColor: "transparent",
                textTransform: "uppercase",

                "&:hover": {
                  color: item.hoverColor,
                  textDecoration: "underline",
                },
              }}
            >
              {item.buttonText}
              {item?.trailingIcon && item.trailingIcon}
            </Button>
          </Grid>
        ))}
      </Grid>

      <SubscribeModal
        isModalVisible={openModal}
        onClose={() => setOpenModal(false)}
        flag={true}
      />
    </Box>
  );
};

export default FeaturedCardsSection;
