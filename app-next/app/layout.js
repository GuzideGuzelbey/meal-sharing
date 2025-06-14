import "./globals.css";
import Header from "@/components/Header";
import { Box, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata = {
  title: "MealSharing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%", margin: 0 }}>
        <ThemeRegistry>
          <CssBaseline />
          <Header />
          <Toolbar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Box sx={{ flex: 1 }}>{children}</Box>
            <Box
              component="footer"
              sx={{
                textAlign: "center",
                py: 2,
                backgroundColor: "#f2be44",
                color: "#777",
              }}
            >
              Footer Here
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
