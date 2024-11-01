import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Grid,
  Container,
  TextField,
} from "@mui/material";
import PostCard from "../../components/PostCard/PostCard";
import { useNavigate } from "react-router";
import FilterTabs from "../../components/FilterTabs/FilterTabs";
import "./Home.css";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import Searchbar from "../../components/Searchbar/Searchbar";
import CitySlider from "../../components/CitySlider/CitySlider";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";


const Home = () => {
  const newTexts = ["Real Estate", "Perfect Home", "Dream Home"];
  const [text, setText] = useState("Faster");
  const [textIndex, setTextIndex] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);


  const dispatch = useDispatch();
  const { states, loading, error } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    const changeText = () => {
      setTextIndex((prevIndex) => (prevIndex + 1) % newTexts.length);
      setTimeout(() => {
        setText(newTexts[textIndex]);
      }, 200); // Adjust the timing as needed
    };


    const intervalId = setInterval(changeText, 1500);


    return () => clearInterval(intervalId); // Cleanup interval to prevent memory leaks
  }, [textIndex, newTexts]);


  const navigate = useNavigate();
  const handleShowMore = () => {
    navigate("/properties");
  };


  return (
    <>
      <Helmet>
        <title> Property Hub -Find Your Dream Home</title>
        <meta
          name="description"
          content="Discover your dream home effortlessly. We offer a wide range of real estate properties to buy, rent, or sell. Let us help you find the perfect place."
        />
      </Helmet>


      <Box
        width={1}
        className="hero-banner"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container
          minwidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h1"
              component="h1"
              className="animation"
              sx={{
                textAlign: "center",
                color: "#fff",
                fontSize: { md: "60px", xs: "50px" },
              }}
            >
              Find Your
              <Typography
                variant="h1"
                component="span"
                className="fadeDownText"
                sx={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: { md: "60px", xs: "50px" },
                }}
              >
                {" " + text}
              </Typography>
            </Typography>
          </motion.div>


          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              maxWidth: { md: "40%", xs: "100%" },
              color: "#fff",
            }}
          >
            We are a real estate agency that will help you find the best
            residence you dream of. Let’s discuss your dream house?
          </Typography>
          <Box>
            <Searchbar />
          </Box>
        </Container>
      </Box>


      <Container minwidth="sm">
        <Box className="posts">
          <Box sx={{ textAlign: "center", paddingTop: 12 }}>
            <Typography variant="subtitle1" sx={{ color: "#EFA00F" }}>
              Featured Properties
            </Typography>
            <Typography variant="h3">Recommended For You</Typography>
          </Box>


          <Box
            className="filter-tabs"
            sx={{ textAlign: "center", paddingTop: 4 }}
          >
            <FilterTabs setFilteredResults={setFilteredResults} />
          </Box>


          <Box sx={{ paddingTop: 4, paddingBottom: 12 }}>
            {loading ? (
              <CircularProgress
                sx={{ display: "block", margin: "20px auto" }}
              />
            ) : error ? (
              <Typography color="error">Error: {error}</Typography>
            ) : filteredResults && filteredResults.length > 0 ? (
              <Grid container spacing={3}>
                {filteredResults.slice(0, visibleItems).map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.42, 0, 0.58, 1],
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <PostCard item={item} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" sx={{ margin: "20px auto" }}>
                No posts found
              </Typography>
            )}


            <Box sx={{ textAlign: "center", marginTop: 6 }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="contained"
                  onClick={handleShowMore}
                  sx={{
                    background: "#EFA00F",
                    color: "#fff",
                    padding: "16px 30px",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#EFA00F",
                    },
                  }}
                >
                  View All Properties
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Box>


        <Box sx={{ paddingBottom: 8 }}>
          <Box sx={{ textAlign: "center", paddingBottom: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="subtitle1" sx={{ color: "#EFA00F" }}>
                Explore Cities
              </Typography>
              <Typography variant="h3">Our Location For You</Typography>
              <CitySlider />
            </motion.div>
          </Box>
        </Box>
      </Container>


      {/* <Box sx={{ paddingBottom: 8 }}>
          <Box sx={{ textAlign: "center", paddingBottom: 6 }}>
            <Typography variant="subtitle1" sx={{ color: "#EFA00F" }}>
              Explore Cities
            </Typography>
            <Typography variant="h3">Our Location For You</Typography>
          <CitySlider/>
          </Box>
        </Box> */}


      <Box sx={{ paddingTop: 12, paddingBottom: 12, background: "#21616A" }}>
        <Container>
          <Box sx={{ textAlign: "left", paddingBottom: 6, color: "#fff" }}>
            <Typography variant="subtitle1">Our Services</Typography>
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
              color: "#fff",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Start off-screen and invisible
              animate={{ opacity: 1, y: 0 }} // Slide up and become visible
              transition={{ duration: 0.6, delay: 0.2 }} // Animation settings
              whileHover={{ scale: 1.05 }} // Slightly scale up on hover
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: 1,
                }}
              >
                <AddHomeWorkOutlinedIcon
                  sx={{ width: "80px", height: "80px", textAlign: "left" }}
                />
                <Typography variant="h5">Buy A New Home</Typography>
                <Typography variant="body2">
                  Discover your dream home effortlessly. Explore diverse
                  properties and expert guidance for a seamless buying
                  experience.
                </Typography>
                <Button
                  href="/our-services"
                  variant="text"
                  sx={{ color: "#EFA00F", paddingLeft: 0 }}
                >
                  Learn More <EastOutlinedIcon sx={{ color: "#EFA00F" }} />{" "}
                </Button>
              </Box>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }} // Slight delay to stagger animations
              whileHover={{ scale: 1.05 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: 1,
                }}
              >
                <AddHomeWorkOutlinedIcon
                  sx={{ width: "80px", height: "80px", textAlign: "left" }}
                />
                <Typography variant="h5">Rent a home </Typography>
                <Typography variant="body2">
                  Discover your dream home effortlessly. Explore diverse
                  properties and expert guidance for a seamless buying
                  experience.
                </Typography>
                <Button
                  href="/our-services"
                  variant="text"
                  sx={{ color: "#EFA00F", paddingLeft: 0 }}
                >
                  Learn More <EastOutlinedIcon sx={{ color: "#EFA00F" }} />{" "}
                </Button>
              </Box>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }} // Further delay for stagger effect
              whileHover={{ scale: 1.05 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: 1,
                }}
              >
                <AddHomeWorkOutlinedIcon
                  sx={{ width: "80px", height: "80px", textAlign: "left" }}
                />
                <Typography variant="h5">Sell a home </Typography>
                <Typography variant="body2">
                  Discover your dream home effortlessly. Explore diverse
                  properties and expert guidance for a seamless buying
                  experience.
                </Typography>
                <Button
                  href="/our-services"
                  variant="text"
                  sx={{ color: "#EFA00F", paddingLeft: 0 }}
                >
                  Learn More <EastOutlinedIcon sx={{ color: "#EFA00F" }} />{" "}
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Container>
      </Box>


      <Box
        width={1}
        className="home-contact-banner"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container>
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              },
              gap: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  className="animation"
                  sx={{ textAlign: "left", color: "#fff", marginBottom: 2 }}
                >
                  Work with the best real estate platform in Mumbai to buy or
                  sell properties
                </Typography>
              </motion.div>
              <Button
               href="/contact-us"
                variant="contained"
                sx={{
                  background: "#EFA00F",
                  color: "#fff",
                  padding: "16px 30px",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#EFA00F",
                  },
                }}
              >
                Contact US Today
              </Button>
            </Box>
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "#fff" : "#000000cc",
                padding: {
                  xs: "46px 36px 46px 22px",
                  md: "56px 56px 56px 40px",
                },
                borderRadius: 4,
              }}
            >
              <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1, width: 1 } }}
              >
                <TextField
                  id="outlined-basic"
                  label="Your Name"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Your Phone"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Your Email"
                  variant="outlined"
                />


                <TextField
                  id="filled-multiline-static"
                  label="Your Message"
                  multiline
                  rows={4}
                  variant="outlined"
                />


                <Button
                  variant="contained"
                  sx={{
                    background: "#EFA00F",
                    color: "#fff",
                    padding: "16px 30px",
                  }}
                >
                  Submit{" "}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};


export default Home;



