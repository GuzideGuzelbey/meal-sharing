"use client";
import { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import MealsList from "../MealsList";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

export default function HomePage() {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => setShowAll(true);

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: theme.spacing(2),
              textAlign: "center",
              fontWeight: theme.typography.h4.fontWeight,
            }}
          >
            Welcome to Meal Sharing
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              marginBottom: theme.spacing(4),
              textAlign: "center",
              color: theme.palette.text.secondary,
            }}
          >
            Discover homemade meals from people around you.
          </Typography>
        </Box>

        <MealsList limit={showAll ? undefined : 3} />

        <Box sx={{ marginTop: theme.spacing(4) }}>
          <Link href="/meals" passHref>
            <Button
              variant="outlined"
              onClick={handleShowMore}
              sx={{
                fontSize: theme.typography.navItem.fontSize,
                fontWeight: theme.typography.navItem.fontWeight,
                color: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                  color: "#fff",
                },
              }}
            >
              Show More...
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
