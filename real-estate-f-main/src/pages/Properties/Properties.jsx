import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  CircularProgress,
  Button,
  Grid,
  Container,
  Drawer,
  IconButton,
} from "@mui/material";
import PostCard from "../../components/PostCard/PostCard";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import { fetchProducts } from "../../redux/productSlice";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Properties = () => {
  const [postsToDisplay, setPostsToDisplay] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { filteredPosts, loading, error } = useSelector(
    (state) => state.filteredPosts
  );
  const { states: allPosts, loading: allPostsLoading } = useSelector(
    (state) => state.products
  );
  const [visibleItems, setVisibleItems] = useState(12);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    if (
      query.get("type") ||
      query.get("property") ||
      query.get("bedroom") ||
      query.get("bathroom") ||
      query.get("city") ||
      query.get("minPrice") ||
      query.get("maxPrice") ||
      query.get("amenities")
    ) {
      setPostsToDisplay(filteredPosts);
    } else {
      setPostsToDisplay(allPosts);
    }
  }, [location, allPosts, filteredPosts]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Properties - Property Hub</title>
        <meta
          name="description"
          content="Browse through our extensive collection of properties for sale and rent. Find your dream home effortlessly with our user-friendly platform."
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
        <Typography variant="h1">Properties</Typography>
        <Breadcrumb />
      </Box>
      <Container
        minwidth="sm"
        sx={{ paddingTop: { md: 12, sm: 4 }, paddingBottom: { md: 5, sm: 4 } }}
      >
        <Grid container>
          <Box
            className="left-side"
            sx={{
              width: "30%",
              display: { xs: "none", md: "block" },
              paddingRight: "60px",
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              Property listing
            </Typography>
            <Typography variant="h6">Search</Typography>
            <FilterProducts />
          </Box>

          {/* Drawer for mobile devices */}
          <Box
            className="left-side"
            sx={{
              paddingTop: 4,
              width: "20%",
              display: { xs: "block", md: "none" },
            }}
          >
            <IconButton onClick={handleDrawerOpen} sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ marginRight: 1 }}>
                Filter
              </Typography>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: drawerOpen ? 0 : "-100%" }}
                transition={{ duration: 0.5 }}
                style={{ width: 400, padding: 2 }}
              >
                <Typography variant="h6">Search</Typography>
                <FilterProducts />
              </motion.div>
            </Drawer>
          </Box>

          <Box className="right-side" sx={{ width: { md: "70%", sm: 1 } }}>
            {loading || allPostsLoading ? (
              <CircularProgress
                sx={{ display: "block", margin: "20px auto" }}
              />
            ) : error ? (
              <Typography color="error">Error: {error}</Typography>
            ) : (
              <Box>
                <Grid container spacing={3}>
                  {postsToDisplay && postsToDisplay.length > 0 ? (
                    postsToDisplay.slice(0, visibleItems).map((item, index) => (
                      <Grid item xs={12} sm={12} md={6} key={item._id}>
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 20,
                            rotateY: index % 2 === 0 ? 90 : -90,
                          }}
                          animate={{ opacity: 1, y: 0, rotateY: 0 }}
                          exit={{
                            opacity: 0,
                            y: 20,
                            rotateY: index % 2 === 0 ? -90 : 90,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <PostCard item={item} />
                        </motion.div>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ margin: "20px auto" }}>
                      No posts found
                    </Typography>
                  )}
                </Grid>
                <Box sx={{ textAlign: "center", marginTop: 6 }}>
                  {visibleItems < filteredPosts.length && (
                    <Button
                      variant="contained"
                      onClick={handleShowMore}
                      sx={{
                        background: "#EFA00F",
                        color: "#fff",
                        padding: "16px 30px",
                      }}
                    >
                      Show More
                    </Button>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default Properties;
