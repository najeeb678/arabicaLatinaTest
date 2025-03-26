import React from 'react'
import { Box } from '@mui/material';

import CustomTypography from '@/_components/common/CustomTypography';

export const index = () => {
   return (
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
                  Jewelry warranty
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
               Jewelry warranty
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
               With proper care, your high-quality jewelry will maintain its elegance and durability for years to come.
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
               Arabica Latina jewelry comes with a 6-month warranty, covering only product failures.
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
               Product Failures
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
               If you receive a piece that is not in perfect condition, we sincerely apologize. An evaluation will be conducted to determine whether an exchange is necessary, subject to stock availability. If the item is out of stock, a credit note will be issued for an exchange.
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
               Exclusions
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
                  height: { xs: 'auto', md: '102px' },
                  maxWidth: '975px',

               }}
            >
               The warranty does not cover damage resulting from natural wear and tear, continuous use, or misuse such as impact damage or exposure to chemicals (creams, perfumes, alcohol, etc.). <br />
               For care instructions, please refer to the jewelry care section on our website.
            </CustomTypography>
         </Box>
      </Box>
   );
};

export default index;
