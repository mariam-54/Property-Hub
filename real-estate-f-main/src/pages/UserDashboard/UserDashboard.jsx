import { motion } from "framer-motion"; // Import framer-motion
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Toolbar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  IconButton,
  Drawer,
  Button,
  Typography,
  useMediaQuery,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import useLogout from "../Logout/Logout";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();

  const MyPropertiesCount = useSelector(
    (state) => state.product?.listings?.length || 0
  );
  const favoriteCount = useSelector(
    (state) => state.favorite?.items?.length || 0
  );
  const reviewCount = useSelector((state) => state.review?.items?.length || 0);

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/user-dashboard" },
    {
      text: "My Properties",
      icon: <AddIcon />,
      path: "/user-dashboard/my-properties",
    },
    {
      text: "My Favorites",
      icon: <FavoriteIcon />,
      path: "/user-dashboard/my-favorites",
    },
    {
      text: "Reviews",
      icon: <RateReviewIcon />,
      path: "/user-dashboard/reviews",
    },
    {
      text: "My Profile",
      icon: <AccountCircleIcon />,
      path: "/user-dashboard/my-profile",
    },
    {
      text: "Add Property",
      icon: <AddIcon />,
      path: "/user-dashboard/add-property",
    },
    { text: "Log Out", icon: <LogoutIcon />, path: "/user-dashboard/logout" },
  ];

  const handleMenuClick = (index, path) => {
    setSidebarOpen(false);
    if (path === "/user-dashboard/logout") {
      handleLogout();
    } else {
      setActiveIndex(index);
      navigate(path);
    }
  };

  const drawerContent = (
    <List>
      {menuItems.map((item, index) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ListItem
            onClick={() => handleMenuClick(index, item.path)}
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "#21616A" : "#fff",
              backgroundColor:
                activeIndex === index ? "#56AEB1" : "transparent",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#56AEB1" },
            }}
          >
            <ListItemIcon
              sx={{ color: activeIndex === index ? "#fff" : "#4b9197" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light" ? "#21616A" : "#fff",
              }}
            />
          </ListItem>
        </motion.div>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {!isDesktop && (
        <IconButton
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 1300,
            color: "#f5f5f5",
          }}
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      {isDesktop ? (
        <Box
          sx={{
            width: "340px",
            flexShrink: 0,
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#dddddd59" : "#292929",
            p: 2,
            minHeight: "100vh",
          }}
        >
          {drawerContent}
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "300px",
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#fff" : "#292929",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {location.pathname === "/user-dashboard" && (
          <>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.mode === "light" ? "#21616A" : "#fff",
                  padding: "16px 30px",
                }}
              >
                Your Listing {MyPropertiesCount}/17 remaining
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.mode === "light" ? "#21616A" : "#fff",
                  padding: "16px 30px",
                }}
              >
                Favorite {favoriteCount}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.mode === "light" ? "#21616A" : "#fff",
                  padding: "16px 30px",
                }}
              >
                Reviews {reviewCount}
              </Button>
            </Box>

            <Paper sx={{ p: 3, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Gorgeous Apartment Building
                  </Typography>
                  <Typography variant="body1">$5050.00</Typography>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserDashboard;
