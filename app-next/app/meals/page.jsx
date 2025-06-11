"use client";

import MealsList from "../../components/MealsPage/MealsList";
import { Container, Box } from "@mui/material";
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
