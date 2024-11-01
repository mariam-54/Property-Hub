import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  Slider,
  Button,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ToggleButton,
  ToggleButtonGroup,
  InputLabel,
  FormControl,
} from "@mui/material";
import { fetchFilteredPosts } from "../../redux/filterProductSlice";

function FilterProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAmenities, setShowAmenities] = useState(false);
  const dispatch = useDispatch();

  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city")?.toLowerCase() || "",
    property: searchParams.get("property") || "",
    bedroom: searchParams.get("bedroom") || "",
    bathroom: searchParams.get("bathroom") || "",
    amenities: searchParams.get("amenities") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 6000000,
  });

  const amenitiesOptions = [
    "air condtion",
    "heating",
    "floor",
    "elevator",
    "garden",
    "parking",
    "intercom",
    "security",
    "wifi",
    "window type",
    "pool",
    "sheard gym",
    "sherd spa",
    "fireplace",
    "cable tv",
  ];
  const [priceRange, setPriceRange] = useState([0, 100000]);
  useEffect(() => {
    setPriceRange([+query.minPrice, +query.maxPrice]);
  }, []);

  const { filteredPosts, loading, error } = useSelector(
    (state) => state.filteredPosts
  );

  const handleToggleChange = (event, newType) => {
    setQuery((prev) => ({
      ...prev,
      type: newType || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,
      [name]: value ? value : value,
    }));
  };

  const handlePriceChange = (event, newValue) => {
    setQuery((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setQuery((prev) => ({
      ...prev,
      amenities: checked
        ? [...(prev.amenities || []), name]
        : prev.amenities.filter((amenity) => amenity !== name),
    }));
  };

  const handleFilter = async () => {
    const updatedQuery = {
      ...query,
      amenities: Array.isArray(query.amenities)
        ? query.amenities.join(",")
        : query.amenities,
    };

    setSearchParams(updatedQuery);
    console.log("Query parameters being sent:", updatedQuery);
    const filter = await dispatch(fetchFilteredPosts(updatedQuery));
    console.log("Filtered results:", filter);
  };

  return (
    <Box
      className="filter"
      p={3}
      boxShadow={3}
      borderRadius={2}
      sx={{ maxWidth: 400, marginTop: "1em", backgroundColor: (theme) =>
        theme.palette.mode === "light" ? "#fff" : "#292929" }}
    >

      <Box mb={2}>
        {/* <Typography variant="body1">Type</Typography> */}
        <ToggleButtonGroup
          value={query.type}
          exclusive
          onChange={handleToggleChange}
          fullWidth
        >
          <ToggleButton value="buy">Buy</ToggleButton>
          <ToggleButton value="rent">Rent</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box mb={2}>
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          name="city"
          placeholder="City Location"
          onChange={handleChange}
          value={query.city}
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Property</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            name="property"
            label="Property"
            value={query.property}
            onChange={handleChange}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
            <MenuItem value="house">House</MenuItem>
            <MenuItem value="villa">Villa</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField
          label="Bedrooms"
          variant="outlined"
          fullWidth
          type="number"
          name="bedroom"
          placeholder="Any"
          onChange={handleChange}
          value={query.bedroom}
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Bathrooms"
          variant="outlined"
          type="number"
          fullWidth
          name="bathroom"
          placeholder="Any"
          onChange={handleChange}
          value={query.bathroom}
        />
      </Box>

      {/* Advanced button */}
      <Button
        variant="outlined"
        onClick={() => setShowAmenities((prev) => !prev)}
        sx={{ marginBottom: 2, width: 1 }}
      >
        Advanced
      </Button>

      {/* Show Amenities */}

      {showAmenities && (
        <Box mb={2}>
          <Typography variant="body1">Amenities</Typography>
          <FormGroup>
            {amenitiesOptions.map((amenity, id) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    name={amenity}
                    onChange={handleCheckboxChange}
                    checked={query.amenities?.includes(amenity) || false}
                  />
                }
                label={amenity}
              />
            ))}
          </FormGroup>
        </Box>
      )}

      <Box mb={2}>
        <Typography variant="body1">Price Range</Typography>
        <Slider
          // value={priceRange}
          value={[query.minPrice, query.maxPrice]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={100000}
          max={6000000}
          step={50000}
        />
      </Box>

      <Button
        variant="contained"
        onClick={handleFilter}
        sx={{
          background: "#EFA00F",
          width: 1,
          color: "#fff",
          padding: "16px 30px",
        }}
      >
        Filter
      </Button>
    </Box>
  );
}

export default FilterProducts;
