import { Box, Grid, Typography, Divider, IconButton, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";  
import logo from "../../assets/images/logo.png";
import "./Footer.css";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0F2C33",
        color: "var(--White)",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="div">
              <img src={logo} alt="Logo" style={{ height: "120px", width: "120px" }} />
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-end" } }}>
              <Typography variant="h6" component="div" sx={{ mb: 0, mr: 1 }}>
                <strong className="footer-info">Follow us:</strong>
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton className="social-icon">
                  <FacebookIcon />
                </IconButton>
                <IconButton className="social-icon">
                  <TwitterIcon />
                </IconButton>
                <IconButton className="social-icon">
                  <LinkedInIcon />
                </IconButton>
                <IconButton className="social-icon">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ width: "80%", mx: "auto", my: 3, backgroundColor: "var(--Secondary-2)" }} />

        <Typography variant="body1" align="left" sx={{  mb: 5, ml: 3 }}>
          <span className="footer-info">Specialists in providing high-class tours for <br /> those in need. Contact us.</span>
        </Typography>

        <Grid container spacing={4} sx={{ px: 3, textAlign: { xs: "left", md: "left" } }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" sx={{ mb: 2, color: "var(--Secondary-1)" }}>
              Contact Info
            </Typography>
            <Box sx={{ display: "flex", alignItems: "left", mb: 2}}>
              <HomeIcon className="footer-contact" />
              <Typography variant="body2" component="p" className="footer-span">
                Cairo, Egypt
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "left", mb: 2}}>
              <PhoneIcon className="footer-contact" />
              <Typography variant="body2" component="p" className="footer-span">
                +20 123 070 1443
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "left", mb: 2}}>
              <EmailIcon className="footer-contact" />
              <Typography variant="body2" component="p" className="footer-span">
                info@company.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} >
            <Typography variant="h6" component="div" sx={{ mb: 2, color: "var(--Secondary-1)" }}>
              Categories
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 2 }}>
              <Link to="/our-services" className="footer-span">Our Services</Link>
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 2 }}>
              <Link to="/about-us" className="footer-span">About Us</Link>
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 2 }}>
              <Link to="/contact-us" className="footer-span">Contact Us</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} >
            <Typography variant="h6" component="div" sx={{ mb: 2, color: "var(--Secondary-1)" }}>
              Our Company
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 2 }}>
              <Link to="/properties" className="footer-span">Property for Rent</Link>
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 2 }}>
              <Link to="/properties" className="footer-span">Property for Sale</Link>
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 2 }}>
              <Link to="/properties" className="footer-span">Property for Buy</Link>
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ width: "80%", mx: "auto", my: 3, backgroundColor: "var(--Secondary-2)" }} />

        <Typography variant="body2" align="center" sx={{ px: 3, color: "var(--Secondary-2)", mt: 3 }}>
          Property Hub © 2024 All Rights Reserved
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
