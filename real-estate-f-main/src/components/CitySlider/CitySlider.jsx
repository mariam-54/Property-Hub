import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchFilteredPosts } from "../../redux/filterProductSlice";
import img1 from "../../assets/images/cairo.jpg";
import img2 from "../../assets/images/alex.jpg";
import img3 from "../../assets/images/giza.jpg";
import img4 from "../../assets/images/port-said.jpg";
import img5 from "../../assets/images/suez.jpg";
import img6 from "../../assets/images/aswan.jpg";
import img7 from "../../assets/images/luxor.jpg";
import img8 from "../../assets/images/tanta.jpg";
import img9 from "../../assets/images/ismailia.jpg";
import img10 from "../../assets/images/zagazig.jpg";
import { useNavigate } from "react-router-dom";
import "./CitySlider.css";

const cities = [
  { name: "Cairo", img: img1 },
  { name: "Alexandria", img: img2 },
  { name: "Giza", img: img3 },
  { name: "Port Said", img: img4 },
  { name: "Suez", img: img5 },
  { name: "Aswan", img: img6 },
  { name: "Luxor", img: img7 },
  { name: "Tanta", img: img8 },
  { name: "Ismailia", img: img9 },
  { name: "Zagazig", img: img10 },
  // { name: "Mansoura", img: img11 },
  // { name: "Faiyum", img: img12 },
  // { name: "Qena", img: img13 },
  // { name: "Sohag", img: img14 },
  // { name: "Minya", img: img15 },
  // { name: "Damietta", img: img16 },
  // { name: "Assiut", img: img17 },
];

function CitySlider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCitySelect = async (city) => {
    const query = {
      city: city.toLowerCase(),
    };

    // Dispatch the filtered posts action
    await dispatch(fetchFilteredPosts(query));
    // Navigate to the properties page with query parameters
    navigate(`/properties?city=${query.city}`);
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          340: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
        }}
        className="mySwiper"
      >
        {cities.map((city) => (
          <SwiperSlide key={city.name}>
            <Box
              className="card-style"
              onClick={() => handleCitySelect(city.name)}
              sx={{ cursor: "pointer" }}
            >
              <Box className="img-carousel-style">
                <Box
                  component="img"
                  sx={{
                    width: { xs: "100%", md: 1 },
                    height: "600px",
                    borderRadius: "8px",
                    boxShadow: 3,
                    objectFit: "cover",
                    marginBottom: "1em",
                  }}
                  alt={city.name}
                  src={city.img}
                />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    position: "absolute",
                    bottom: "2em",
                    left: "1em",
                    zIndex: 2,
                    color: "#000",
                    background: "#fff",
                    width: "fit-content", 
                    padding: "12px",
                    borderRadius: 2,
                  }}
                >
                  {city.name}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default CitySlider;
