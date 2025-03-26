import React, { memo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { resetOrderState } from "@/redux/slices/orderSlice"; 
interface SidebarLink {
  label: string;
  icon: React.ReactNode;
}

const myAccountSidebarLinks: SidebarLink[] = [
  { label: "My account", icon: <PermIdentityOutlinedIcon /> },
  { label: "Password", icon: <LockOutlinedIcon /> },
  { label: "My wishlist", icon: <FavoriteBorderOutlinedIcon /> },
  { label: "My orders", icon: <LocalMallOutlinedIcon /> },
  { label: "Address Book", icon: <NoteOutlinedIcon /> },
  { label: "My wallet", icon: <AttachMoneyOutlinedIcon /> },
  { label: "Communication Preferences", icon: <TvOutlinedIcon /> },
  { label: "Sign Out", icon: <LogoutOutlinedIcon /> },
];

const MyAccountSidebarLinks: React.FC<{
  activeSection: string;
  onSectionChange: (section: string) => void;
}> = memo(({ activeSection, onSectionChange }) => {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(resetOrderState()); 
    localStorage.clear();
    toast.success("Signed out successfully!");
    router.push("/");
  };
  return (
    <Box sx={{ padding: "16px", border: "1px solid #C48E70" }}>
      <Stack spacing={1.5}>
        {myAccountSidebarLinks.map((link) => (
          <Box
            key={link.label}
            onMouseEnter={() => setHoveredPath(link.label)}
            onMouseLeave={() => setHoveredPath(null)}
            onClick={() => {
              if (link.label === "Sign Out") {
                handleSignOut();
              } else {
                onSectionChange(link.label);
              }
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "50px",
              padding: "0 12px",
              borderRadius: "10px",
              backgroundColor:
                activeSection === link.label
                  ? "#f1e8db"
                  : hoveredPath === link.label
                  ? "#f1e8db"
                  : "transparent",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            <Box
              sx={{
                color: "#C48E70",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
              }}
            >
              {link.icon}
            </Box>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: activeSection === link.label ? 600 : 400,
                color: activeSection === link.label ? "#A44819" : "#5b4635",
              }}
            >
              {link.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
});

export default MyAccountSidebarLinks;
