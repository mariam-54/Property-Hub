import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  // Check if token exists in localStorage or sessionStorage
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "var(--Primary)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo for larger screens */}
          <Typography
            component={NavLink}
            to="/"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <img src={logo} alt="Logo" style={{ height: "80px" }} />
          </Typography>

          {/* Logo and Menu Icon for smaller screens */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography component={NavLink} to="/">
              <img src={logo} alt="Logo" style={{ height: "60px" }} />
            </Typography>

            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Links for large screens */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <NavLink
              to="/"
              style={({ isActive }) => ({
                marginRight: "16px",
                color: isActive ? "var(--Secondary-1)" : "var(--White)",
                textDecoration: "none",
                fontFamily: "Merriweather",
                textTransform: "capitalize",
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/properties"
              style={({ isActive }) => ({
                marginRight: "16px",
                color: isActive ? "var(--Secondary-1)" : "var(--White)",
                textDecoration: "none",
                fontFamily: "Merriweather",
                textTransform: "capitalize",
              })}
            >
              Properties
            </NavLink>
            <NavLink
              to="/about-us"
              style={({ isActive }) => ({
                marginRight: "16px",
                color: isActive ? "var(--Secondary-1)" : "var(--White)",
                textDecoration: "none",
                fontFamily: "Merriweather",
                textTransform: "capitalize",
              })}
            >
              About Us
            </NavLink>
            <NavLink
              to="/our-services"
              style={({ isActive }) => ({
                marginRight: "16px",
                color: isActive ? "var(--Secondary-1)" : "var(--White)",
                textDecoration: "none",
                fontFamily: "Merriweather",
                textTransform: "capitalize",
              })}
            >
              Our Services
            </NavLink>
            <NavLink
              to="/contact-us"
              style={({ isActive }) => ({
                marginRight: "16px",
                color: isActive ? "var(--Secondary-1)" : "var(--White)",
                textDecoration: "none",
                fontFamily: "Merriweather",
                textTransform: "capitalize",
              })}
            >
              Contact Us
            </NavLink>

            <NavLink
              to="/user-dashboard"
              style={({ isActive }) => ({
                marginRight: "16px",
                color: isActive ? "var(--Secondary-1)" : "var(--White)",
                textDecoration: "none",
                fontFamily: "Merriweather",
                textTransform: "capitalize",
              })}
            >
              Dashboard
            </NavLink>
          </Box>

          {/* Conditionally render Login/Register or Logout */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              backgroundColor: "var(--Secondary-1)",
              color: "var(--White)",
              textTransform: "capitalize",
              padding: "6px 16px",
              borderRadius: "4px",
            }}
          >
            {token ? (
              <Button
                onClick={handleLogout}
                sx={{
                  color: "inherit",
                  textTransform: "capitalize",
                  padding: 0,
                  minWidth: "auto",
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  component={NavLink}
                  to="/login"
                  sx={{
                    color: "inherit",
                    textTransform: "capitalize",
                    padding: 0,
                    minWidth: "auto",
                  }}
                >
                  Login
                </Button>
                <Typography sx={{ mx: 1, color: "inherit" }}>|</Typography>
                <Button
                  component={NavLink}
                  to="/register"
                  sx={{
                    color: "inherit",
                    textTransform: "capitalize",
                    padding: 0,
                    minWidth: "auto",
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>

          {/* Menu for small screens */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              width: "100%",
              top: "0 !important",
            }}
            PaperProps={{
              sx: {
                width: "100vw",
                marginTop: "3.4rem",
                backgroundColor: "#21626ad5",
                color: "var(--White)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{ width: "100%", textAlign: "center" }}
              >
                <Typography
                  component={NavLink}
                  to="/"
                  sx={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{ width: "100%", textAlign: "center" }}
              >
                <Typography
                  component={NavLink}
                  to="/properties"
                  sx={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Properties
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{ width: "100%", textAlign: "center" }}
              >
                <Typography
                  component={NavLink}
                  to="/about-us"
                  sx={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  About Us
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{ width: "100%", textAlign: "center" }}
              >
                <Typography
                  component={NavLink}
                  to="/our-services"
                  sx={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Our Services
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{ width: "100%", textAlign: "center" }}
              >
                <Typography
                  component={NavLink}
                  to="/contact-us"
                  sx={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Contact Us
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{ width: "100%", textAlign: "center" }}
              >
                <Typography
                  component={NavLink}
                  to="/user-dashboard"
                  sx={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Typography>
              </MenuItem>

              {/* Conditionally render Login/Register or Logout for small screens */}
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{ width: "100%", textAlign: "center" }}
              >
                {token ? (
                  <Button
                    onClick={handleLogout}
                    sx={{ color: "inherit", textTransform: "capitalize" }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      component={NavLink}
                      to="/login"
                      sx={{ color: "inherit", textTransform: "capitalize" }}
                    >
                      Login
                    </Button>
                    <Typography sx={{ mx: 1, color: "inherit" }}>|</Typography>
                    <Button
                      component={NavLink}
                      to="/register"
                      sx={{ color: "inherit", textTransform: "capitalize" }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </MenuItem>
            </Box>
          </Menu>
        <ThemeToggle/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
