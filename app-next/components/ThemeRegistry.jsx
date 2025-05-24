"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // navbar background
      contrastText: "#4A772F", // text color on primary
    },
    secondary: {
      main: "#F2A900", // searchbox hover background
    },
    background: {
      default: "#ffffff", // default page backgroun
      paper: "#f5f5f5", // drawer background
    },
    text: {
      primary: "#222222", // main text color
      secondary: "#666666", // lighter text
      logo: "#556B2F",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h6: {
      fontWeight: 600,
      fontSize: "1.2rem",
    },
    body1: {
      fontSize: "1rem",
    },
    logo: {
      fontSize: "1.6rem",
    },
    navItem: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  shape: {
    borderRadius: 2.5,
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
