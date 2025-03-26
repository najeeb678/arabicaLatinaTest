import { createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/system";

const theme = createTheme({
  typography: {
    fontFamily: "'GaretBook', 'Poppins', sans-serif",
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          fontSize: "14px",
          padding: "4px 8px",
          color: "#161616",
        },
      },
    },
  },
});

// Global styles should be placed outside of the theme
export const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        fontFamily: "'GaretBook', 'Poppins', sans-serif",
        backgroundColor: "#fdf8f5",
        color: "black",
      },
      h1: {
        fontFamily: "'GaretHeavy', sans-serif",
      },
      h2: {
        fontFamily: "'GaretHeavy', sans-serif",
      },
      h3: {
        fontFamily: "'GaretHeavy', sans-serif",
      },
      h4: {
        fontFamily: "'GaretHeavy', sans-serif",
      },
      h5: {
        fontFamily: "'GaretHeavy', sans-serif",
      },
      h6: {

        fontFamily: "'GaretHeavy', sans-serif",
      },
      h7: {
        fontSize: "16px",
        fontFamily: "'GaretHeavy', sans-serif",
      },
      "::-webkit-scrollbar": {
        width: "2px",
        height: "2px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#3E3F20",
        borderRadius: "24px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#3E3F20", // Keep the same color on hover
        width: "2px", // Prevent width increase
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#f5f5f5",
        borderRadius: "inherit",
        margin: "5px", // Optional: Adjust to avoid overlap at the edges
      },
      "::-webkit-scrollbar-track:hover": {
        backgroundColor: "#f5f5f5", // Keep the same color on hover
      },
      "*": {
        boxSizing: "border-box", // Ensures padding and borders are included in element dimensions
      },
    }}
  />
);

export default theme;
