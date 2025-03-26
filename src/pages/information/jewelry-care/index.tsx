import React from 'react'
import { Box } from '@mui/material';
import Head from 'next/head'
import CustomTypography from '@/_components/common/CustomTypography';

export const index = () => {
   return (
      <Box
         sx={{
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
                  Jewelry care
               </CustomTypography>
            </CustomTypography>
         </Box>
         
            <Box
               sx = {{
                  backgroundColor: '#E2CBA280',
                  maxWidth: '100%',
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
                  Jewelry care
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
               Arabica Latina Jewelry: A Timeless Investment
            </CustomTypography>
            <CustomTypography
               sx={{
                  fontFamily: 'GaretBook',
                  fontSize: { xs: '12px', md: '13px', lg: '14px' },
                  fontWeight: 300,
                  lineHeight: { xs: '19px', md: '14px' },
                  color: '#000000',
                  letterSpacing: '0.02em',
                  marginTop: '31px',
                  height: { xs: 'auto', md: '23px' },
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               Proper care will help maintain the beauty, brilliance, and durability of your jewelry.
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
               Jewelry Care Recommendations
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
                  maxWidth: '990px',

               }}
            >
               To preserve the integrity of your jewelry, we recommend removing it before sleeping or engaging in physical activities. Exposure to certain chemicals or harsh environments can damage your pieces, including, but not limited to: creams, perfumes, perspiration, cleaning agents, chlorine, and salt water.
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
               Maintaining Luster
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
                  height: { xs: 'auto', md: 'auto' },
                  maxWidth: '975px',

               }}
            >
               To ensure your jewelry retains its characteristic shine, it is essential to follow our care instructions. Jewelry may tarnish over time when exposed to air, so we advise cleaning it periodically with our jewelry cleaning cloth to preserve its luster.
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
               Jewelry Cleaning
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
                  height: { xs: 'auto', md: 'auto' },
                  maxWidth: '975px',

               }}
            >
               To clean your jewelry, mix two tablespoons of baking soda with a cup of hot water. Immerse the jewelry in the solution for approximately ten minutes. Using a small, soft toothbrush, gently clean the jewelry, paying special attention to the crevices to remove any debris. If dirt persists, soak the jewelry in clean water. Finally, polish the pieces with a soft, clean towel to restore their original shine.
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
               How to Store Your Jewelry
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
                  height: { xs: 'auto', md: 'auto' },
                  maxWidth: '975px',

               }}
            >
               For optimal preservation, store your jewelry away from direct sunlight and heat.
               Keep it in a protective jewelry box with a soft, smooth lining to prevent scratches.
               We advise against storing jewelry in damp areas, such as bathrooms, to avoid potential damage.
            </CustomTypography>
         </Box>
      </Box>
   );
};

export default index;
