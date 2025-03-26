import React from 'react'
import { Box } from '@mui/material';
import Head from 'next/head'
import CustomTypography from '@/_components/common/CustomTypography';

export const index = () => {
   
   return (
      <>
      <Head>
         <title>About Us -Arabic Latina</title>
         <meta name="description" content="This is a about us page for Arabic Latina"/>
         </Head>
      <Box
         sx={{
            // height: {xs: '750px', md: '565px'},
            margin: { xs: '0px 20px', md: '0px 50px', lg: '0px 100px' },
         }}
      >
         <Box
            sx={{
               height: '40px',
               marginTop: '40px'
            }}
         >
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontWeight: 300,
                  fontSize: { xs: '12px', md: '14px', },
                  color: "#3E3F20"
               }}
            >
               Home /&nbsp;&nbsp;
               <CustomTypography
                  component="span"
                  sx={{
                     fontFamily: 'GaretBook',
                     fontWeight: 600,
                     fontSize: { xs: '12px', md: '14px', lg: '16px' },
                     color: "#3E3F20"
                  }}
               >
                  About us
               </CustomTypography>
            </CustomTypography>
         </Box>
         <Box
            sx={{
               maxWidth: '100%',
               backgroundColor: '#E2CBA280',
            }}
         >
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontSize: { xs: '16px', md: '20px', lg: '22px' },
                  fontWeight: 600,
                  lineHeight: '50px',
                  color: '#3E3F20',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: { xs: '10px', md: '25px' },
               }}
            >
               About Arabica Latina
            </CustomTypography>
         </Box>
         <Box
            sx={{
               maxWidth: '100%',
               marginLeft: { xs: '10px', md: '25px' },
               textAlign: 'left',
               marginBottom: "100px"
            }}
         >
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontSize: { xs: '14px', md: '16px', lg: '18px' },
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: '#3E3F20',
                  letterSpacing: '0.06em',
                  marginTop: '32px',
                  height: { xs: 'auto', md: '54px', },
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               We connect Peru’s heritage to the world with crafted products that honor tradition and artisans.
            </CustomTypography>
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontSize: { xs: '12px', md: '13px', lg: '14px' },
                  fontWeight: 300,
                  lineHeight: '25px',
                  color: '#000000',
                  letterSpacing: '0.02em',
                  marginTop: '31px',
                  // height: { xs: 'auto', md: '23px' },
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               At Arabica Latina, we merge tradition and modernity to offer unique products that represent the cultural richness of Peru.
               From alpaca textiles to handcrafted jewelry to lifestyle products, each piece reflects the heritage of our land and the passion of Peruvian artisans.  <br />
               Our commitment is to connect the authenticity of our Peruvian roots with a global marketplace by global marketplace, providing high quality products and generating a positive impact on local communities.


            </CustomTypography>
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontSize: { xs: '14px', md: '16px', lg: '18px' },
                  fontWeight: 600,
                  lineHeight: '25px',
                  color: '#000000',
                  letterSpacing: '0.02em',
                  marginTop: '13px',

                  height: '54px',
                  display: 'flex',
                  alignItems: 'center',

               }}
            >
               Mission
            </CustomTypography>
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontSize: { xs: '12px', md: '13px', lg: '14px' },
                  fontWeight: 300,
                  lineHeight: { xs: '19px', md: '25px' },
                  color: '#000000',
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'justify-start',
                  height: { xs: 'auto', md: '42px' },
                  maxWidth: '990px',

               }}
            >
               To promote the cultural and artisanal richness of Peru through unique and sustainable products that inspire authentic connections between people and our roots.
            </CustomTypography>
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontSize: { xs: '14px', md: '16px', lg: '18px' },
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: '#3E3F20',
                  letterSpacing: '0.02em',
                  marginTop: '31px',
                  height: '54px',
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               Vision
            </CustomTypography>
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontSize: { xs: '12px', md: '13px', lg: '14px' },
                  fontWeight: 300,
                  lineHeight: { xs: '19px', md: '25px' },
                  color: '#000000',
                  letterSpacing: '0.02em',
                  maxWidth: '975px',
               }}
            >
               To become the leading brand that represents Peruvian art, culture and design in the world, creating a bridge between tradition and modernity, creating a bridge between tradition and modernity with a positive social impact.
            </CustomTypography>
         </Box>
      </Box>
      </>
   );
};

export default index;
