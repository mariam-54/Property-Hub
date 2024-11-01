import { useEffect } from "react";
import Slider from "react-slick";
import PostCard from "../PostCard/PostCard";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const dispatch = useDispatch();
  const { states, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 1000,
    className: "city-slider",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Grid >
      <Slider {...settings} >
        {states.length > 0 ? (
          states.map((item) => (
            <Box key={item._id}>
              <PostCard item={item}/>
            </Box>
          ))
        ) : (
          <Typography>No Property available</Typography>
        )}
      </Slider>

    </Grid>
  );
};

export default HomeSlider;


