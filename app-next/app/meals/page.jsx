"use client";

import MealsList from "../../components/MealsPage/MealsList";
import {
  Container,
  Box,
  Button,
  InputBase,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function MealPage() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [meals, setMeals] = useState([]);
  const listRef = useRef(null);
  const showMoreRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    setShowAll(false);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const query = searchQuery
          ? `?title=${encodeURIComponent(searchQuery)}`
          : "";
        const res = await fetch(`http://localhost:3001/api/meals${query}`);
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch meals:", err);
      }
    };
    fetchMeals();
  }, [searchQuery]);

  const handleShowMore = () => {
    setShowAll(true);
    setTimeout(() => {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  };

  const displayedMeals = showAll ? meals : meals.slice(0, 3);

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
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            backgroundColor: "rgba(223, 223, 223, 0.3)",
            borderRadius: theme.shape.borderRadius,
            border: `1px solid rgba(212, 212, 212, 0.29)`,
            display: "flex",
            alignItems: "center",
            transition: "background-color 0.3s ease",
            justifyContent: "center",
            mb: 4,
            width: isMobile ? "100%" : 600,
            maxWidth: "100%",
            mx: "auto",
            overflow: "hidden",
          }}
        >
          <InputBase
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              color: "rgba(148, 148, 148, 0.81)",
              width: "100%",
              fontSize: theme.typography.body1.fontSize,
              pl: 1,
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#ccc",
              borderRadius: 0,
              px: 2,
              height: "100%",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: "#fff",
              },
            }}
          >
            <SearchIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Box>
        {meals.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No meals found matching your search.
          </Typography>
        ) : (
          <>
            <Box ref={listRef}>
              <MealsList meals={displayedMeals} highlight={searchQuery} />
            </Box>
            {!showAll && meals.length >= 3 && (
              <Box mt={4} textAlign="center" ref={showMoreRef}>
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
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
