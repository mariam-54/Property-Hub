import React, { useState } from "react";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import { Box, Button, Container, Grid, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Helmet } from "react-helmet-async"; // Import Helmet
import { motion } from "framer-motion"; // Import motion

const OurServives = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Function to generate different animations for cards
  const getCardAnimation = (index) => {
    const animations = [
      {
        initial: { x: -100, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { duration: 0.5 },
      },
      {
        initial: { x: 100, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { duration: 0.5 },
      },
      {
        initial: { y: 100, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.5 },
      },
    ];
    return animations[index % animations.length]; // Cycle through animations
  };

  return (
    <>
      <Helmet>
        <title>Our Services - Property Hub Real Estate</title>
        <meta
          name="description"
          content="Discover Property Hub Real Estate services, including buying, renting, and selling homes. We offer expert guidance to help you find your dream home or list your property with ease."
        />
      </Helmet>

      <Box
        boxShadow={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Typography variant="h1">Our Services</Typography>
        <Breadcrumb />
      </Box>
      <Container sx={{ paddingTop: 12, paddingBottom: 12 }}>
        <Box sx={{ paddingBottom: 12 }}>
          <Box sx={{ textAlign: "center", paddingBottom: 6 }}>
            <Typography variant="subtitle1" sx={{ color: "#EFA00F" }}>
              Our Services
            </Typography>
            <Typography variant="h3">What We Do?</Typography>
          </Box>
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 6,
            }}
          >
            {["Buy A New Home", "Rent a home", "Sell a home"].map(
              (title, index) => (
                <Grid item key={index}>
                  <motion.div {...getCardAnimation(index)}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: 4,
                        padding: 4,
                      }}
                    >
                      <AddHomeWorkOutlinedIcon
                        sx={{
                          width: "80px",
                          height: "80px",
                          textAlign: "left",
                        }}
                      />
                      <Typography variant="h5">{title}</Typography>
                      <Typography variant="body2" sx={{ textAlign: "center" }}>
                        Discover your dream home effortlessly. Explore diverse
                        properties and expert guidance for a seamless buying
                        experience.
                      </Typography>
                      <Button
                        href={
                          title === "Sell a home"
                            ? "/user-dashboard"
                            : "/properties"
                        }
                        variant="contained"
                        sx={{
                          background: "#EFA00F",
                          color: "#fff",
                          padding: "12px 30px",
                        }}
                      >
                        {title === "Sell a home"
                          ? "Submit Property"
                          : "Find a Home"}
                      </Button>
                    </Card>
                  </motion.div>
                </Grid>
              )
            )}
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center", paddingBottom: 4 }}>
          <Typography variant="subtitle1" sx={{ color: "#EFA00F" }}>
            Faqs
          </Typography>
          <Typography variant="h3">Quick answers to questions</Typography>
        </Box>

        <Box sx={{ paddingBottom: 16 }}>
          {[
            "Why should I use your services?",
            "How do I get started with your services?",
            "How secure are your services",
            "Is there customer support available?",
            "How can I update my account information?",
          ].map((question, index) => (
            <Accordion
              key={index}
              sx={{ p: 1 }}
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                {question}
              </AccordionSummary>
              <AccordionDetails>
                Once your account is set up and you've familiarized yourself
                with the platform, you are ready to start using our services.
                Whether it's accessing specific features, making transactions,
                or utilizing our tools, you'll find everything you need at your
                fingertips.
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default OurServives;
