"use client";

import MealsList from "../../components/MealsPage/MealsList";
import { Container, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function MealPage() {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);
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
        <MealsList limit={showAll ? undefined : 3} />
        {!showAll && (
          <Box sx={{ marginTop: theme.spacing(4), textAlign: "center" }}>
            <Button
              variant="outlined"
              onClick={() => setShowAll(true)}
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
          </Box>
        )}
      </Container>
    </Box>
  );
}
