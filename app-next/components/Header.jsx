"use client";
import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Button,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = ["Home", "Meals", "Reservations", "Wanna Host?"];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: theme.palette.text.logo,
          }}
        >
          <IconButton
            size="medium"
            edge="start"
            sx={{ color: theme.palette.secondary.main }}
            aria-label="logo"
          >
            <RestaurantSharpIcon
              sx={{
                color: theme.palette.background.main,
                fontSize: theme.typography.logo.fontSize,
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: theme.typography.h6.fontWeight,
              fontSize: theme.typography.h6.fontSize,
            }}
          >
            Meal-Share
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                },
              }}
            >
              <List>
                {navItems.map((text) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={handleDrawerToggle}
                      sx={{
                        textAlign: "center",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: theme.palette.secondary.main,
                          color: "#ffffff",
                        },
                      }}
                    >
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: theme.typography.navItems,
                        }}
                        sx={{ color: theme.palette.text.primary }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={2}>
            {navItems.map((item) => (
              <Button
                key={item}
                color="inherit"
                sx={{
                  fontSize: theme.typography.navItem.fontSize,
                  textTransform: theme.typography.button.textTransform,
                  fontWeight: theme.typography.navItem.fontWeight,
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: "#ffffff",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>
        )}

        <Box
          component="form"
          noValidate
          autoComplete="off"
          marginRight={2}
          sx={{
            marginLeft: 2,
            width: isMobile ? "150px" : "200px",
            backgroundColor: "rgba(223, 223, 223, 0.3)",
            borderRadius: theme.shape.borderRadius,
            paddingX: 1,
            paddingY: 0.5,
            borderColor: "rgba(191, 191, 191, 0.81)",
            display: "flex",
            alignItems: "center",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          <InputBase
            placeholder="Search..."
            sx={{
              color: "rgba(191, 191, 191, 0.81)",
              width: "100%",
              fontSize: theme.typography.body1.fontSize,
              transition: "background-color 0.3s ease",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <SearchIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: theme.typography.h6.fontSize,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
