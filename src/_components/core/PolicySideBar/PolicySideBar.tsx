import { Box, Typography, Divider } from "@mui/material";
import { useRouter } from "next/router";

// Define the type for individual policies
interface Policy {
  label: string;
  path: string;
}

// Define the props for the PolicySidebar component
interface PolicySidebarProps {
  policies: Policy[];
}

const PolicySidebar: React.FC<PolicySidebarProps> = ({ policies }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Box sx={{ width: "250px", marginTop: "60px", marginLeft: "25px" }}>
      {policies.map((policy, index) => (
        <Box key={index} sx={{ marginBottom: "20px" }}>
          <Typography
            onClick={() => router.push(policy.path)}
            sx={{
              fontSize: "14px",
              color: currentPath === policy.path ? "#000" : "#2E2B2A",
              fontWeight: currentPath === policy.path ? "bold" : "normal",
              fontFamily:
                currentPath === policy.path ? "GaretHeavy" : "inherit",
              cursor: "pointer",
              lineHeight: "50px",
              letterSpacing: "2%",
            }}
          >
            {policy.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PolicySidebar;
