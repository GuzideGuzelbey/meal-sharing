"use client";
import React from "react";
import Link from "next/link";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantSharpIcon from "@mui/icons-material/RestaurantSharp";
import { usePathname } from "next/navigation";

export default function Header() {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("768"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Meals", path: "/meals" },
    { label: "Reservations", path: "/reservations" },
    { label: "Wanna Host?", path: "/host" },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0px 4px 8px rgba(145, 132, 35, 0.05)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
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
                padding: "0.1rem",
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: theme.typography.h6.fontWeight,
              fontSize: theme.typography.h6.fontSize,
              color: theme.palette.text.logo,
            }}
          >
            Meal-Share
          </Typography>
        </Box>

        {!isMobile && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              gap: 3,
              marginRight: 2,
            }}
          >
            <Stack direction="row" spacing={2}>
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} passHref>
                  <Button
                    sx={{
                      fontSize: theme.typography.navItem.fontSize,
                      fontWeight: theme.typography.navItem.fontWeight,
                      textTransform: theme.typography.button.textTransform,
                      transition: "background-color 0.3s ease",
                      color:
                        pathname === item.path
                          ? theme.palette.secondary.main
                          : theme.palette.text.logo,
                      "&:hover": {
                        backgroundColor: theme.palette.secondary.main,
                        color: "#ffffff",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Box>
        )}

        {isMobile && (
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
                {navItems.map((item) => (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton
                      onClick={handleDrawerToggle}
                      sx={{
                        textAlign: "center",
                        "&:hover": {
                          backgroundColor: theme.palette.secondary.main,
                          color: "#ffffff",
                        },
                      }}
                    >
                      <Link
                        href={item.path}
                        passHref
                        style={{ width: "100%", textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.text.logo,
                            fontSize: theme.typography.navItem.fontSize,
                            fontWeight: theme.typography.navItem.fontWeight,
                            textAlign: "center",
                            width: "100%",
                            paddingY: 1,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        )}
        {!isMobile && (
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
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
        )}
      </Toolbar>
    </AppBar>
  );
}
