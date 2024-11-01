import {
  Box,
  ListItemText,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Avatar,
  Container,
  List,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import Rating from "@mui/material/Rating";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { FavoriteBorder, Share } from "@mui/icons-material";
import {
  Hotel as BedroomIcon,
  Bathtub as BathroomIcon,
  SquareFoot as SizeIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import img1 from "../../assets/images/luxury-real-estate.jpg";
import img2 from "../../assets/images/unsplash_XbwHrt87mQ0.png";
import img3 from "../../assets/images/section 3.png";

// import AcUnitIcon from "@mui/icons-material/AcUnit";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetails } from "../../redux/postSlice";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import { Link } from "react-router-dom";
import { addFavorite } from "../../redux/favoriteSlice";
import { addReviews } from "../../redux/reviewSlice";
import { Helmet } from "react-helmet-async";

const PropertyDetails = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);

  const [reviewText, setReviewText] = useState("");

  const handlePostComment = () => {
    if (reviewText.trim()) {
      // Ensure the review is not empty
      dispatch(addReviews({ text: reviewText, id: _id })); // Pass an object

      setReviewText(""); // Clear the input field after submission
    }
  };

  useEffect(() => {
    dispatch(fetchPostDetails({ id: _id }));
    dispatch(fetchPostDetails);

  }, [_id]);

  const buttonStyle = {
    width: "30px",
    background: "none",
    border: "0px",
  };

  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };

  // const [showMore, setShowMore] = useState(false);

  const [checked, setChecked] = useState(false);
  const [rating, setRating] = useState(4);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  // const toggleShowMore = () => {
  //   setShowMore(!showMore);
  // };

  // const mapContainerStyle = {
  //   width: "100%",
  //   height: "400px",
  // };

  // const center = {
  //   lat: -3.745,
  //   lng: -73.989,
  // };

  const images = [img1, img2, img3];

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255, 255, 255, .05)",
    }),
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  return (
    <Box sx={{}}>
      <Helmet>
        <title>{post?.title ? `${post?.title} - Property Hub` : "Property Hub"}</title>
        <meta
          name="description"
          content={post?.description ? post?.description.substring(0, 160) : "Property Hub"}
        />
        <meta property="og:title" content={post?.title ? `${post?.title} - Property Hub` : "Property Hub"} />
        <meta property="og:description" content={post?.description} />
        <meta property="og:image" content={post?.images?.[0]} />
      </Helmet>
      {/* main slider */}
      <Slide {...properties}>
        {images.map((img, index) => (
          <div key={index} className="each-slide">
            <div
              style={{
                // backgroundImage: `url(${img})`,
                backgroundImage: `url(${post?.images})`,

                height: "500px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        ))}
      </Slide>
      <Container minwidth="sm">
        <Box sx={{ padding: 2, marginTop: 8 }}>
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  {/* Header */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h4" fontWeight="bold">
                      {post?.title}
                    </Typography>
                    <Typography variant="h5" color="primary">
                      ${post?.price}
                    </Typography>
                  </Box>
                  {/* Features */}
                  <Box display="flex" alignItems="center" gap={4} marginTop={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BedroomIcon color="primary" />
                      <Typography variant="body1">
                        $ {post?.bedroom} Bedroom{" "}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BathroomIcon color="primary" />
                      <Typography variant="body1">
                        $ {post?.bathroom}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <SizeIcon color="primary" />
                      <Typography variant="body1">{post?.sqft} SqFt</Typography>
                    </Box>
                  </Box>

                  {/* Location */}
                  <Box display="flex" alignItems="center" marginTop={2} gap={1}>
                    <LocationIcon color="primary" />
                    <Typography variant="body2" color="text.secondary">
                      {post?.location}
                    </Typography>
                  </Box>

                  {/* Share and Favorite Buttons */}
                  <Box marginTop={2}>
                    <IconButton>
                      <Share />
                    </IconButton>

                    <IconButton onClick={() => dispatch(addFavorite(post._id))}>
                      <FavoriteBorder />
                    </IconButton>
                  </Box>

                  {/* Description */}
                  <Box marginTop={3}>
                    <Typography variant="h6">Description</Typography>
                    <Typography variant="body2" marginTop={1}>
                      {post?.description}
                    </Typography>
                  </Box>

                  {/* Overview */}
                  <Box marginTop={4}>
                    <Typography variant="h6">Overview</Typography>
                    <Grid container spacing={2} marginTop={2}>
                      <Grid item xs={6} sm={4}>
                        <Typography>Type: {post?.type}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography>Bedrooms: {post?.bedroom}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography>Bathrooms: {post?.bathroom}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography>Size: {post?.sqft} SqFt</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box marginTop={4}>
                    <Typography variant="h6">Amenities</Typography>
                    <Grid container spacing={2} marginTop={2}>
                      <Grid item>
                        <List>
                          {post?.amenities?.map((amenity, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={amenity} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Section (Contact Seller) */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Contact Us</Typography>

                  {/* Contact Form */}
                  <Box marginTop={2}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      margin="dense"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      margin="dense"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      margin="dense"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Your Message"
                      margin="dense"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* Floor */}

        <Box sx={{ padding: 2 }}>
          <Accordion
            sx={{ p: 1 }}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              First Floor
            </AccordionSummary>
            <AccordionDetails>
              <Box component="img" src=""></Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ p: 1 }}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Second Floor
            </AccordionSummary>
            <AccordionDetails>
              <Box component="img" src=""></Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Comments */}

        <Box sx={{ padding: 2, marginTop: 5 }}>
          {/* Review Card */}
          {post?.comments?.length > 0 ? (
            post.comments.map((one, idx) => (
              <Box
                key={idx}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: 2,
                  marginBottom: 4,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar
                      alt={one.author}
                      src={
                        one.authorAvatar || "https://via.placeholder.com/150"
                      } // Dynamic author avatar
                      sx={{ width: 60, height: 60 }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {one.author} {/* Render author dynamically */}
                        {one.isVerified && (
                          <Box
                            component="span"
                            sx={{
                              color: "green",
                              fontWeight: "bold",
                              marginLeft: "8px",
                            }}
                          >
                            ✔️
                          </Box>
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(one.createdAt).toLocaleDateString()}{" "}
                        {/* Format the date */}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={one.rating} // Dynamic rating value
                        readOnly
                        sx={{ marginY: 1 }}
                      />
                      <Typography variant="body2">
                        {one.text} {/* Render comment text dynamically */}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "20px",
              }}
              variant="body2"
              color="text.secondary"
            >
              No comments
            </Typography>
          )}

          {/* Leave A Reply */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Leave A Reply
            </Typography>
            <TextField
              fullWidth
              label="Review"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)} // Update the state on change
            />
            <Button
              variant="contained"
              size="large"
              sx={{ marginTop: 2 }}
              onClick={handlePostComment} // Attach the click handler
            >
              Post Comment
            </Button>
          </Box>
        </Box>

        {/* Featured slider */}
        <Box sx={{ paddingBottom: 8 }}>
          <Box sx={{ py: 4 }}>
            <Typography variant="h3">Featured Properties</Typography>
          </Box>
          <HomeSlider />
        </Box>
      </Container>
    </Box>
  );
};

export default PropertyDetails;
