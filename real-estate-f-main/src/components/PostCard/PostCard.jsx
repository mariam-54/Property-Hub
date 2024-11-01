import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import cardImg from "../../assets/images/luxury-real-estate.jpg";
import "./PostCard.css";
import { addFavorite } from "../../redux/favoriteSlice";
import { useDispatch } from "react-redux";

const PostCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, margin: 1 }}>
      <CardActionArea>
        <Grid
          container
          sx={{
            position: "absolute",
            top: "12px",
            left: "12px",
          }}
        >
          <Card
            className="icons-hover"
            sx={{
              background: "#21616A",
              border: "1px solid #21616A",
              padding: "8px 8px 4px 8px",
              borderRadius: "8px",
              marginRight: "8px",
            }}
          >
            <Typography
              variant="subtitle1"
              color="#fff"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {item.property}
            </Typography>
          </Card>

          <Card
            className="icons-hover"
            sx={{
              background: "#efa00fcc",
              border: "1px solid #efa00fcc",
              padding: "8px 8px 4px 8px",
              borderRadius: "8px",
              marginRight: "8px",
            }}
          >
            {/* <Typography variant="body">{item.featured}</Typography> */}

            <Typography
              variant="subtitle1"
              color="#fff"
              sx={{ display: "flex", alignItems: "center" }}
            >
              For {item.type}
            </Typography>
          </Card>
        </Grid>

        <Grid
          container
          sx={{
            justifyContent: "end",
            position: "absolute",
            top: "12px",
            right: "12px",
          }}
        >
          <Card
            className="icons-hover"
            sx={{
              background: "#dddddd29",
              border: "1px solid #ddd",
              padding: "8px 8px 4px 8px",
              borderRadius: "8px",
              marginRight: "8px",
            }}
          >
            <Link onClick={() => dispatch(addFavorite(item._id))}>
              <FavoriteBorderIcon sx={{ color: "#fff", cursor: "pointer" }} />
            </Link>
          </Card>
          <Card
            className="icons-hover"
            sx={{
              background: "#dddddd29",
              border: "1px solid #ddd",
              padding: "8px 8px 4px 8px",
              borderRadius: "8px",
              marginRight: "8px",
            }}
          >
            <Link to={`/properties/${item?._id}`}>
              <RemoveRedEyeOutlinedIcon sx={{ color: "#fff" }} />
            </Link>
          </Card>
        </Grid>
        <Link to={`/properties/${item?._id}`}>
          <CardMedia
            component="img"
            height="250"
            image={item.images[0] || cardImg}
            alt={item.title}
            sx={{ objectFit: "cover" }}
          />
        </Link>
        <CardContent sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <Link to={`/properties/${item?._id}`}>
            <Typography
              gutterBottom
              variant="h5"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light" ? "#000" : "#fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "20ch",
              }}
            >
              {item.title}
            </Typography>
          </Link>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LocationOnOutlinedIcon sx={{ marginRight: "8px" }} />
            {item.address}
          </Typography>
          <Grid container sx={{ justifyContent: "space-around" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: "20px",
              }}
            >
              <BedOutlinedIcon sx={{ marginRight: "8px" }} /> {item.bedroom}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: "20px",
              }}
            >
              <BathtubOutlinedIcon sx={{ marginRight: "8px" }} />
              {item.bathroom}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: "20px",
              }}
            >
              <StraightenOutlinedIcon sx={{ marginRight: "8px" }} />{" "}
              {item.sqft || 8}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "6ch",
              }}
            >
              <MonetizationOnOutlinedIcon />
              {item.price}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
