import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import Header from "@/components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata = {
  title: "MealSharing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <CssBaseline />
          <Header />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
