"use client";

import MealsList from "@/components/MealsList";
import { Container, Box } from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

export default function HomePage() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8),
      }}
    >
      <Container maxWidth="md">
        <MealsList />
      </Container>
    </Box>
  );
}
