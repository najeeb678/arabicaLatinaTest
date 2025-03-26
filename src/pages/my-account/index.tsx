import React, {  useEffect, useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MyAccountSidebarLinks from "@/_components/core/MyAccounts/MyAccountSidebarLinks";
import ProfileSection from "@/_components/core/MyAccounts/ProfileSection";
import WalletSection from "@/_components/core/MyAccounts/WalletSection";

import Wishlist from "@/_components/core/MyAccounts/Wishlist";
import MyOrders from "@/_components/core/MyAccounts/MyOrders";
import AddressBook from "@/_components/core/MyAccounts/AddressBook";
import UserPassword from "@/_components/core/MyAccounts/UserPassword";
import Preferances from "@/_components/core/MyAccounts/Preferances";

const MyAccount = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState("My orders");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  

  return (<>
    <title>My Account</title>
   
    <Box sx={{ padding: "40px 20px", minHeight: "100vh" }}>
      <Grid container spacing={1}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 2.8 }} component="div">
          <MyAccountSidebarLinks
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </Grid>

        {/* Main Content */}
        <Grid
          size={{ xs: 12, md: 9 }}
          component="div"
          sx={{ marginLeft: "10px" }}
        >
          {/* Render section based on active state */}
          {activeSection === "My account" && (
            <>
              <Grid
                container
                size={{ xs: 12 }}
                spacing={2}
                component="div"
                sx={{ marginLeft: "10px" }}
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <ProfileSection
                    setActiveSection={setActiveSection}
                    activeSection={activeSection}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <WalletSection
                    setActiveSection={setActiveSection}
                    activeSection={activeSection}
                  />
                </Grid>
              </Grid>
            </>
          )}
          {activeSection === "My wallet" && (
            <WalletSection
              setActiveSection={setActiveSection}
              activeSection={activeSection}
            />
          )}
          {activeSection === "My wishlist" && (
            <Wishlist
              setActiveSection={setActiveSection}
              activeSection={activeSection}
            />
          )}
          {activeSection === "My orders" && (
            <div>
              <MyOrders />
            </div>
          )}
          {activeSection === "Address Book" && (
            <div>
              <AddressBook
                setActiveSection={setActiveSection}
                activeSection={activeSection}
              />
            </div>
          )}
          {activeSection === "Password" && (
            <div>
              <UserPassword
                setActiveSection={setActiveSection}
                activeSection={activeSection}
              />
            </div>
          )}
          {activeSection === "Communication Preferences" && <Preferances />}
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default MyAccount;
